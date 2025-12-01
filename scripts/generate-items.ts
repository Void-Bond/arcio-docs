const fs = require('fs');
const path = require('path');
const { itemData } = require('../.vitepress/src/data/items'); // adjust to your export

itemData.forEach((item: any) => {
    const content = `---
title: ${item.name}
description: ${item.description || ''}
---
# ${item.name}

${item.description || ''}

<ItemPreview :name=${JSON.stringify(item.name)} />
`;
    fs.writeFileSync(path.join(__dirname, '..', 'docs', 'item', `${item.uri}.md`), content);
});