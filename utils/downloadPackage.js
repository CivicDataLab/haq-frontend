import * as JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

export function downloadPackage(urls, fileName) {
  var zip = new JSZip();
  var count = 0;
  var zipFilename = `${fileName}.zip`;

  urls.forEach(function (url) {
    var filename = url.split('/')[url.split('/').length - 1];
    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        throw err; // or handle the error
      }
      zip.file(filename, data, { binary: true });
      count++;
      if (count == urls.length) {
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    });
  });

  return null;
}
