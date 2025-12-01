const fs = require('fs');
const path = require('path');
const { itemData } = require('../.vitepress/src/data/items.ts'); // adjust to your export

// Look for either <IndexerStop /> or <IndexStop /> and capture everything after it
const MARKER_REGEX = /<Index(?:er)?Stop\s*\/\s*>/;

itemData.forEach((item) => {
    const generated = `---
title: ${item.name}
description: ${item.description || ''}
---
# ${item.name}

${item.description || ''}

<IndexerStop />
`;

    const destPath = path.join(__dirname, '..', 'docs', 'item', `${item.uri}.md`);

    let trailing = '';
    if (fs.existsSync(destPath)) {
        try {
            const existing = fs.readFileSync(destPath, 'utf8');
            const m = MARKER_REGEX.exec(existing);
            if (m) {
                // everything after the marker
                trailing = existing.slice(m.index + m[0].length);
            }
        } catch (err) {
            console.error(`Failed to read existing file ${destPath}:`, err);
        }
    }

    const content = generated + (trailing || '');
    fs.writeFileSync(destPath, content, 'utf8');
});