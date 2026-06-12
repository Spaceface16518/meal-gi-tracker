import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const colors = {
  background: [6, 78, 59, 255],
  foreground: [255, 255, 255, 255],
  accent: [167, 243, 208, 255],
  transparent: [0, 0, 0, 0],
};

function createPixels(size, { safeArea = 1 } = {}) {
  const pixels = new Uint8ClampedArray(size * size * 4);
  const setPixel = (x, y, color) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    pixels.set(color, (y * size + x) * 4);
  };

  const fillRect = (x, y, width, height, color) => {
    for (let row = y; row < y + height; row += 1) {
      for (let column = x; column < x + width; column += 1) {
        setPixel(column, row, color);
      }
    }
  };

  const inset = Math.round(size * (1 - safeArea) * 0.5);
  const end = size - inset;
  const radius = Math.round(size * 0.22);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const insideBox = x >= inset && y >= inset && x < end && y < end;
      if (!insideBox) {
        setPixel(x, y, colors.transparent);
        continue;
      }

      const left = inset + radius;
      const right = end - radius - 1;
      const top = inset + radius;
      const bottom = end - radius - 1;
      const dx = x < left ? left - x : x > right ? x - right : 0;
      const dy = y < top ? top - y : y > bottom ? y - bottom : 0;
      setPixel(x, y, dx === 0 || dy === 0 || dx * dx + dy * dy <= radius * radius ? colors.background : colors.transparent);
    }
  }

  const unit = size * safeArea;
  const leftX = Math.round(inset + unit * 0.24);
  const rightX = Math.round(inset + unit * 0.63);
  const topY = Math.round(inset + unit * 0.28);
  const barW = Math.max(4, Math.round(unit * 0.11));
  const barH = Math.round(unit * 0.44);
  const diagW = Math.max(3, Math.round(unit * 0.08));
  const diagSteps = Math.round(unit * 0.23);

  fillRect(leftX, topY, barW, barH, colors.foreground);
  fillRect(rightX, topY, barW, barH, colors.foreground);

  for (let i = 0; i < diagSteps; i += 1) {
    const xOffset = Math.round(i * 0.9);
    const yOffset = Math.round(i * 0.9);
    fillRect(leftX + barW + xOffset, topY + yOffset, diagW, diagW, colors.foreground);
    fillRect(rightX - xOffset, topY + yOffset, diagW, diagW, colors.foreground);
  }

  const dot = Math.max(3, Math.round(unit * 0.1));
  fillRect(Math.round(inset + unit * 0.72), Math.round(inset + unit * 0.2), dot, dot, colors.accent);

  return pixels;
}

function createPng(size, options) {
  const pixels = createPixels(size, options);
  const scanlineLength = 1 + size * 4;
  const raw = Buffer.alloc(scanlineLength * size);

  for (let y = 0; y < size; y += 1) {
    const rowOffset = y * scanlineLength;
    raw[rowOffset] = 0;
    for (let x = 0; x < size; x += 1) {
      const sourceOffset = (y * size + x) * 4;
      const targetOffset = rowOffset + 1 + x * 4;
      raw[targetOffset] = pixels[sourceOffset];
      raw[targetOffset + 1] = pixels[sourceOffset + 1];
      raw[targetOffset + 2] = pixels[sourceOffset + 2];
      raw[targetOffset + 3] = pixels[sourceOffset + 3];
    }
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    createChunk("IHDR", createIhdr(size)),
    createChunk("IDAT", deflateSync(raw)),
    createChunk("IEND", Buffer.alloc(0)),
  ]);
}

function createIhdr(size) {
  const buffer = Buffer.alloc(13);
  buffer.writeUInt32BE(size, 0);
  buffer.writeUInt32BE(size, 4);
  buffer[8] = 8;
  buffer[9] = 6;
  buffer[10] = 0;
  buffer[11] = 0;
  buffer[12] = 0;
  return buffer;
}

function createChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createIco() {
  const size = 32;
  const pixels = createPixels(size);
  const headerSize = 40;
  const xorBytes = size * size * 4;
  const andMaskBytes = size * 4;
  const bitmapSize = headerSize + xorBytes + andMaskBytes;
  const iconDirSize = 6;
  const iconEntrySize = 16;
  const buffer = Buffer.alloc(iconDirSize + iconEntrySize + bitmapSize);
  let offset = 0;

  buffer.writeUInt16LE(0, offset);
  offset += 2;
  buffer.writeUInt16LE(1, offset);
  offset += 2;
  buffer.writeUInt16LE(1, offset);
  offset += 2;
  buffer.writeUInt8(size, offset);
  offset += 1;
  buffer.writeUInt8(size, offset);
  offset += 1;
  buffer.writeUInt8(0, offset);
  offset += 1;
  buffer.writeUInt8(0, offset);
  offset += 1;
  buffer.writeUInt16LE(1, offset);
  offset += 2;
  buffer.writeUInt16LE(32, offset);
  offset += 2;
  buffer.writeUInt32LE(bitmapSize, offset);
  offset += 4;
  buffer.writeUInt32LE(iconDirSize + iconEntrySize, offset);
  offset += 4;
  buffer.writeUInt32LE(headerSize, offset);
  offset += 4;
  buffer.writeInt32LE(size, offset);
  offset += 4;
  buffer.writeInt32LE(size * 2, offset);
  offset += 4;
  buffer.writeUInt16LE(1, offset);
  offset += 2;
  buffer.writeUInt16LE(32, offset);
  offset += 2;
  buffer.writeUInt32LE(0, offset);
  offset += 4;
  buffer.writeUInt32LE(xorBytes, offset);
  offset += 4;
  buffer.writeInt32LE(2835, offset);
  offset += 4;
  buffer.writeInt32LE(2835, offset);
  offset += 4;
  buffer.writeUInt32LE(0, offset);
  offset += 4;
  buffer.writeUInt32LE(0, offset);
  offset += 4;

  for (let y = size - 1; y >= 0; y -= 1) {
    for (let x = 0; x < size; x += 1) {
      const pixelOffset = (y * size + x) * 4;
      buffer.writeUInt8(pixels[pixelOffset + 2], offset);
      buffer.writeUInt8(pixels[pixelOffset + 1], offset + 1);
      buffer.writeUInt8(pixels[pixelOffset], offset + 2);
      buffer.writeUInt8(pixels[pixelOffset + 3], offset + 3);
      offset += 4;
    }
  }

  return buffer;
}

const root = process.cwd();
writeFileSync(join(root, "src/app/favicon.ico"), createIco());
writeFileSync(join(root, "public/icon-192.png"), createPng(192));
writeFileSync(join(root, "public/icon-512.png"), createPng(512));
writeFileSync(join(root, "public/icon-maskable-512.png"), createPng(512, { safeArea: 0.78 }));
