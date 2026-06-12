import { writeFileSync } from "node:fs";
import { join } from "node:path";

const size = 32;
const pixels = new Uint8ClampedArray(size * size * 4);

const colors = {
  background: [6, 78, 59, 255],
  foreground: [255, 255, 255, 255],
  accent: [167, 243, 208, 255],
  transparent: [0, 0, 0, 0],
};

function setPixel(x, y, color) {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const offset = (y * size + x) * 4;
  pixels.set(color, offset);
}

function fillRect(x, y, width, height, color) {
  for (let row = y; row < y + height; row += 1) {
    for (let column = x; column < x + width; column += 1) {
      setPixel(column, row, color);
    }
  }
}

function fillRoundedBackground() {
  const radius = 7;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x < radius ? radius - x : x >= size - radius ? x - (size - radius - 1) : 0;
      const dy = y < radius ? radius - y : y >= size - radius ? y - (size - radius - 1) : 0;
      const insideCorner = dx === 0 || dy === 0 || dx * dx + dy * dy <= radius * radius;
      setPixel(x, y, insideCorner ? colors.background : colors.transparent);
    }
  }
}

function drawLogo() {
  fillRect(8, 9, 4, 15, colors.foreground);
  fillRect(20, 9, 4, 15, colors.foreground);

  for (let i = 0; i < 8; i += 1) {
    fillRect(12 + i, 10 + i, 3, 3, colors.foreground);
    fillRect(18 - i, 10 + i, 3, 3, colors.foreground);
  }

  fillRect(23, 7, 3, 3, colors.accent);
}

function createIco() {
  fillRoundedBackground();
  drawLogo();

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

writeFileSync(join(process.cwd(), "src/app/favicon.ico"), createIco());
