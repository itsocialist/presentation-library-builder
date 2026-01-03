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
  libraryTitle: 'CIQ Presentations',
  theme: 'dark'
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

// Build the landing page with collapsible folder sections
function buildLandingPage(presentationsByFolder, totalCount, allPresentations) {
  const folderNames = Object.keys(presentationsByFolder).sort((a, b) => {
    // Put "Uncategorized" at the end
    if (a === 'Uncategorized') return 1;
    if (b === 'Uncategorized') return -1;
    return a.localeCompare(b);
  });

  const renderCard = (p, extraClass = '') => `
    <div class="card-wrapper" data-path="${p.relPath}">
      <button class="pin-btn" onclick="handlePin(event, '${p.relPath}')" title="Pin to Featured">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
      </button>
      <a href="presentations/${p.relPath}" class="presentation-card ${extraClass}" 
         data-path="${p.relPath}" data-title="${p.title.toLowerCase()}" 
         data-tags="${p.tags.join(' ').toLowerCase()}" data-folder="${p.folder.toLowerCase()}"
         onclick="trackView('${p.relPath}')">
        <img src="thumbnails/${p.relPath.split('/').join('_').replace('.html', '.png')}" alt="${p.title}" class="thumbnail" loading="lazy">
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
    </style>
</head>
<body>
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

  // 2. Find all HTML presentations (including in subfolders)
  console.log('🔍 Scanning for presentations...');
  const htmlFiles = await glob('**/*.html', {
    cwd: CONFIG.presentationsDir,
    ignore: ['**/node_modules/**', '**/assets/**']
  });
  console.log(`   Found ${htmlFiles.length} presentation(s)\n`);

  if (htmlFiles.length === 0) {
    console.log('⚠️  No presentations found in presentations/ folder');
    console.log('   Add HTML files to presentations/ and run npm run build again\n');
  }

  // 3. Process each presentation, grouping by folder
  const presentationsByFolder = {};

  for (const relPath of htmlFiles) {
    console.log(`📄 Processing: ${relPath}`);

    const htmlPath = path.join(CONFIG.presentationsDir, relPath);
    const metadata = extractMetadata(htmlPath, relPath);

    // Ensure folder exists in output
    const outputDir = path.join(CONFIG.docsDir, 'presentations', path.dirname(relPath));
    await fs.ensureDir(outputDir);

    // Copy HTML to docs (preserving folder structure)
    await fs.copy(htmlPath, path.join(CONFIG.docsDir, 'presentations', relPath));
    console.log(`  ✓ Copied to docs/presentations/${path.dirname(relPath) || '.'}/`);

    // Copy any sibling assets (e.g., images, css in same folder)
    const siblingAssets = await glob('*.{png,jpg,jpeg,gif,svg,webp,css,js,woff,woff2,ttf}', {
      cwd: path.dirname(htmlPath)
    });
    for (const asset of siblingAssets) {
      const src = path.join(path.dirname(htmlPath), asset);
      const dest = path.join(outputDir, asset);
      await fs.copy(src, dest);
    }

    // Also copy assets subfolder if it exists
    const assetsDir = path.join(path.dirname(htmlPath), 'assets');
    if (fs.existsSync(assetsDir)) {
      await fs.copy(assetsDir, path.join(outputDir, 'assets'));
      console.log(`  ✓ Copied assets folder`);
    }

    // Generate thumbnail (flatten path for thumbnail filename)
    const thumbnailName = relPath.replace(/\//g, '_').replace('.html', '.png');
    const thumbnailPath = path.join(CONFIG.docsDir, 'thumbnails', thumbnailName);
    await generateThumbnail(htmlPath, thumbnailPath);

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
  const totalCount = htmlFiles.length;
  const indexHtml = buildLandingPage(presentationsByFolder, totalCount, allPresentations);
  await fs.writeFile(path.join(CONFIG.docsDir, 'index.html'), indexHtml);
  console.log('  ✓ index.html created\n');

  // 6. Summary
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
