import fs from 'fs';
import {
  stateSchemeFetch,
  updatedFetchQuery,
  generateSlug,
  fetchNotesId
} from 'utils/fetch';

const baseUrl = 'https://girleducation.in';
const Sitemap = () => {};

function deSlug(str) {
  const re = /(\b[a-z](?!\s))/g;
  const capital = str.replace(re, function (x) {
    return x.toUpperCase();
  });

  return capital.replace('-', ' ');
}

export const getServerSideProps = async function ({ res }) {
    // get JSON URL
    const notesId = await fetchNotesId();

    const staticPages = fs
      .readdirSync('pages')
      .filter((staticPage) => {
        return ![
          '_app.js',
          '_document.js',
          '_error.tsx',
          'sitemap.xml.js',
          'index.tsx',
          '[datasets]',
          '[explorer]',
        ].includes(staticPage);
      })
      .map((staticPagePath) => {
        return `${baseUrl}/${staticPagePath}`; // Add Static pages like resources, about
      });
    staticPages.unshift(baseUrl); // Remove duplicate of base url
    
    staticPages.push(`${baseUrl}/datasets`,`${baseUrl}/scheme/summary-data`)

    notesId.forEach(id =>{
      staticPages.push(`${baseUrl}/datasets/${id}`)
    })
  
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