import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://mgcreparation.ca';

const STATIC_PAGES = [
  '',
  '/about',
  '/contact',
  '/services',
  '/politique-de-confidentialite',
  '/offre',
  '/bilan',
  '/pneus'
];

const SERVICES = [
  'general-mechanics',
  'ac-service',
  'heavy-vehicle-mechanics',
  'trailer-repair',
  'generator-services',
  'welding-assembly'
];

const CITIES = [
  'terrebonne',
  'mascouche',
  'blainville',
  'laval',
  'repentigny',
  'bois-des-filion',
  'lorraine',
  'rosemere'
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 1. Static Pages
  STATIC_PAGES.forEach(page => {
    xml += `
  <url>
    <loc>${DOMAIN}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // 2. Service Pages
  SERVICES.forEach(slug => {
    xml += `
  <url>
    <loc>${DOMAIN}/services/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // 3. Location Pages (The Octopus Tentacles)
  CITIES.forEach(city => {
    xml += `
  <url>
    <loc>${DOMAIN}/mechanic-${city}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // 4. pSEO Dynamic FAQ Pages
  try {
    const pSEOPath = path.resolve(__dirname, '../data/pseo_content.json');
    if (fs.existsSync(pSEOPath)) {
      const fileContent = fs.readFileSync(pSEOPath, 'utf8');
      const pseoData = JSON.parse(fileContent);
      const slugs = Object.keys(pseoData);

      slugs.forEach(slug => {
        xml += `
  <url>
    <loc>${DOMAIN}/faq/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
      console.log(`✅ Added ${slugs.length} pSEO pages to sitemap from JSON.`);
    }
  } catch (err) {
    console.error("Error adding pSEO pages to sitemap:", err);
  }

  xml += `
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');

  // Ensure public dir exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
