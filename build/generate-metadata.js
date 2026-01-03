#!/usr/bin/env node
/**
 * Generate metadata.json files for all presentations
 * Run: node build/generate-metadata.js
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PRESENTATIONS_DIR = path.join(__dirname, '..', 'presentations');
const METADATA_DIR = path.join(__dirname, '..', 'metadata');

// Ensure metadata directory exists
if (!fs.existsSync(METADATA_DIR)) {
    fs.mkdirSync(METADATA_DIR, { recursive: true });
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function extractMetadataFromHTML(filePath, folder) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    const title = $('title').text() || path.basename(filePath, '.html');
    const description = $('meta[name="description"]').attr('content') || '';
    const author = $('meta[name="author"]').attr('content') || 'Brian Dawson';

    // Get file stats for dates
    const stats = fs.statSync(filePath);
    const created = stats.birthtime.toISOString().split('T')[0];
    const modified = stats.mtime.toISOString().split('T')[0];

    // Generate analytics_id from path
    const relativePath = path.relative(PRESENTATIONS_DIR, filePath);
    const analyticsId = slugify(relativePath.replace('.html', ''));

    return {
        title: title.trim(),
        description: description.trim(),
        folder: folder,
        tags: [],
        visibility: 'published',
        created,
        modified,
        author,
        notes: '',
        analytics_id: analyticsId
    };
}

function processFolder(folderPath, folderName) {
    const items = fs.readdirSync(folderPath);
    const generated = [];

    for (const item of items) {
        const itemPath = path.join(folderPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            // Recurse into subdirectories
            generated.push(...processFolder(itemPath, folderName));
        } else if (item.endsWith('.html')) {
            const metadata = extractMetadataFromHTML(itemPath, folderName);
            const metadataFileName = `${metadata.analytics_id}.json`;
            const metadataPath = path.join(METADATA_DIR, metadataFileName);

            // Only create if doesn't exist (preserve manual edits)
            if (!fs.existsSync(metadataPath)) {
                fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
                console.log(`✅ Created: ${metadataFileName}`);
            } else {
                console.log(`⏭️  Skipped (exists): ${metadataFileName}`);
            }
            generated.push(metadataFileName);
        }
    }

    return generated;
}

// Main execution
console.log('📦 Generating metadata for presentations...\n');

const folders = fs.readdirSync(PRESENTATIONS_DIR).filter(item => {
    const itemPath = path.join(PRESENTATIONS_DIR, item);
    return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
});

let totalGenerated = 0;
for (const folder of folders) {
    const folderPath = path.join(PRESENTATIONS_DIR, folder);
    const generated = processFolder(folderPath, folder);
    totalGenerated += generated.length;
}

console.log(`\n✨ Processed ${totalGenerated} presentations`);
console.log(`📁 Metadata files: ${METADATA_DIR}`);
