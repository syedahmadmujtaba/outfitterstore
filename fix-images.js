import fs from 'fs';
const data = fs.readFileSync('lib/data.ts', 'utf8');
const result = data.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?q=80\&w=800\&auto=format\&fit=crop/g, 'https://picsum.photos/seed/fixed/800/800');
fs.writeFileSync('lib/data.ts', result);
console.log('Done');
