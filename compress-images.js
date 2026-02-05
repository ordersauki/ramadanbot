#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressImage(inputPath, outputPath, quality = 80, resize = null) {
  try {
    let transform = sharp(inputPath);
    
    if (resize) {
      transform = transform.resize(resize.width, resize.height, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    await transform
      .png({ quality, progressive: true, compressionLevel: 9 })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(outputPath)}`);
    console.log(`  Before: ${(inputSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  After:  ${(outputSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  Reduction: ${reduction}%\n`);
  } catch (err) {
    console.error(`✗ Error compressing ${inputPath}:`, err.message);
  }
}

async function main() {
  console.log('🖼️  Compressing images for optimal loading...\n');
  
  // Compress logo - use temp file then replace
  const logoTemp = '/workspaces/ramadanbot/public/logo-temp.png';
  await compressImage(
    '/workspaces/ramadanbot/public/logo.png',
    logoTemp,
    85,
    { width: 1200, height: 1152 }
  );
  fs.renameSync(logoTemp, '/workspaces/ramadanbot/public/logo.png');
  
  // Compress background - use temp file then replace
  const bgTemp = '/workspaces/ramadanbot/public/ramadan-background-temp.png';
  await compressImage(
    '/workspaces/ramadanbot/public/ramadan-background.png',
    bgTemp,
    80,
    { width: 1200, height: 1200 }
  );
  fs.renameSync(bgTemp, '/workspaces/ramadanbot/public/ramadan-background.png');
  
  console.log('✓ All images compressed successfully!');
  console.log('Images should now load much faster.');
}

main().catch(console.error);
