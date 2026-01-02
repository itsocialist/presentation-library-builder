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
function extractMetadata(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf-8');

  const metadata = {
    filename: path.basename(htmlPath),
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

// Build the landing page index.html
function buildLandingPage(presentations) {
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
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
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
        
        h1 {
            font-size: 2.5rem;
            font-weight: 300;
            color: var(--slate-200);
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            font-size: 1.1rem;
            color: var(--slate-400);
        }
        
        .count {
            font-family: 'JetBrains Mono', monospace;
            color: var(--ciq-green);
            font-weight: 600;
        }
        
        .search-bar {
            max-width: 600px;
            margin: 2rem 0 0 0;
        }
        
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
        
        .search-input:focus {
            outline: none;
            border-left-width: 4px;
            background: var(--slate-900);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 2rem;
        }
        
        .presentation-card {
            background: rgba(30, 41, 59, 0.5);
            backdrop-filter: blur(20px);
            border: 1px solid var(--slate-800);
            border-left: 4px solid var(--ciq-green);
            transition: all 0.3s ease;
            overflow: hidden;
            text-decoration: none;
            display: block;
        }
        
        .presentation-card:hover {
            border-left-width: 6px;
            box-shadow: -6px 0 40px rgba(18, 166, 111, 0.2);
            transform: translateY(-4px);
        }
        
        .thumbnail {
            width: 100%;
            height: 225px;
            object-fit: cover;
            border-bottom: 1px solid var(--slate-800);
        }
        
        .card-content {
            padding: 1.5rem;
        }
        
        .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--slate-200);
            margin-bottom: 0.75rem;
            line-height: 1.3;
        }
        
        .card-meta {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: var(--slate-400);
            display: flex;
            gap: 1rem;
            margin-bottom: 0.75rem;
        }
        
        .card-tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .tag {
            background: rgba(18, 166, 111, 0.1);
            color: var(--ciq-green);
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            border: 1px solid rgba(18, 166, 111, 0.3);
            font-family: 'JetBrains Mono', monospace;
        }
        
        .footer {
            text-align: center;
            padding: 3rem;
            color: var(--slate-700);
            font-size: 0.9rem;
        }
        
        .empty-state {
            text-align: center;
            padding: 6rem 2rem;
            color: var(--slate-400);
        }
        
        .empty-state h2 {
            font-size: 1.5rem;
            color: var(--slate-300);
            margin-bottom: 1rem;
        }
        
        .code-block {
            background: var(--slate-900);
            border: 1px solid var(--slate-800);
            border-left: 3px solid var(--ciq-green);
            padding: 1rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: var(--ciq-green);
            margin: 1rem auto;
            max-width: 600px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${CONFIG.libraryTitle}</h1>
        <p class="subtitle">
            <span class="count">${presentations.length}</span> presentation${presentations.length !== 1 ? 's' : ''} available
        </p>
        <div class="search-bar">
            <input type="text" class="search-input" id="searchInput" placeholder="Search presentations...">
        </div>
    </div>
    
    <div class="container">
        ${presentations.length === 0 ? `
        <div class="empty-state">
            <h2>No presentations yet</h2>
            <p>Drop HTML presentations into the <code>presentations/</code> folder and run:</p>
            <div class="code-block">npm run build</div>
        </div>
        ` : `
        <div class="grid" id="presentationGrid">
            ${presentations.map(p => `
            <a href="presentations/${p.filename}" class="presentation-card" data-title="${p.title.toLowerCase()}" data-tags="${p.tags.join(' ').toLowerCase()}">
                <img src="thumbnails/${p.filename.replace('.html', '.png')}" alt="${p.title}" class="thumbnail" loading="lazy">
                <div class="card-content">
                    <div class="card-title">${p.title}</div>
                    <div class="card-meta">
                        <span>${p.date}</span>
                        <span>•</span>
                        <span>${p.author}</span>
                    </div>
                    ${p.tags.length > 0 ? `
                    <div class="card-tags">
                        ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    ` : ''}
                </div>
            </a>
            `).join('')}
        </div>
        `}
    </div>
    
    <div class="footer">
        Built with CIQ Presentation Library Builder • Last updated: ${new Date().toLocaleDateString()}
    </div>
    
    <script>
        const searchInput = document.getElementById('searchInput');
        const grid = document.getElementById('presentationGrid');
        
        if (searchInput && grid) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const cards = grid.querySelectorAll('.presentation-card');
                
                cards.forEach(card => {
                    const title = card.dataset.title;
                    const tags = card.dataset.tags;
                    const matches = title.includes(query) || tags.includes(query);
                    card.style.display = matches ? 'block' : 'none';
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
  const zipFiles = await glob('*.zip', { cwd: CONFIG.presentationsDir });

  if (zipFiles.length === 0) return;

  console.log(`📦 Found ${zipFiles.length} zip file(s) to extract...`);

  for (const zipFile of zipFiles) {
    const zipPath = path.join(CONFIG.presentationsDir, zipFile);
    const extractDir = path.join(CONFIG.presentationsDir, path.basename(zipFile, '.zip'));

    console.log(`  Extracting: ${zipFile}`);

    // Create extraction directory
    await fs.ensureDir(extractDir);

    // Extract zip contents
    await fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractDir }))
      .promise();

    // Move HTML files to presentations root, keep assets in subfolder
    const extractedHtml = await glob('**/*.html', { cwd: extractDir });
    for (const htmlFile of extractedHtml) {
      const srcPath = path.join(extractDir, htmlFile);
      const destPath = path.join(CONFIG.presentationsDir, path.basename(htmlFile));

      // If HTML references relative images, we need to copy assets too
      const htmlContent = await fs.readFile(srcPath, 'utf-8');
      const assetDir = path.join(CONFIG.docsDir, 'presentations', 'assets', path.basename(htmlFile, '.html'));
      await fs.ensureDir(assetDir);

      // Copy any images from the extracted folder
      const images = await glob('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: extractDir });
      for (const img of images) {
        const imgSrc = path.join(extractDir, img);
        const imgDest = path.join(assetDir, path.basename(img));
        await fs.copy(imgSrc, imgDest);
      }

      // Update HTML to reference assets from new location
      let updatedHtml = htmlContent;
      for (const img of images) {
        const imgName = path.basename(img);
        // Replace relative paths with absolute asset paths
        updatedHtml = updatedHtml.replace(
          new RegExp(`["']([^"']*${imgName})["']`, 'g'),
          `"assets/${path.basename(htmlFile, '.html')}/${imgName}"`
        );
      }

      await fs.writeFile(destPath, updatedHtml);
      console.log(`    ✓ Extracted: ${path.basename(htmlFile)} with ${images.length} asset(s)`);
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

  // 2. Find all HTML presentations
  console.log('🔍 Scanning for presentations...');
  const htmlFiles = await glob('*.html', { cwd: CONFIG.presentationsDir });
  console.log(`   Found ${htmlFiles.length} presentation(s)\n`);

  if (htmlFiles.length === 0) {
    console.log('⚠️  No presentations found in presentations/ folder');
    console.log('   Add HTML files to presentations/ and run npm run build again\n');
  }

  // 3. Process each presentation
  const presentations = [];

  for (const file of htmlFiles) {
    console.log(`📄 Processing: ${file}`);

    const htmlPath = path.join(CONFIG.presentationsDir, file);
    const metadata = extractMetadata(htmlPath);

    // Copy HTML to docs
    await fs.copy(htmlPath, path.join(CONFIG.docsDir, 'presentations', file));
    console.log(`  ✓ Copied to docs/presentations/`);

    // Generate thumbnail
    const thumbnailPath = path.join(CONFIG.docsDir, 'thumbnails', file.replace('.html', '.png'));
    await generateThumbnail(htmlPath, thumbnailPath);

    presentations.push(metadata);
    console.log('');
  }

  // 4. Sort presentations by date (newest first)
  presentations.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 5. Generate landing page
  console.log('🎨 Building landing page...');
  const indexHtml = buildLandingPage(presentations);
  await fs.writeFile(path.join(CONFIG.docsDir, 'index.html'), indexHtml);
  console.log('  ✓ index.html created\n');

  // 6. Summary
  console.log('✅ Build complete!');
  console.log(`   ${presentations.length} presentation(s) ready`);
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
