#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public');
const imageExtensions = ['.jpg', '.jpeg', '.png'];

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing: ${inputPath}`);
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    
    // Create WebP version with quality optimization
    await image
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath.replace(extname(outputPath), '.webp'));
    
    // Create optimized JPEG version as fallback
    await image
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(outputPath);
    
    console.log(`✓ Optimized: ${basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  try {
    const entries = await readdir(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        await processDirectory(fullPath);
      } else if (imageExtensions.includes(extname(entry).toLowerCase())) {
        const outputPath = join(dir, `optimized_${entry}`);
        await optimizeImage(fullPath, outputPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...');
  console.log(`📁 Processing directory: ${publicDir}`);
  
  await processDirectory(publicDir);
  
  console.log('✅ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Replace original images with optimized versions');
  console.log('2. Update image references in your code to use WebP with JPEG fallbacks');
  console.log('3. Test the website to ensure all images load correctly');
}

main().catch(console.error);
