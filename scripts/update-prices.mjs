import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'components', 'character-marketplace.tsx');

console.log('Reading from:', filePath);

let content = readFileSync(filePath, 'utf-8');

const priceRegex = /price: (\d+\.\d+)/g;
const oldPrices = [];
let match;
while ((match = priceRegex.exec(content)) !== null) {
  oldPrices.push(parseFloat(match[1]));
}

console.log(`Found ${oldPrices.length} prices`);
console.log(`Current range: $${Math.min(...oldPrices)} - $${Math.max(...oldPrices)}`);

const oldMin = Math.min(...oldPrices);
const oldMax = Math.max(...oldPrices);
const targetMin = 267.99;
const targetMax = 389.99;

const updated = content.replace(priceRegex, (fullMatch, priceStr) => {
  const oldPrice = parseFloat(priceStr);
  const ratio = oldMax === oldMin ? 0.5 : (oldPrice - oldMin) / (oldMax - oldMin);
  let newPrice = targetMin + ratio * (targetMax - targetMin);
  newPrice = Math.floor(newPrice) + 0.99;
  return `price: ${newPrice.toFixed(2)}`;
});

writeFileSync(filePath, updated, 'utf-8');

// Verify
const verifyContent = readFileSync(filePath, 'utf-8');
const newPrices = [];
const verifyRegex = /price: (\d+\.\d+)/g;
while ((match = verifyRegex.exec(verifyContent)) !== null) {
  newPrices.push(parseFloat(match[1]));
}

console.log(`\nUpdated ${newPrices.length} prices`);
console.log(`New range: $${Math.min(...newPrices)} - $${Math.max(...newPrices)}`);
newPrices.slice(0, 10).forEach((p, i) => console.log(`  Char ${i+1}: $${p}`));
