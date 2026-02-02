import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const W = 256;
const H = 256;

function hexToRgba(hex, a = 255) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
    a,
  ];
}

function setPixel(img, x, y, rgba) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  img[i + 0] = rgba[0];
  img[i + 1] = rgba[1];
  img[i + 2] = rgba[2];
  img[i + 3] = rgba[3];
}

function fillRect(img, x0, y0, x1, y1, rgba) {
  const minX = Math.max(0, Math.floor(Math.min(x0, x1)));
  const maxX = Math.min(W - 1, Math.ceil(Math.max(x0, x1)));
  const minY = Math.max(0, Math.floor(Math.min(y0, y1)));
  const maxY = Math.min(H - 1, Math.ceil(Math.max(y0, y1)));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) setPixel(img, x, y, rgba);
  }
}

function pointInPoly(x, y, points) {
  // Ray-casting algorithm.
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1];
    const xj = points[j][0], yj = points[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function fillPolygon(img, points, rgba) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const x0 = Math.max(0, Math.floor(minX));
  const x1 = Math.min(W - 1, Math.ceil(maxX));
  const y0 = Math.max(0, Math.floor(minY));
  const y1 = Math.min(H - 1, Math.ceil(maxY));

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (pointInPoly(x + 0.5, y + 0.5, points)) setPixel(img, x, y, rgba);
    }
  }
}

// --- PNG encoding (RGBA, filter 0) ---
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n >>> 0, 0);
  return b;
}

function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const d = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const len = u32(d.length);
  const crc = u32(crc32(Buffer.concat([t, d])));
  return Buffer.concat([len, t, d, crc]);
}

function encodePng(rgbaBytes) {
  // Raw scanlines: [filter=0][RGBA...]
  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    const rowStart = y * (W * 4 + 1);
    raw[rowStart] = 0;
    const srcStart = y * W * 4;
    rgbaBytes.copy(raw, rowStart + 1, srcStart, srcStart + W * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const idat = deflateSync(raw, { level: 9 });

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function makeLogo({ sail, sailHi, mast, hull, water }) {
  const img = Buffer.alloc(W * H * 4, 0);

  // Mast
  fillRect(img, 126, 54, 130, 206, mast);

  // Front sail (triangle)
  fillPolygon(img, [
    [128, 58],
    [78, 182],
    [128, 182],
  ], sail);
  fillPolygon(img, [
    [128, 74],
    [94, 182],
    [128, 182],
  ], sailHi);

  // Back sail
  fillPolygon(img, [
    [128, 70],
    [128, 182],
    [176, 182],
  ], sail);
  fillPolygon(img, [
    [128, 86],
    [128, 182],
    [160, 182],
  ], sailHi);

  // Hull
  fillPolygon(img, [
    [70, 182],
    [186, 182],
    [160, 206],
    [96, 206],
  ], hull);

  // Water line (subtle)
  fillRect(img, 64, 210, 192, 212, water);

  return img;
}

const DAY = {
  sail: hexToRgba('#C9A961', 230),
  sailHi: hexToRgba('#E5C896', 210),
  mast: hexToRgba('#C9A961', 255),
  hull: hexToRgba('#9B7E46', 240),
  water: hexToRgba('#8B9DC3', 90),
};

const NIGHT = {
  sail: hexToRgba('#C9A961', 210),
  sailHi: hexToRgba('#E5C896', 160),
  mast: hexToRgba('#C9A961', 255),
  hull: hexToRgba('#1A2332', 220),
  water: hexToRgba('#8B9DC3', 70),
};

writeFileSync('public/logo-day.png', encodePng(makeLogo(DAY)));
writeFileSync('public/logo-night.png', encodePng(makeLogo(NIGHT)));

console.log('Generated public/logo-day.png and public/logo-night.png');

