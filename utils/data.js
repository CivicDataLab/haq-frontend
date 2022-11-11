import { read, utils as xlsxUtil } from 'xlsx';

export async function fetchQuery(query, value) {
  const queryRes = await fetch(
    `http://13.232.98.238/api/3/action/package_show?id=${value}`
  ).then((res) => res.json());

  return queryRes.result;
}
export function generateSlug(slug) {
  if (slug) {
    const temp = slug.toLowerCase().replace(/\W/g, '-'); // lower case and replace space & special chars witn '-'
    return temp.replace(/-+/g, '-').replace(/-$/, ''); // remove multiple '-' and remove '-' from end of string
  }
  return null;
}

const isObject = (val) => {
  if (val === null) {
      return false;
  }
  return typeof val === 'object';
};

export async function fetchSheets(link) {
  const result = [];
  await fetch(link)
    .then((res) => {
      if (!res.ok) throw new Error('fetch failed');
      return res.arrayBuffer();
    })
    .then((ab) => {
      const file = new Uint8Array(ab);
      const workbook = read(file, { type: 'array' });

      workbook.SheetNames.forEach((bookName) => {
        const data = workbook.Sheets[bookName];

        const dataParse = xlsxUtil.sheet_to_json(data, {
          header: 1,
          blankrows: false,
        });
        result.push(dataParse);
      });
    });
  return result;
}


export async function dataTransform(id) {
  const obj = {};
  let name;
  let type;
  let slug;
  let url;

  await fetchQuery('slug', id).then((data) => {
    data.resources.forEach((file) => {
      if (file.url.includes('.xlsx')) url = file.url;
    });
    name = data.extras[0].value;
    type = data.extras[3].value;
    slug = data.name || '';
  });
  await fetchSheets(url).then((res) => {
    const dataParse = res[0];

    const metaParse = res[1];
    let metaObj = {};
    metaParse.forEach((val) => {
      if (val[0]) {
        metaObj = {
          ...metaObj,
          [generateSlug(val[0])]: val[1],
        };
      }
    });

    const consList = {};
    dataParse.forEach((item, index) => {
      if (consList[item[0]]) {
          return;
      } else {
          if (item[0] == 'district_name') return;
          consList[item[0]] = [
            {
              constName: item[0],
              constCode: item[1],
            },
          ];
      }
    });

    obj.metadata = {
      description: metaObj['scheme-description'] || '',
      name: name || '',
      frequency: metaObj.frequency || '',
      source: metaObj['data-source'] || '',
      type: type || '',
      note: metaObj['general-note'] || '',
      slug,
      indicators: [],
      consList: consList || [],
    };

    // Tabular Data
    for (let i = 12; i < dataParse[0].length; i += 1) {
      const fiscal_year = {};
      let grant_name = {};
      let total = {};

      // for (let j = 1; j < dataParse.length; j += 1) {
      //   if (dataParse[j][4]) {
      //     grant_name[dataParse[j][4]] = {
      //       ...grant_name[dataParse[j][4]],

      //       [dataParse[j][11]]: (fiscal_year[dataParse[j][11].trim()] = {
      //         ...fiscal_year[dataParse[j][11].trim()],

      //         [dataParse[j][1]]: !(
      //           grant_name[dataParse[j][4]] &&
      //           grant_name[dataParse[j][4]][dataParse[j][11].trim()] &&
      //           dataParse[j][1] in
      //             grant_name[dataParse[j][4]][dataParse[j][11].trim()]
      //         )
      //           ? dataParse[j][i] || 0
      //           : dataParse[j][i] +
      //             parseInt(
      //               grant_name[dataParse[j][4]][dataParse[j][11].trim()][
      //                 dataParse[j][1]
      //               ]
      //             ),
      //       }),
      //     };
      //   }
      // }
      
      for (let j = 1; j < dataParse.length; j += 1) {
        if (dataParse[j][4]) {
          grant_name[dataParse[j][4]] = {
            ...grant_name[dataParse[j][4]],

            [dataParse[j][11]]:grant_name[dataParse[j][4]] && dataParse[j][11].trim() in grant_name[dataParse[j][4]] ? {
              
              ...grant_name[dataParse[j][4]][dataParse[j][11].trim()],

              [dataParse[j][1]]: !(
                grant_name[dataParse[j][4]] &&
                grant_name[dataParse[j][4]][dataParse[j][11].trim()] &&
                dataParse[j][1] in
                  grant_name[dataParse[j][4]][dataParse[j][11].trim()]
              )
                ? isNaN(dataParse[j][i]) ? 0 : dataParse[j][i] || 0
                : isNaN(dataParse[j][i]) ? 0 : dataParse[j][i] +
                  parseInt(
                    grant_name[dataParse[j][4]][dataParse[j][11].trim()][
                      dataParse[j][1]
                    ]
                  ),
            } :  { [dataParse[j][1]]: isNaN(dataParse[j][i]) ? 0 : dataParse[j][i] } ,
          };
        }
      }
      for (const key in grant_name) {
        if (isObject(grant_name[key])) {
            for (const innerKey in grant_name[key]) {
              if (isObject(grant_name[key][innerKey])) {
                   for  ( const innerestKey in grant_name[key][innerKey]){
                      if(total[innerKey] && innerestKey in total[innerKey]){
                        total[innerKey] = {
                          ...total[innerKey],
                          [innerestKey] :  total[innerKey][innerestKey] + parseInt(grant_name[key][innerKey][innerestKey])
                        }
                      }else {
                        total[innerKey] = {
                          ...total[innerKey],
                          [innerestKey] :parseInt(grant_name[key][innerKey][innerestKey])
                        }
                      }
                   }
              }
            }
        } 
    }

    grant_name = {
      ...grant_name,
      total
    }

      const indicatorSlug =
        generateSlug(metaObj[`indicator-${i - 11}-name`]) || '';

      obj.metadata.indicators.push(indicatorSlug);

      obj.data = {
        ...obj.data,
        [`indicator_0${i - 11}`]: {
          grant_name,
          name: metaObj[`indicator-${i - 11}-name`] || '',
          description: metaObj[`indicator-${i - 11}-description`] || '',
          note: metaObj[`indicator-${i - 11}-note`] || '',
          slug: indicatorSlug,
          unit: metaObj[`indicator-${i - 11}-unit`] || '',
        },
      };
    }
  });
  return obj;
}

export async function schemeDataTransform(id) {
  const obj = {};
  let name;
  let type;
  let slug;
  let url;

  await fetchQuery('slug', id).then((data) => {
    data.resources.forEach((file) => {
      if (file.url.includes('.xlsx')) url = file.url;
    });
    name = data.extras[0].value;
    //type = data.extras[3] && data.extras[3].value;
    slug = data.name || '';
  });
  await fetchSheets(url).then((res) => {
    const dataParse = res[0];
    console.log(dataParse)

    const metaParse = res[1];
    let metaObj = {};
    metaParse.forEach((val) => {
      if (val[0]) {
        metaObj = {
          ...metaObj,
          [generateSlug(val[0])]: val[1],
        };
      }
    });

    const consList = {};
    dataParse.forEach((item, index) => {
      if (consList[item[0]]) {
          return;
      } else {
          if (item[0] == 'district_name') return;
          consList[item[0]] = [
            {
              constName: item[0],
              constCode: item[1],
            },
          ];
      }
    });

    obj.metadata = {
      description: metaObj['scheme-description'] || '',
      name: name || '',
      frequency: metaObj.frequency || '',
      source: metaObj['data-source'] || '',
      type: type || '',
      note: metaObj['general-note'] || '',
      slug,
      indicators: [ ],
      consList: consList || [],
    };

    // Tabular Data
    for (let i = 5; i < dataParse[0].length; i += 1) {
      const fiscal_year = {};
      let grant_name = {};
      // let total = {};

      for (let j = 1; j < dataParse.length; j += 1) {
        if (dataParse[j][4]) {
          grant_name[dataParse[j][4]] = {
            ...grant_name[dataParse[j][4]],

            [dataParse[j][2]]: (fiscal_year[dataParse[j][2].trim()] = {
              ...fiscal_year[dataParse[j][2].trim()],

              [dataParse[j][1]]: !(
                grant_name[dataParse[j][4]] &&
                grant_name[dataParse[j][4]][dataParse[j][2].trim()] &&
                dataParse[j][1] in
                  grant_name[dataParse[j][4]][dataParse[j][2].trim()]
              )
                ? dataParse[j][i] || 0
                : dataParse[j][i] +
                  parseInt(
                    grant_name[dataParse[j][4]][dataParse[j][2].trim()][
                      dataParse[j][1]
                    ]
                  ),
            }),
          };
        }
      }
      
      // for (let j = 1; j < dataParse.length; j += 1) {
      //   if (dataParse[j][4]) {
      //     grant_name[dataParse[j][4]] = {
      //       ...grant_name[dataParse[j][4]],

      //       [dataParse[j][11]]:grant_name[dataParse[j][4]] && dataParse[j][11].trim() in grant_name[dataParse[j][4]] ? {
              
      //         ...grant_name[dataParse[j][4]][dataParse[j][11].trim()],

      //         [dataParse[j][1]]: !(
      //           grant_name[dataParse[j][4]] &&
      //           grant_name[dataParse[j][4]][dataParse[j][11].trim()] &&
      //           dataParse[j][1] in
      //             grant_name[dataParse[j][4]][dataParse[j][11].trim()]
      //         )
      //           ? isNaN(dataParse[j][i]) ? 0 : dataParse[j][i] || 0
      //           : isNaN(dataParse[j][i]) ? 0 : dataParse[j][i] +
      //             parseInt(
      //               grant_name[dataParse[j][4]][dataParse[j][11].trim()][
      //                 dataParse[j][1]
      //               ]
      //             ),
      //       } :  { [dataParse[j][1]]: isNaN(dataParse[j][i]) ? 0 : dataParse[j][i] } ,
      //     };
      //   }
      // }

      const indicatorSlug =
        generateSlug(metaObj[`indicator-${i - 4}-name`]) || '';

      obj.metadata.indicators.push(indicatorSlug);

      obj.data = {
        ...obj.data,
        [`indicator_0${i - 4}`]: {
          grant_name,
          name: metaObj[`indicator-${i - 4}-name`] || '',
          description: metaObj[`indicator-${i - 4}-description`] || '',
          note: metaObj[`indicator-${i - 4}-note`] || '',
          slug: indicatorSlug,
          unit: metaObj[`indicator-${i - 4}-unit`] || '',
        },
      };
    }
  });
  return obj;
}
