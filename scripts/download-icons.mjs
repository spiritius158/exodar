import { writeFile } from 'fs/promises';

// Classic WoW class icon URLs from Wowhead CDN - these are the original vanilla class icons
const classIcons = {
  warrior: 'https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg',
  paladin: 'https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg',
  hunter: 'https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg',
  rogue: 'https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg',
  priest: 'https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg',
  shaman: 'https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg',
  mage: 'https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg',
  warlock: 'https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg',
  druid: 'https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg',
};

for (const [name, url] of Object.entries(classIcons)) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${name}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(`public/images/classes/${name}.jpg`, buffer);
    console.log(`[v0] Downloaded ${name} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`[v0] Failed to download ${name}:`, err.message);
  }
}

console.log('[v0] Done downloading all class icons');
