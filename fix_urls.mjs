import fs from 'fs';
import https from 'https';
import path from 'path';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 304);
    }).on('error', () => {
      resolve(false);
    });
  });
};

const main = async () => {
  const files = [
    'Frontend/src/pages/Products.tsx',
    'Frontend/src/components/FeaturedProducts.tsx',
    'Frontend/src/pages/ProductDetails.tsx'
  ];

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    const regex = /name:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']+)["']/gs;
    let match;
    let matches = [];
    while ((match = regex.exec(content)) !== null) {
      matches.push({
        name: match[1],
        url: match[2],
        fullMatch: match[0],
      });
    }

    let modified = false;
    for (const m of matches) {
      if (m.url.includes('unsplash.com')) {
        const isOk = await checkUrl(m.url);
        if (!isOk) {
          console.log(`Broken URL found for ${m.name} in ${filePath}: ${m.url}`);
          // e.g. "Webcam HD" -> "webcam"
          const keyword = m.name.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
          const newUrl = `https://loremflickr.com/400/300/${keyword}?random=${Math.floor(Math.random() * 1000)}`;
          const newMatch = m.fullMatch.replace(m.url, newUrl);
          content = content.replace(m.fullMatch, newMatch);
          modified = true;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`${filePath} updated.`);
    } else {
      console.log(`No broken URLs found in ${filePath}.`);
    }
  }
};

main();
