import React, { useRef,useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Button } from 'components/actions';
import { Download } from 'components/icons';
import { generateSlug } from 'utils/data';

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

export function export_table_to_csv(tableData, filename: any) {
  const csv = [];

  // Add table header content
  const tableHeader = tableData.header.map((item) => {
    return item['Header'];
  });
  csv.push(tableHeader);

  // Add table rows
  tableData.rows.forEach((item) => {
    csv.push(Object.values(item));
  });

  // Download CSV
  download_csv(csv.join('\n'), filename);
}

function createDummyCanvas(srcCanvas,data) {
  //create a dummy CANVAS
  const destinationCanvas = document.createElement('canvas');
  destinationCanvas.width = srcCanvas.width;
  destinationCanvas.height = srcCanvas.height + 60;

  const destCtx = destinationCanvas.getContext('2d');

  //create a rectangle with the desired color
  destCtx.fillStyle = '#FFFFFF';
  destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height+60);

  //draw the original canvas onto the destination canvas
  destCtx.drawImage(srcCanvas, 0, 0);

  destCtx.font = "20px Josefin Slab";
  destCtx.fillStyle = "#000";
  destCtx.fillText(`${" "}Scheme - ${data.Scheme}`, 10, 30);

  return destinationCanvas.toDataURL('image/jpeg', 2);
}

type Props = {
  viz: string;
  data?: any;
  tableData?: any;
};

let watermarkSSR;
const DownloadViz = ({ viz, data,tableData = {} }: Props) => {  

const watermarkRef = useRef(watermarkSSR);
useEffect(() => {
  (async () => {
    const x = await import('watermarkjs');
    watermarkRef.current = x.default;
  })();
}, [viz,data]);

  function svg2img(canvasElm) {
    const myChart = createDummyCanvas(canvasElm, data);
    
    watermarkRef.current([myChart, '/assets/images/cdl.png'])
      .image( watermarkRef.current.image.lowerRight(0.5))
      .then((img) => saveAs(img.src, `${generateSlug(data?.Scheme)}.jpeg`.toLowerCase()));
  }

  async function downloadSelector(viz) {
    if (viz == '#tableView')
      export_table_to_csv(tableData, `${generateSlug(data?.Scheme)}.csv`.toLowerCase());
    else {
      await import('html2canvas')
        .then((html2canvas) => {
          html2canvas
            .default(document.querySelector('.barViz'), {
              scale: 2,
            })
            .then((canvasElm) => svg2img(canvasElm));
        })
        .catch((e) => {
          console.error('load failed');
        });
    }
  }

  return (
    <Button
      onClick={() => downloadSelector(viz)}
      size="md"
      bg='var(--color-violet-2)'
      icon={<Download />}
    >
      {`Download ${viz == '#tableView' ? 'CSV' : 'Visualization'}`}
    </Button>
  );
};

export default DownloadViz;

