import fs from 'fs';
import {
  fetchNotesId,
} from 'utils/fetch';

import { fetchBudgetJSON, generateSlug } from 'utils/data';
import * as data from 'data/statedata/statedata';

const baseUrl = 'https://girleducation.in';
const Sitemap = () => {};

export const getServerSideProps = async function ({ res }) {
  // get JSON URL
  const notesId = await fetchNotesId();
  const stateBudgetData = await fetchBudgetJSON('budget', 'bihar');

  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.js',
        '_document.js',
        '_error.tsx',
        'sitemap.xml.js',
        'index.tsx',
        '[state]',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`; // Add Static pages like resources, about
    });
  staticPages.unshift(baseUrl); // Remove duplicate of base url

  data.stateArray.forEach(async (state) => {
    const slug = generateSlug(state);
    staticPages.push(`${baseUrl}/${slug}`);

    staticPages.push(`${baseUrl}/${slug}/budget`);

    Object.keys(stateBudgetData).forEach((code) => {
      staticPages.push(`${baseUrl}/${slug}/budget?scheme=${code}`);
    });

    if (state === 'Uttar Pradesh') {
      staticPages.push(
        `${baseUrl}/${slug}/datasets`,
        `${baseUrl}/${slug}/datasets/summary-data`
      );
      notesId.forEach((id) => {
        staticPages.push(`${baseUrl}/${slug}/datasets/${id}`);
      });
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages
          .map((url) => {
            return `
              <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
          })
          .join('')}
      </urlset>
    `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;