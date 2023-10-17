import { read, utils as xlsxUtil } from 'xlsx';

export async function fetchQuery(query, value) {
  const queryRes = await fetch(
    `https://data.girleducation.in/api/3/action/package_show?id=${value}`
  ).then((res) => res.json());

  return queryRes.result;
}

export function capitalizeWords(input) {
  if (typeof input !== 'string' || input.length === 0) {
    return input;
  }

  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function fetchQueryByFliter(query, value) {
  const queryRes = await fetch(
    `https://data.girleducation.in/api/3/action/package_search?fq=${query}:${value}%20AND%20private:false`
  ).then((res) => res.json());
  return queryRes.result.results;
}

export function generateSlug(slug) {
  if (slug) {
    const temp = slug.toLowerCase().replace(/\W/g, '-'); // lower case and replace space & special chars witn '-'
    return temp.replace(/-+/g, '-').replace(/-$/, ''); // remove multiple '-' and remove '-' from end of string
  }
  return null;
}

export async function fetchJSON(schemeType, key = null) {
  // get JSON URL
  const jsonUrl = await fetchQueryByFliter('slug', schemeType)
    .then((res) => res[0].resources.filter((e) => e.format == 'JSON')[0].url)

    .catch((e) => console.error(e));
  // fetch JSON data
  const jsonData = await fetch(jsonUrl)
    .then((res) => res.json())
    .catch((e) => console.error(e));

  // if key is provided, send only that data
  if (key) return jsonData[key];
  return jsonData;
}

export async function fetchBudgetJSON(schemeType, key) {
  const queryRes = await fetch(
    `https://data.girleducation.in/api/3/action/package_search?fq=schemeType:${schemeType}%20AND%20states:${key}%20AND%20private:false`
  ).then((res) => res.json());

  const jsonUrl = queryRes.result.results[0].resources
  .filter((res) => res.format === 'JSON')[0]?.url;

  if (!jsonUrl) {
    console.error('JSON URL not found.');
    return null;
  }

  // Fetch JSON data
  const jsonData = await fetch(jsonUrl)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      return null;
    });

  return jsonData[key];
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

export const threeDecimals = (num) => {
  return isNaN(num)
  ? ''
  : Number(num.toString().match(/^-?\d+(?:\.\d{0,3})?/));
}

export const twoDecimals = (num) => {
  return isNaN(num)
  ? ''
  : Number(num.toString().match(/^-?\d+(?:\.\d{0,2})?/));
}

export const oneDecimal = (num) => {
  return isNaN(num)
    ? ''
    : Number(num.toString().match(/^-?\d+(?:\.\d{0,1})?/));
};
const toLakh = (num, i) => {
  if (i == 12 || i == 13 || i == 5 || i == 6) return (num / 100000).toFixed(2);
  else return oneDecimal(num);
};

// Encapsulate filtering logic into a separate function
const isMatched = (filters, value) =>
  !filters.length || (value && filters.includes(value));

export const applyFilters = (mode, type, datsetsFilters) => {
  // Parse the filters from the string using regular expressions
  const modeFilterRegex = /scheme_mode:\("(.*?)"\)/;
  const typeFilterRegex = /scheme_type:\("(.*?)"\)/;
  const modeFilterMatch = datsetsFilters.match(modeFilterRegex);
  const typeFilterMatch = datsetsFilters.match(typeFilterRegex);

  // Extract the filter values from the regex match and convert to lowercase
  const modeFilters = modeFilterMatch ? modeFilterMatch[1].toLowerCase().split(' OR ') : [];
  const typeFilters = typeFilterMatch ? typeFilterMatch[1].toLowerCase().split(' OR ') : [];

  // Apply filters based on the parsed filter values
  const modeMatches = isMatched(modeFilters, mode);
  const typeMatches = isMatched(typeFilters, type);

  return modeMatches && typeMatches;
};

export async function schemeDataTransform(id) {
  const obj = {};
  let name;
  let type;
  let slug;
  let url;
  let resUrls = [];

  await fetchQuery('slug', id).then((data) => {
    data.resources.forEach((file) => {
      resUrls.push(file.url);
      if (file.url.includes('.xlsx')) url = file.url;
    });
    name = data.extras[0].value;
    //type = data.extras[3] && data.extras[3].value;
    slug = data.name || '';
    resUrls = resUrls;
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
      slug,
      indicators: [],
      consList: consList || [],
      resUrls: resUrls || [],
    };

    // Tabular Data
    for (let i = 5; i < dataParse[0].length; i += 1) {
      const fiscal_year = {};
      let grant_name = {};
      // let total = {};

      for (let j = 1; j < dataParse.length; j += 1) {
        if (dataParse[j][2].trim()) {
          grant_name[dataParse[j][2].trim()] =
            dataParse[j][2].trim() == 'Total'
              ? {
                  ...grant_name[dataParse[j][2].trim()],
                  [dataParse[j][1]]: toLakh(dataParse[j][i], i),
                }
              : {
                  ...grant_name[dataParse[j][2].trim()],

                  [dataParse[j][3]]:
                    dataParse[j][3] == 'Total'
                      ? {
                          ...grant_name[dataParse[j][2].trim()][
                            dataParse[j][3]
                          ],
                          [dataParse[j][1]]: toLakh(dataParse[j][i], i),
                        }
                      : grant_name[dataParse[j][2].trim()] &&
                        dataParse[j][3] in grant_name[dataParse[j][2].trim()]
                      ? {
                          ...grant_name[dataParse[j][2].trim()][
                            dataParse[j][3]
                          ],

                          [dataParse[j][4]]:
                            grant_name[dataParse[j][2].trim()][
                              dataParse[j][3]
                            ] &&
                            dataParse[j][4] in
                              grant_name[dataParse[j][2].trim()][
                                dataParse[j][3]
                              ]
                              ? {
                                  ...grant_name[dataParse[j][2].trim()][
                                    dataParse[j][3]
                                  ][dataParse[j][4]],

                                  [dataParse[j][1]]: !(
                                    grant_name[dataParse[j][2]] &&
                                    grant_name[dataParse[j][2].trim()][
                                      dataParse[j][3]
                                    ] &&
                                    dataParse[j][1] in
                                      grant_name[dataParse[j][2].trim()][
                                        dataParse[j][3]
                                      ]
                                  )
                                    ? toLakh(dataParse[j][i], i) || 0
                                    : toLakh(dataParse[j][i], i),
                                }
                              : {
                                  [dataParse[j][1]]: isNaN(dataParse[j][i])
                                    ? 0
                                    : toLakh(dataParse[j][i], i),
                                },
                        }
                      : {
                          [[dataParse[j][4]]]: {
                            [dataParse[j][1]]: isNaN(dataParse[j][i])
                              ? 0
                              : toLakh(dataParse[j][i], i),
                          },
                        },
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

export async function stateDataTransform(id) {
  const obj = {};
  let name;
  let type;
  let slug;
  let url;
  let resUrls = [];

  const data = {};

  await fetchQuery('slug', id).then((data) => {
    data.resources.forEach((file) => {
      resUrls.push(file.url);
      if (file.url.includes('.xlsx')) url = file.url;
    });
    // name = data.extras[0].value;
    // //type = data.extras[3] && data.extras[3].value;
    // slug = data.name || '';
    // resUrls = resUrls;
  });
  await fetchSheets(url).then((res) => {
    const dataParse = res[0];
    // const metaParse = res[1];
    // let metaObj = {};
    // metaParse.forEach((val) => {
    //   if (val[0]) {
    //     metaObj = {
    //       ...metaObj,
    //       [generateSlug(val[0])]: val[1],
    //     };
    //   }
    // });

    // obj.metadata = {
    //   description: metaObj['scheme-description'] || '',
    //   name: name || '',
    //   frequency: metaObj.frequency || '',
    //   source: metaObj['data-source'] || '',
    //   type: type || '',
    //   slug,
    //   indicators: [],
    //   consList: consList || [],
    //   resUrls: resUrls || [],
    // };

    // Tabular Data

    for (let i = 1; i < dataParse.length; i++) {
      const schemeCode = dataParse[i][0];
      const fiscalYear = dataParse[i][1];

      if (!data[schemeCode]) {
        data[schemeCode] = {};
      }

      for (let j = 2; j < dataParse[0].length; j++) {
        const key = dataParse[0][j];

        if (!data[schemeCode][key]) {
          data[schemeCode][key] = {};
        }

        data[schemeCode][key][fiscalYear] = oneDecimal(dataParse[i][j]);
      }

      // const indicatorSlug =
      //   generateSlug(metaObj[`indicator-${i - 4}-name`]) || '';

      // obj.metadata.indicators.push(indicatorSlug);

      // obj.data = {
      //   ...obj.data,
      //   [`indicator_0${i - 4}`]: {
      //     grant_name,
      //     name: metaObj[`indicator-${i - 4}-name`] || '',
      //     description: metaObj[`indicator-${i - 4}-description`] || '',
      //     note: metaObj[`indicator-${i - 4}-note`] || '',
      //     slug: indicatorSlug,
      //     unit: metaObj[`indicator-${i - 4}-unit`] || '',
      //   },
      // };
    }
  });
  return data;
}