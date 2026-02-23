import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('min-h-screen bg-background')) {
                content = content.replace(/min-h-screen bg-background/g, 'min-h-screen bg-transparent');
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

replaceInDir('./src/pages');
replaceInDir('./src/components');
