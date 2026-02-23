import fs from 'fs';
import path from 'path';

function resolveTheirs(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Match conflict markers.
    // <<<<<<< HEAD\n ... \n=======\n ... \n>>>>>>> [hash]\n
    const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> [^\r\n]+\r?\n/g;
    content = content.replace(regex, (match, headText, theirsText) => {
        return theirsText;
    });
    fs.writeFileSync(filePath, content);
    console.log('Resolved ' + filePath);
}

resolveTheirs('src/components/HeroSection.tsx');
resolveTheirs('src/components/NeoHero.tsx');
resolveTheirs('src/pages/Index.tsx');
resolveTheirs('src/pages/Solutions.tsx');
resolveTheirs('src/pages/business/BusinessHome.tsx');
resolveTheirs('src/pages/shop/ShopHome.tsx');
