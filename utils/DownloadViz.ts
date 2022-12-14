import { saveAs } from 'file-saver';
import { stripTitle } from 'utils/explorer';
import * as echarts from 'echarts/core';
import watermark from 'watermarkjs';

function fileName(type, name, indicator, format) {
  // splitting the string to find the required part of title
  const shortName = stripTitle(name);

  // If there is no type, eg: table, don;t add it to the name
  if (type != 'NA' && format != 'csv')
    return `${shortName} - ${indicator} - ${type}.${format}`;
  else return `${shortName} - ${indicator}.${format}`;
}

function download_csv(csv, filename) {
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  // File name
  downloadLink.download = filename;

  // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Make sure that the link is not displayed
  downloadLink.style.display = 'none';

  // Add the link to your DOM
  document.body.appendChild(downloadLink);

  downloadLink.click();
}

export function export_table_to_csv(filename: any) {
  const csv = [];
  const rows = document.querySelectorAll('#tableView tr');

  for (let i = 0; i < rows.length; i += 1) {
    const row = [];
    const cols = rows[i].querySelectorAll('td, th') as any;

    for (let j = 0; j < cols.length; j += 1) row.push(cols[j].innerText);

    csv.push(row.join(','));
  }

  // Download CSV
  download_csv(csv.join('\n'), filename);
}

function svg2img(name, type, indicator) {
  const myChart = echarts.getInstanceByDom(
    document.querySelector('.echarts-for-react')
  );

  const url = myChart.getConnectedDataURL({
    pixelRatio: 5, //derived ratio picture resolution, default 1
    backgroundColor: '#fff', //chart background color
    excludeComponents: ['toolbox'],
    type: 'png', //Image types support png and jpeg
  });

  watermark([url, '/assets/images/jh_logo.png'])
    .image(watermark.image.lowerRight(0.5))
    .then((img) => saveAs(img.src, fileName(type, name, indicator, 'png')));
}

export function downloadSelector(viz, name, type, indicator) {
  if (viz == '#tableView')
    export_table_to_csv(fileName(type, name, indicator, 'csv'));
  else svg2img(name, type, indicator);
}
