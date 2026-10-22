import fs from 'fs';
import path from 'path';

async function downloadLogos() {
  const dir = path.resolve('./public/logos');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const logos = [
    {
      name: 'smyrna.png',
      url: 'https://www.smyrna.se/Files/bilder/smyrna_logo_2023.png',
    },
    {
      name: 'salvation-army.png',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/The_Salvation_Army_Logo.svg/512px-The_Salvation_Army_Logo.svg.png',
    },
    {
      name: 'svenska-kyrkan.png',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Church_of_Sweden_logo.svg/512px-Church_of_Sweden_logo.svg.png',
    },
    {
      name: 'rccg.png',
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/The_Redeemed_Christian_Church_of_God_logo.svg/512px-The_Redeemed_Christian_Church_of_God_logo.svg.png',
    },
    {
      name: 'hillsong.png',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Hillsong_Church_logo.png',
    }
  ];

  for (const item of logos) {
    try {
      console.log(`Downloading ${item.name} from ${item.url}...`);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(dir, item.name), Buffer.from(buffer));
        console.log(`Successfully saved ${item.name} (${buffer.byteLength} bytes)`);
      } else {
        console.error(`Failed to download ${item.name}: ${res.status} ${res.statusText}`);
      }
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
}

downloadLogos().catch(console.error);
