#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { chromium } = require('playwright');
const sharp = require('sharp');
const unzipper = require('unzipper');

const CONFIG = {
  presentationsDir: path.join(__dirname, '../presentations'),
  docsDir: path.join(__dirname, '../docs'),
  thumbnailSize: { width: 800, height: 450 },
  libraryTitle: 'Presentations',
  theme: 'dark',
  // Generate random 4-digit access code at build time
  accessCodes: [String(Math.floor(1000 + Math.random() * 9000))]
};

// Extract metadata from HTML file
function extractMetadata(htmlPath, relPath) {
  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Determine folder from relative path
  const pathParts = relPath.split('/');
  const folder = pathParts.length > 1 ? pathParts[0] : 'Uncategorized';

  const metadata = {
    filename: path.basename(htmlPath),
    relPath: relPath,  // relative path including folder
    folder: folder,
    title: path.basename(htmlPath, '.html').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    date: new Date().toISOString().split('T')[0],
    author: 'CIQ',
    tags: []
  };

  // Extract from meta tags
  const titleMatch = html.match(/<meta name="presentation-title" content="([^"]+)"/);
  if (titleMatch) metadata.title = titleMatch[1];

  const dateMatch = html.match(/<meta name="presentation-date" content="([^"]+)"/);
  if (dateMatch) metadata.date = dateMatch[1];

  const authorMatch = html.match(/<meta name="presentation-author" content="([^"]+)"/);
  if (authorMatch) metadata.author = authorMatch[1];

  const tagsMatch = html.match(/<meta name="presentation-tags" content="([^"]+)"/);
  if (tagsMatch) metadata.tags = tagsMatch[1].split(',').map(t => t.trim());

  // Fallback: extract from <title> tag
  const htmlTitleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (htmlTitleMatch && metadata.title === metadata.filename) {
    metadata.title = htmlTitleMatch[1];
  }

  return metadata;
}

// Extract metadata for any file format (HTML, PDF, PPTX)
function extractMetadataForFile(filePath, relPath) {
  const ext = path.extname(filePath).toLowerCase();
  const pathParts = relPath.split('/');
  const folder = pathParts.length > 1 ? pathParts[0] : 'Uncategorized';
  const basename = path.basename(filePath, ext);

  const baseMetadata = {
    filename: path.basename(filePath),
    relPath: relPath,
    folder: folder,
    title: basename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    date: new Date().toISOString().split('T')[0],
    author: 'CIQ',
    tags: [],
    format: ext.replace('.', '') // 'html', 'pdf', 'pptx'
  };

  if (ext === '.html') {
    // Use existing HTML extraction for richer metadata
    const htmlMeta = extractMetadata(filePath, relPath);
    return { ...htmlMeta, format: 'html' };
  }

  // For PDF/PPTX, use file stats for date
  try {
    const stats = fs.statSync(filePath);
    baseMetadata.date = stats.mtime.toISOString().split('T')[0];
  } catch (e) {
    // Keep default date
  }

  return baseMetadata;
}

// Generate thumbnail from HTML presentation
async function generateThumbnail(htmlPath, outputPath) {
  console.log(`  Generating thumbnail for ${path.basename(htmlPath)}...`);

  // Check if custom thumbnail exists
  const customThumb = htmlPath.replace('.html', '.png');
  if (fs.existsSync(customThumb)) {
    console.log(`  Using custom thumbnail: ${path.basename(customThumb)}`);
    await sharp(customThumb)
      .resize(CONFIG.thumbnailSize.width, CONFIG.thumbnailSize.height, { fit: 'cover' })
      .toFile(outputPath);
    return;
  }

  // Generate from HTML
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  try {
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(2000);
    const screenshot = await page.screenshot({ type: 'png', fullPage: false });

    await sharp(screenshot)
      .resize(CONFIG.thumbnailSize.width, CONFIG.thumbnailSize.height, { fit: 'cover' })
      .toFile(outputPath);

    console.log(`  ✓ Thumbnail created`);
  } catch (error) {
    console.log(`  ⚠ Thumbnail generation failed, creating placeholder`);

    await sharp({
      create: {
        width: CONFIG.thumbnailSize.width,
        height: CONFIG.thumbnailSize.height,
        channels: 4,
        background: { r: 15, g: 23, b: 42, alpha: 1 }
      }
    })
      .composite([{
        input: Buffer.from(`<svg width="${CONFIG.thumbnailSize.width}" height="${CONFIG.thumbnailSize.height}">
        <text x="50%" y="50%" text-anchor="middle" fill="#12A66F" font-size="48" font-family="Arial">
          ${path.basename(htmlPath, '.html')}
        </text>
      </svg>`),
        top: 0,
        left: 0
      }])
      .toFile(outputPath);
  } finally {
    await browser.close();
  }
}

// Generate placeholder thumbnail for PDF or PPTX files
async function generatePlaceholderThumbnail(filePath, outputPath, format) {
  const basename = path.basename(filePath, '.' + format);
  const icon = format === 'pdf' ? '📄' : '📊';
  const color = format === 'pdf' ? '#E53E3E' : '#DD6B20'; // Red for PDF, Orange for PPTX

  console.log(`  Generating ${format.toUpperCase()} placeholder thumbnail...`);

  await sharp({
    create: {
      width: CONFIG.thumbnailSize.width,
      height: CONFIG.thumbnailSize.height,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
    .composite([{
      input: Buffer.from(`<svg width="${CONFIG.thumbnailSize.width}" height="${CONFIG.thumbnailSize.height}">
        <rect width="100%" height="100%" fill="#0F172A"/>
        <rect x="40" y="40" width="${CONFIG.thumbnailSize.width - 80}" height="${CONFIG.thumbnailSize.height - 80}" 
              rx="16" fill="#1E293B" stroke="${color}" stroke-width="3"/>
        <text x="50%" y="40%" text-anchor="middle" fill="${color}" font-size="120" font-family="Arial">
          ${format.toUpperCase()}
        </text>
        <text x="50%" y="70%" text-anchor="middle" fill="#94A3B8" font-size="32" font-family="Arial">
          ${basename.substring(0, 30)}${basename.length > 30 ? '...' : ''}
        </text>
      </svg>`),
      top: 0,
      left: 0
    }])
    .toFile(outputPath);

  console.log(`  ✓ ${format.toUpperCase()} thumbnail created`);
}

// Generate thumbnail for any file format
async function generateThumbnailForFile(filePath, outputPath, format) {
  // Check if custom thumbnail exists
  const ext = '.' + format;
  const customThumb = filePath.replace(ext, '.png');
  if (fs.existsSync(customThumb)) {
    console.log(`  Using custom thumbnail: ${path.basename(customThumb)}`);
    await sharp(customThumb)
      .resize(CONFIG.thumbnailSize.width, CONFIG.thumbnailSize.height, { fit: 'cover' })
      .toFile(outputPath);
    return;
  }

  if (format === 'html') {
    await generateThumbnail(filePath, outputPath);
  } else {
    await generatePlaceholderThumbnail(filePath, outputPath, format);
  }
}

// Build the landing page with collapsible folder sections
function buildLandingPage(presentationsByFolder, totalCount, allPresentations) {
  const folderNames = Object.keys(presentationsByFolder).sort((a, b) => {
    // Put "Uncategorized" at the end
    if (a === 'Uncategorized') return 1;
    if (b === 'Uncategorized') return -1;
    return a.localeCompare(b);
  });

  const renderCard = (p, extraClass = '') => {
    const format = p.format || 'html';
    const ext = '.' + format;
    const thumbnailName = p.relPath.split('/').join('_').replace(ext, '.png');

    // Format badge colors
    const formatBadge = format !== 'html' ? `<span class="format-badge format-${format}">${format.toUpperCase()}</span>` : '';

    // Link behavior: HTML = protected viewer, PDF = viewer, PPTX = download
    let href, onclick, downloadAttr = '';
    if (format === 'pdf') {
      href = `viewer.html?file=presentations/${p.relPath}`;
      onclick = `trackView('${p.relPath}')`;
    } else if (format === 'pptx') {
      href = `presentations/${p.relPath}`;
      onclick = `trackView('${p.relPath}')`;
      downloadAttr = ' download';
    } else {
      // HTML presentations go through protected viewer
      href = `protected-viewer.html?p=${encodeURIComponent(p.relPath)}`;
      onclick = `trackView('${p.relPath}')`;
    }

    return `
    <div class="card-wrapper" data-path="${p.relPath}">
      <button class="pin-btn" onclick="handlePin(event, '${p.relPath}')" title="Pin to Featured">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
      </button>
      <a href="${href}" class="presentation-card ${extraClass}" 
         data-path="${p.relPath}" data-title="${p.title.toLowerCase()}" 
         data-tags="${p.tags.join(' ').toLowerCase()}" data-folder="${p.folder.toLowerCase()}"
         data-format="${format}"
         onclick="${onclick}"${downloadAttr}>
        ${formatBadge}
        <img src="thumbnails/${thumbnailName}" alt="${p.title}" class="thumbnail" loading="lazy">
        <div class="card-content">
          <div class="card-title">${p.title}</div>
          <div class="card-meta">
            <span>${p.date}</span>
            <span>•</span>
            <span>${p.author}</span>
          </div>
          ${p.folder !== 'Uncategorized' ? `<span class="folder-badge">${p.folder}</span>` : ''}
          ${p.tags.length > 0 ? `
          <div class="card-tags">
            ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          ` : ''}
        </div>
      </a>
    </div>`;
  };

  // Render Featured section (pinned cards - uses metadata.featured flag in future)
  // For now, we'll create an empty featured section that JS populates
  const renderFeatured = () => `
    <div class="featured-section" id="featuredSection" style="display: none;">
      <h2 class="section-title">Featured</h2>
      <div class="featured-grid" id="featuredGrid">
        <!-- Populated by JS from pinned items -->
      </div>
    </div>`;

  // Render Most Recent section - collapsible, populated by JS from localStorage
  const renderMostRecent = () => `
    <div class="folder-section" id="mostRecentSection" style="display: none;">
      <div class="folder-header" onclick="toggleSection(this)">
        <span class="folder-icon">▼</span>
        <h2 class="folder-title">Recently Viewed</h2>
        <span class="folder-count" id="recentCount">0</span>
      </div>
      <div class="folder-content">
        <div class="grid" id="recentGrid">
          <!-- Populated by JS from localStorage -->
        </div>
      </div>
    </div>`;

  const renderSection = (folderName, presentations) => `
    <div class="folder-section collapsed" data-folder="${folderName.toLowerCase()}">
      <div class="folder-header" onclick="toggleSection(this)">
        <span class="folder-icon">▼</span>
        <h2 class="folder-title">${folderName}</h2>
        <span class="folder-count">${presentations.length}</span>
      </div>
      <div class="folder-content">
        <div class="grid">
          ${presentations.map(renderCard).join('')}
        </div>
      </div>
    </div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.libraryTitle}</title>
    <script defer src="https://cloud.umami.is/script.js" data-website-id="701e6d34-86f7-4785-a8b4-8fe2598615fb"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --ciq-green: #12A66F;
            --deep-black: #030712;
            --slate-900: #0F172A;
            --slate-800: #1E293B;
            --slate-700: #334155;
            --slate-400: #94A3B8;
            --slate-200: #E2E8F0;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', sans-serif;
            background: var(--deep-black);
            color: var(--slate-400);
            min-height: 100vh;
        }
        
        /* Mouse-tracking gradient light */
        .mouse-gradient {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
            background: radial-gradient(
                600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(18, 166, 111, 0.15),
                transparent 40%
            );
            transition: opacity 0.3s ease;
        }
        
        .header {
            background: var(--slate-900);
            border-bottom: 1px solid var(--slate-800);
            padding: 2rem 3rem;
        }
        
        h1 { font-size: 2.5rem; font-weight: 300; color: var(--slate-200); margin-bottom: 0.5rem; }
        .subtitle { font-size: 1.1rem; color: var(--slate-400); }
        .count { font-family: 'JetBrains Mono', monospace; color: var(--ciq-green); font-weight: 600; }
        
        .search-bar { max-width: 600px; margin: 2rem 0 0 0; }
        .search-input {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            background: var(--slate-800);
            border: 1px solid var(--slate-700);
            border-left: 3px solid var(--ciq-green);
            color: var(--slate-200);
            font-family: 'Inter', sans-serif;
        }
        .search-input:focus { outline: none; border-left-width: 4px; background: var(--slate-900); }
        
        .container { max-width: 1400px; margin: 0 auto; padding: 2rem 3rem; }
        
        /* Folder sections */
        .folder-section {
            margin-bottom: 2rem;
            border: 1px solid var(--slate-800);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .folder-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background: var(--slate-900);
            cursor: pointer;
            user-select: none;
            transition: background 0.2s;
        }
        .folder-header:hover { background: var(--slate-800); }
        
        .folder-icon {
            color: var(--ciq-green);
            font-size: 0.8rem;
            transition: transform 0.3s;
        }
        .folder-section.collapsed .folder-icon { transform: rotate(-90deg); }
        
        .folder-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--slate-200);
            flex: 1;
        }
        
        .folder-count {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: var(--ciq-green);
            background: rgba(18, 166, 111, 0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
        }
        
        .folder-content {
            padding: 1.5rem;
            max-height: 2000px;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s;
        }
        .folder-section.collapsed .folder-content {
            max-height: 0;
            padding: 0 1.5rem;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
        }
        
        /* Liquid Glass Cards */
        .presentation-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 4px 24px rgba(0, 0, 0, 0.3);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            text-decoration: none;
            display: block;
            position: relative;
        }
        .presentation-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--ciq-green), transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .presentation-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.15),
                0 12px 40px rgba(18, 166, 111, 0.15),
                0 0 1px rgba(255, 255, 255, 0.1);
            border-color: rgba(18, 166, 111, 0.3);
        }
        .presentation-card:hover::before {
            opacity: 1;
        }
        .presentation-card.hidden { display: none; }
        
        /* Card wrapper for pin button positioning */
        .card-wrapper {
            position: relative;
        }
        .card-wrapper.hidden { display: none; }
        
        /* Pin button */
        .pin-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 10;
            width: 32px;
            height: 32px;
            padding: 6px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: var(--slate-400);
            cursor: pointer;
            opacity: 0;
            transition: all 0.2s ease;
        }
        .pin-btn svg {
            width: 100%;
            height: 100%;
        }
        .card-wrapper:hover .pin-btn {
            opacity: 1;
        }
        .pin-btn:hover {
            background: rgba(18, 166, 111, 0.3);
            border-color: var(--ciq-green);
            color: var(--ciq-green);
            transform: scale(1.1);
        }
        .pin-btn.pinned {
            opacity: 1;
            background: rgba(18, 166, 111, 0.4);
            color: var(--ciq-green);
            border-color: var(--ciq-green);
        }
        
        /* Featured cards - larger, more prominent */
        .featured-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(18, 166, 111, 0.2);
        }
        .featured-card::before {
            opacity: 1;
            background: linear-gradient(90deg, var(--ciq-green), rgba(18, 166, 111, 0.3));
        }
        
        .thumbnail {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .card-content { padding: 1.25rem; }
        .card-title { font-size: 1.1rem; font-weight: 600; color: var(--slate-200); margin-bottom: 0.5rem; line-height: 1.3; }
        .card-meta {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: var(--slate-400);
            display: flex;
            gap: 0.75rem;
            margin-bottom: 0.5rem;
        }
        .card-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .tag {
            background: rgba(18, 166, 111, 0.1);
            color: var(--ciq-green);
            padding: 0.2rem 0.6rem;
            font-size: 0.7rem;
            border: 1px solid rgba(18, 166, 111, 0.3);
            font-family: 'JetBrains Mono', monospace;
        }
        
        .folder-badge {
            display: inline-block;
            background: var(--slate-800);
            color: var(--slate-400);
            padding: 0.15rem 0.5rem;
            font-size: 0.65rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            margin-bottom: 0.5rem;
        }
        
        /* Format badges for PDF/PPTX */
        .format-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 5;
            padding: 4px 10px;
            font-size: 0.7rem;
            font-weight: 600;
            font-family: 'JetBrains Mono', monospace;
            border-radius: 6px;
            backdrop-filter: blur(8px);
        }
        .format-pdf {
            background: rgba(229, 62, 62, 0.8);
            color: #fff;
        }
        .format-pptx {
            background: rgba(221, 107, 32, 0.8);
            color: #fff;
        }
        
        /* Most Recent Section */
        .most-recent-section {
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--slate-800);
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--slate-200);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background: var(--ciq-green);
            border-radius: 2px;
        }
        
        /* Featured Section */
        .featured-section {
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--slate-800);
        }
        
        .featured-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }
        @media (max-width: 1024px) {
            .featured-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
            .featured-grid { grid-template-columns: 1fr; }
        }
        
        /* Most Recent Section */
        .most-recent-section {
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--slate-800);
        }
        
        .recent-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }
        @media (max-width: 1024px) {
            .recent-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
            .recent-grid { grid-template-columns: 1fr; }
        }
        
        .recent-card {
            border-left-color: #3B82F6; /* Blue accent for recent */
        }
        .recent-card:hover {
            box-shadow: -6px 0 40px rgba(59, 130, 246, 0.2);
        }
        
        .footer { text-align: center; padding: 3rem; color: var(--slate-700); font-size: 0.9rem; }
        
        .empty-state { text-align: center; padding: 6rem 2rem; color: var(--slate-400); }
        .empty-state h2 { font-size: 1.5rem; color: var(--slate-300); margin-bottom: 1rem; }
        
        /* Access Code Modal */
        .access-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(3, 7, 18, 0.95);
            backdrop-filter: blur(20px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .access-modal.hidden { display: none; }
        .access-form {
            background: var(--slate-900);
            border: 1px solid var(--slate-700);
            border-radius: 16px;
            padding: 3rem;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        .access-form h2 {
            color: var(--slate-100);
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        .access-form p {
            color: var(--slate-400);
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }
        .access-form input {
            width: 100%;
            padding: 0.8rem 1rem;
            background: var(--slate-800);
            border: 1px solid var(--slate-600);
            border-radius: 8px;
            color: var(--slate-100);
            font-size: 1rem;
            text-align: center;
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
        }
        .access-form input:focus {
            outline: none;
            border-color: var(--ciq-green);
            box-shadow: 0 0 0 2px rgba(18, 166, 111, 0.2);
        }
        .access-form button {
            width: 100%;
            padding: 0.8rem;
            background: var(--ciq-green);
            border: none;
            border-radius: 8px;
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
        }
        .access-form button:hover { background: #0d8a5a; }
        .access-error {
            color: #E53E3E;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            display: none;
        }
        .access-error.visible { display: block; }
    </style>
</head>
<body>
    <!-- Access Code Modal -->
    ${CONFIG.accessCodes && CONFIG.accessCodes.length > 0 ? `
    <div class="access-modal" id="accessModal">
        <div class="access-form">
            <h2>Access Required</h2>
            <p>Enter the access code to view presentations</p>
            <input type="password" id="accessCodeInput" placeholder="Enter code" autocomplete="off">
            <button onclick="checkAccessCode()">Enter</button>
            <div class="access-error" id="accessError">Invalid access code</div>
        </div>
    </div>
    ` : ''}
    <div class="mouse-gradient"></div>
    <div class="header">
        <h1>${CONFIG.libraryTitle}</h1>
        <p class="subtitle">
            <span class="count">${totalCount}</span> presentation${totalCount !== 1 ? 's' : ''} in <span class="count">${folderNames.length}</span> ${folderNames.length !== 1 ? 'categories' : 'category'}
        </p>
        <div class="search-bar">
            <input type="text" class="search-input" id="searchInput" placeholder="Search presentations...">
        </div>
    </div>
    
    <div class="container">
        ${totalCount === 0 ? `
        <div class="empty-state">
            <h2>No presentations yet</h2>
            <p>Drop HTML presentations into the <code>presentations/</code> folder and run <code>npm run build</code></p>
        </div>
        ` : `
        ${renderFeatured()}
        ${renderMostRecent()}
        ${folderNames.map(folder => renderSection(folder, presentationsByFolder[folder])).join('')}
        `}
    </div>
    
    <div class="footer">
        Built with CIQ Presentation Library Builder • Last updated: ${new Date().toLocaleDateString()}
    </div>
    
    <script>
        // Presentation registry for dynamic sections
        const presentations = ${JSON.stringify(allPresentations.map(p => ({
    path: p.relPath,
    title: p.title,
    folder: p.folder,
    date: p.date,
    author: p.author,
    thumbnail: p.relPath.split('/').join('_').replace('.html', '.png')
  })))};
        
        // Access Code Gate
        const ACCESS_CODES = ${JSON.stringify(CONFIG.accessCodes || [])};
        const ACCESS_EXPIRY_MS = 60 * 60 * 1000; // 1 hour in milliseconds
        
        function isAccessValid() {
            const grantedAt = localStorage.getItem('accessGrantedAt');
            if (!grantedAt) return false;
            const elapsed = Date.now() - parseInt(grantedAt, 10);
            return elapsed < ACCESS_EXPIRY_MS;
        }
        
        function checkAccessCode() {
            const input = document.getElementById('accessCodeInput');
            const error = document.getElementById('accessError');
            if (ACCESS_CODES.includes(input.value)) {
                localStorage.setItem('accessGranted', 'true');
                localStorage.setItem('accessGrantedAt', Date.now().toString());
                document.getElementById('accessModal').classList.add('hidden');
                // Track access granted in Umami
                if (typeof umami !== 'undefined') umami.track('access-granted');
            } else {
                error.classList.add('visible');
                input.value = '';
                input.focus();
                // Track access denied in Umami
                if (typeof umami !== 'undefined') umami.track('access-denied');
            }
        }
        
        // Check access on load (with expiry)
        if (ACCESS_CODES.length > 0 && !isAccessValid()) {
            localStorage.removeItem('accessGranted');
            localStorage.removeItem('accessGrantedAt');
            document.getElementById('accessModal').classList.remove('hidden');
            document.getElementById('accessCodeInput').addEventListener('keyup', (e) => {
                if (e.key === 'Enter') checkAccessCode();
            });
        } else if (document.getElementById('accessModal')) {
            document.getElementById('accessModal').classList.add('hidden');
        }
        
        // Track view in localStorage
        function trackView(path) {
            const views = JSON.parse(localStorage.getItem('recentViews') || '[]');
            const now = Date.now();
            // Remove existing entry for this path
            const filtered = views.filter(v => v.path !== path);
            // Add to front with timestamp
            filtered.unshift({ path, timestamp: now });
            // Keep only last 10
            const trimmed = filtered.slice(0, 10);
            localStorage.setItem('recentViews', JSON.stringify(trimmed));
        }
        
        // Pinned/Featured management
        function getPinned() {
            return JSON.parse(localStorage.getItem('pinnedPresentations') || '[]');
        }
        
        function togglePin(path) {
            const pinned = getPinned();
            const index = pinned.indexOf(path);
            if (index === -1 && pinned.length < 3) {
                pinned.push(path);
            } else if (index !== -1) {
                pinned.splice(index, 1);
            }
            localStorage.setItem('pinnedPresentations', JSON.stringify(pinned));
            renderDynamicSections();
        }
        
        // Handle pin button click (event wrapper)
        function handlePin(event, path) {
            event.preventDefault();
            event.stopPropagation();
            togglePin(path);
        }
        
        // Update pin button states in UI
        function updatePinStates() {
            const pinned = getPinned();
            document.querySelectorAll('.pin-btn').forEach(btn => {
                const wrapper = btn.closest('.card-wrapper');
                if (wrapper) {
                    const path = wrapper.dataset.path;
                    btn.classList.toggle('pinned', pinned.includes(path));
                }
            });
        }
        
        // Render a card from data
        function renderCardHTML(p, extraClass = '') {
            return \`
            <a href="presentations/\${p.path}" class="presentation-card \${extraClass}" 
               data-path="\${p.path}" onclick="trackView('\${p.path}')">
              <img src="thumbnails/\${p.thumbnail}" alt="\${p.title}" class="thumbnail" loading="lazy">
              <div class="card-content">
                <div class="card-title">\${p.title}</div>
                <div class="card-meta">
                  <span>\${p.date}</span>
                  <span>•</span>
                  <span>\${p.author}</span>
                </div>
                <span class="folder-badge">\${p.folder}</span>
              </div>
            </a>\`;
        }
        
        // Render Featured section
        function renderFeaturedSection() {
            const pinned = getPinned();
            const section = document.getElementById('featuredSection');
            const grid = document.getElementById('featuredGrid');
            
            if (pinned.length === 0) {
                section.style.display = 'none';
                return;
            }
            
            const pinnedPresentations = pinned
                .map(path => presentations.find(p => p.path === path))
                .filter(Boolean);
            
            grid.innerHTML = pinnedPresentations
                .map(p => renderCardHTML(p, 'featured-card'))
                .join('');
            section.style.display = 'block';
        }
        
        // Render Recently Viewed section
        function renderRecentSection() {
            const views = JSON.parse(localStorage.getItem('recentViews') || '[]');
            const section = document.getElementById('mostRecentSection');
            const grid = document.getElementById('recentGrid');
            const count = document.getElementById('recentCount');
            
            if (views.length === 0) {
                section.style.display = 'none';
                return;
            }
            
            const recentPresentations = views
                .map(v => presentations.find(p => p.path === v.path))
                .filter(Boolean)
                .slice(0, 6);
            
            grid.innerHTML = recentPresentations
                .map(p => renderCardHTML(p))
                .join('');
            count.textContent = recentPresentations.length;
            section.style.display = 'block';
        }
        
        // Render all dynamic sections
        function renderDynamicSections() {
            renderFeaturedSection();
            renderRecentSection();
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', renderDynamicSections);
        
        // Mouse-tracking gradient
        document.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });
        
        function toggleSection(header) {
            const section = header.parentElement;
            section.classList.toggle('collapsed');
        }
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const sections = document.querySelectorAll('.folder-section');
                
                sections.forEach(section => {
                    const cards = section.querySelectorAll('.presentation-card');
                    let visibleCount = 0;
                    
                    cards.forEach(card => {
                        const title = card.dataset.title || card.querySelector('.card-title')?.textContent.toLowerCase() || '';
                        const matches = !query || title.includes(query);
                        card.classList.toggle('hidden', !matches);
                        if (matches) visibleCount++;
                    });
                    
                    section.style.display = visibleCount === 0 ? 'none' : 'block';
                    if (query && visibleCount > 0) {
                        section.classList.remove('collapsed');
                    }
                });
            });
        }
    </script>
</body>
</html>`;

  return html;
}

// Extract zip files containing presentations with assets
async function extractZipFiles() {
  const zipFiles = await glob('**/*.zip', { cwd: CONFIG.presentationsDir });

  if (zipFiles.length === 0) return;

  console.log(`📦 Found ${zipFiles.length} zip file(s) to extract...`);

  for (const zipFile of zipFiles) {
    const zipPath = path.join(CONFIG.presentationsDir, zipFile);
    const zipDir = path.dirname(zipPath);
    const extractDir = path.join(zipDir, path.basename(zipFile, '.zip'));

    console.log(`  Extracting: ${zipFile}`);

    // Create extraction directory
    await fs.ensureDir(extractDir);

    // Extract zip contents
    await fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractDir }))
      .promise();

    // Find HTML files in extracted content
    const extractedHtml = await glob('**/*.html', { cwd: extractDir });
    for (const htmlFile of extractedHtml) {
      const srcPath = path.join(extractDir, htmlFile);
      const destPath = path.join(zipDir, path.basename(htmlFile));

      // If HTML references relative assets, we need to copy assets too
      const htmlContent = await fs.readFile(srcPath, 'utf-8');
      const assetDir = path.join(CONFIG.docsDir, 'presentations', path.dirname(zipFile), 'assets', path.basename(htmlFile, '.html'));
      await fs.ensureDir(assetDir);

      // Copy any assets from the extracted folder (images, styles, scripts, fonts)
      const assets = await glob('**/*.{png,jpg,jpeg,gif,svg,webp,css,js,json,woff,woff2,ttf,otf,eot,mp4,webm,ico}', { cwd: extractDir });
      for (const asset of assets) {
        const assetSrc = path.join(extractDir, asset);
        const assetDest = path.join(assetDir, path.basename(asset));
        await fs.copy(assetSrc, assetDest);
      }

      // Update HTML to reference assets from new location
      let updatedHtml = htmlContent;
      for (const asset of assets) {
        const assetName = path.basename(asset);
        updatedHtml = updatedHtml.replace(
          new RegExp(`["']([^"']*${assetName})["']`, 'g'),
          `"assets/${path.basename(htmlFile, '.html')}/${assetName}"`
        );
      }

      await fs.writeFile(destPath, updatedHtml);
      console.log(`    ✓ Extracted: ${path.basename(htmlFile)} with ${assets.length} asset(s)`);
    }

    // Clean up: remove extracted directory and original zip
    await fs.remove(extractDir);
    await fs.remove(zipPath);
    console.log(`  ✓ Cleaned up ${zipFile}`);
  }
  console.log('');
}

// Main build function
async function buildLibrary() {
  console.log('🚀 Building CIQ Presentation Library...\n');

  // 0. Extract any zip files first
  await extractZipFiles();

  // 1. Ensure directories exist
  console.log('📁 Setting up directories...');
  await fs.ensureDir(CONFIG.docsDir);
  await fs.ensureDir(path.join(CONFIG.docsDir, 'presentations'));
  await fs.ensureDir(path.join(CONFIG.docsDir, 'thumbnails'));

  // 2. Find all presentations (HTML, PDF, PPTX)
  console.log('🔍 Scanning for presentations...');
  const presentationFiles = await glob('**/*.{html,pdf,pptx}', {
    cwd: CONFIG.presentationsDir,
    ignore: ['**/node_modules/**', '**/assets/**']
  });
  console.log(`   Found ${presentationFiles.length} presentation(s)\n`);

  if (presentationFiles.length === 0) {
    console.log('⚠️  No presentations found in presentations/ folder');
    console.log('   Add HTML, PDF, or PPTX files to presentations/ and run npm run build again\n');
  }

  // 3. Process each presentation, grouping by folder
  const presentationsByFolder = {};

  for (const relPath of presentationFiles) {
    console.log(`📄 Processing: ${relPath}`);

    const filePath = path.join(CONFIG.presentationsDir, relPath);
    const ext = path.extname(relPath).toLowerCase().replace('.', '');
    const metadata = extractMetadataForFile(filePath, relPath);

    // Ensure folder exists in output
    const outputDir = path.join(CONFIG.docsDir, 'presentations', path.dirname(relPath));
    await fs.ensureDir(outputDir);

    // Copy file to docs (preserving folder structure)
    await fs.copy(filePath, path.join(CONFIG.docsDir, 'presentations', relPath));
    console.log(`  ✓ Copied to docs/presentations/${path.dirname(relPath) || '.'}/`);

    // Copy any sibling assets (for HTML files only)
    if (ext === 'html') {
      const siblingAssets = await glob('*.{png,jpg,jpeg,gif,svg,webp,css,js,woff,woff2,ttf}', {
        cwd: path.dirname(filePath)
      });
      for (const asset of siblingAssets) {
        const src = path.join(path.dirname(filePath), asset);
        const dest = path.join(outputDir, asset);
        await fs.copy(src, dest);
      }

      // Also copy assets subfolder if it exists
      const assetsDir = path.join(path.dirname(filePath), 'assets');
      if (fs.existsSync(assetsDir)) {
        await fs.copy(assetsDir, path.join(outputDir, 'assets'));
        console.log(`  ✓ Copied assets folder`);
      }
    }

    // Generate thumbnail (flatten path for thumbnail filename)
    const thumbnailName = relPath.replace(/\//g, '_').replace('.' + ext, '.png');
    const thumbnailPath = path.join(CONFIG.docsDir, 'thumbnails', thumbnailName);
    await generateThumbnailForFile(filePath, thumbnailPath, ext);

    // Group by folder
    if (!presentationsByFolder[metadata.folder]) {
      presentationsByFolder[metadata.folder] = [];
    }
    presentationsByFolder[metadata.folder].push(metadata);
    console.log('');
  }

  // 4. Sort presentations within each folder by date (newest first)
  for (const folder of Object.keys(presentationsByFolder)) {
    presentationsByFolder[folder].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Collect all presentations for Most Recent section
  const allPresentations = Object.values(presentationsByFolder).flat();

  // 5. Generate landing page with collapsible sections
  console.log('🎨 Building landing page with folder sections...');
  const totalCount = presentationFiles.length;
  const indexHtml = buildLandingPage(presentationsByFolder, totalCount, allPresentations);
  await fs.writeFile(path.join(CONFIG.docsDir, 'index.html'), indexHtml);
  console.log('  ✓ index.html created');

  // 5.5 Update protected-viewer.html with current access code
  const viewerPath = path.join(CONFIG.docsDir, 'protected-viewer.html');
  if (fs.existsSync(viewerPath)) {
    let viewerHtml = await fs.readFile(viewerPath, 'utf-8');
    viewerHtml = viewerHtml.replace(
      /const ACCESS_CODES = \\[.*?\\];/,
      `const ACCESS_CODES = ${JSON.stringify(CONFIG.accessCodes)};`
    );
    await fs.writeFile(viewerPath, viewerHtml);
    console.log(`  ✓ protected-viewer.html updated with access code: ${CONFIG.accessCodes[0]}`);
  }

  // 6. Summary
  console.log('');
  console.log('✅ Build complete!');
  console.log(`   ${totalCount} presentation(s) in ${Object.keys(presentationsByFolder).length} folder(s)`);
  console.log(`   Output: docs/ directory (ready for GitHub Pages)`);
  console.log('\n📤 Next steps:');
  console.log('   git add .');
  console.log('   git commit -m "Update presentation library"');
  console.log('   git push origin main');
  console.log('\n🌐 View locally:');
  console.log('   npm run serve');
}

// Run build
buildLibrary().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
