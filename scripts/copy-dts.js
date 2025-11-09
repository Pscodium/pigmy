const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'lib');
const outDir = path.resolve(__dirname, '..', 'dist');

function copyDtsFiles(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDtsFiles(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      console.log(`copied: ${srcPath} -> ${destPath}`);
    }
  }
}

try {
  copyDtsFiles(srcDir, outDir);
  console.log('Type declaration copy complete.');
} catch (err) {
  console.error('Failed to copy d.ts files:', err);
  process.exit(1);
}
