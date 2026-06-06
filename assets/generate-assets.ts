import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { execSync } from 'child_process';

// Attempt to load sharp (optional)
let sharp: any = null;
try {
  sharp = require('sharp');
  console.log('✓ Using sharp for high-quality PNG generation');
} catch {
  console.log('⚠ Sharp not installed. Using basic PNG generator (solid colors).');
}

interface PNGChunk {
  type: string;
  data: Buffer;
}

function createChunk(type: string, data: Buffer): Buffer {
  const chunkLength = Buffer.alloc(4);
  chunkLength.writeUInt32BE(data.length, 0);
  const chunkType = Buffer.from(type);
  // Simple CRC32 implementation (Node built-in since v14? We'll use a minimal one)
  let crc = 0xffffffff;
  const combine = (buf: Buffer) => {
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
  };
  const crcTable: number[] = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c >>> 0;
  }
  combine(chunkType);
  combine(data);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE((crc ^ 0xffffffff) >>> 0, 0);
  return Buffer.concat([chunkLength, chunkType, data, crcBuf]);
}

function createSimplePNG(width: number, height: number, r: number, g: number, b: number): Buffer {
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);   // bit depth
  ihdrData.writeUInt8(2, 9);   // colour type (truecolour)
  ihdrData.writeUInt8(0, 10);  // compression
  ihdrData.writeUInt8(0, 11);  // filter
  ihdrData.writeUInt8(0, 12);  // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // Image data: unfiltered scanlines with RGB triplets
  const rowSize = width * 3;
  const imageData = Buffer.alloc(height * (rowSize + 1));
  for (let y = 0; y < height; y++) {
    imageData[y * (rowSize + 1)] = 0; // filter type 0 (none)
    for (let x = 0; x < width; x++) {
      const offset = y * (rowSize + 1) + 1 + x * 3;
      imageData[offset] = r;
      imageData[offset + 1] = g;
      imageData[offset + 2] = b;
    }
  }
  const compressed = zlib.deflateSync(imageData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);
}

async function generateAssets(): Promise<void> {
  console.log('Generating app assets...');
  const assetsDir = __dirname;
  
  // Helper to write PNG safely
  const writePNG = async (filename: string, buffer: Buffer): Promise<void> => {
    fs.writeFileSync(path.join(assetsDir, filename), buffer);
    console.log(`  ✓ ${filename}`);
  };
  
  // icon.png (512x512)
  if (sharp) {
    const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#6200ee"/>
      <text x="256" y="256" font-size="200" text-anchor="middle" dy=".3em" fill="white">📝</text>
    </svg>`;
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    await writePNG('icon.png', buffer);
  } else {
    await writePNG('icon.png', createSimplePNG(512, 512, 98, 0, 238));
  }
  
  // splash.png (1242x2436)
  if (sharp) {
    const svg = `<svg width="1242" height="2436" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" font-size="80" font-family="sans-serif" text-anchor="middle" fill="#6200ee" dy=".3em">Notes</text>
    </svg>`;
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    await writePNG('splash.png', buffer);
  } else {
    await writePNG('splash.png', createSimplePNG(1242, 2436, 245, 245, 245));
  }
  
  // adaptive-icon.png (512x512)
  if (sharp) {
    const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#6200ee"/>
      <circle cx="256" cy="256" r="180" fill="white"/>
      <text x="256" y="256" font-size="240" text-anchor="middle" dy=".3em" fill="#6200ee">📝</text>
    </svg>`;
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    await writePNG('adaptive-icon.png', buffer);
  } else {
    await writePNG('adaptive-icon.png', createSimplePNG(512, 512, 98, 0, 238));
  }
  
  // favicon.png (32x32)
  if (sharp) {
    const buffer = await sharp({
      create: { width: 32, height: 32, channels: 3, background: { r: 98, g: 0, b: 238 } }
    }).png().toBuffer();
    await writePNG('favicon.png', buffer);
  } else {
    await writePNG('favicon.png', createSimplePNG(32, 32, 98, 0, 238));
  }
  
  console.log('\n✅ All assets generated successfully in /assets');
}

// Run the generator
generateAssets().catch((err: Error) => {
  console.error('Failed to generate assets:', err.message);
  process.exit(1);
});
