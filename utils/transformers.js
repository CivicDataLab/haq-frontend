import { fetchQuery, fetchSheets, generateSlug, twoDecimals } from './data';

export function processSchemeArray(arr) {
  const scheme = {};

  for (let i = 1; i < arr.length; i++) {
    const [
      state_ut_code,
      state_ut_name,
      scheme_code,
      Scheme,
      Scheme_hindi,
      Scheme_mode,
      Scheme_type,
      financial_year,
      indicator_1,
      indicator_2,
      indicator_3,
    ] = arr[i];

    const stateKey = state_ut_name.toLowerCase();
    const schemeKey = scheme_code.toLowerCase();

    if (!scheme[stateKey]) {
      scheme[stateKey] = {};
    }

    if (!scheme[stateKey][schemeKey]) {
      scheme[stateKey][schemeKey] = {
        Scheme,
        Scheme_hindi,
        Scheme_code: scheme_code,
        Scheme_mode,
        Scheme_type,
        indicator_01: {},
        indicator_02: {},
        indicator_03: {},
      };
    }

    scheme[stateKey][schemeKey].indicator_01[financial_year] =
      indicator_1 || null;
    scheme[stateKey][schemeKey].indicator_02[financial_year] =
      indicator_2 || null;
    scheme[stateKey][schemeKey].indicator_03[financial_year] =
      indicator_3 || null;
  }

  return scheme;
}

export async function searchDataTransform() {
  try {
    const result = await fetchSheets(process.env.SEARCH_URL);
    if (!result) {
      throw new Error('Data not found or empty');
    }

    const obj = {};

    for (let i = 1; i < result[0].length; i++) {
      const [schemeCode, schemeName, state, dataType] = result[0][i].map(
        (value) => value.trim()
      );
      const stateSlug = generateSlug(state);

      if (!obj[stateSlug]) {
        obj[stateSlug] = {};
      }

      if (!obj[stateSlug]['all datasets']) {
        obj[stateSlug]['all datasets'] = [];
      }

      if (dataType === 'budget') {
        obj[stateSlug]['all datasets'].unshift({
          scheme: schemeName,
          scheme_code: schemeCode,
          tag: dataType,
        });
      } else {
        obj[stateSlug]['all datasets'].push({
          scheme: schemeName,
          scheme_code: schemeCode,
          tag: dataType,
        });
      }

      const dataKey =
        dataType === 'treasury' ? 'spending data' : dataType + ' data';

      if (!obj[stateSlug][dataKey]) {
        obj[stateSlug][dataKey] = [];
      }

      obj[stateSlug][dataKey].push({
        scheme: schemeName,
        scheme_code: schemeCode,
        tag: dataType,
      });
    }

    return obj;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function dataTransform(id) {
  const obj = {};
  let name;
  let type;
  let slug;
  let url;
  let totalArr = [];
  let title;
  let tags = [];
  let resources = {};
  let resUrls = [];
  let dataUrl;
  let metaUrl;
  let notes;
  let code;
  await fetchQuery('slug', id).then((data) => {
    data.resources.forEach((file) => {
      resUrls.push(file.url);
      if (file.url.includes('.xlsx')) url = file.url;
      if (file.name == 'Datasheet') resources.dataUrl = file.url;
      if (file.name == 'Metadata') resources.metaUrl = file.url;
    });

    name = data.extras[7].value;
    type = data.extras[6].value;
    slug = data.name || '';
    title = data.extras[7]
      ? `${data.extras[7].value} | ${data.extras[8].value}`
      : data.title;
    tags = data.extras[10] ? [data.extras[10].value, data.extras[6].value] : [];
    dataUrl = data.resources.dataUrl || '';
    metaUrl = data.resources.metaUrl || '';
    resUrls = resUrls;
    notes = data.notes || '';
    code = data.extras[5] || '';
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
      if (consList[item[1]]) {
        return;
      } else {
        if (item[1] == 'district_name') return;
        consList[item[1]] = [
          {
            constName: item[1],
            constCode: item[0],
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
      notes: notes || '',
      slug,
      indicators: [],
      consList: consList || [],
      tags: tags || [],
      title: title || '',
      resUrls,
      dataUrl,
      metaUrl,
      code,
    };

    // Tabular Data
    for (let i = 3; i < dataParse[0].length; i += 1) {
      let data = {};
      for (let j = 1; j < dataParse.length; j += 1) {
        if (dataParse[j][2]) {
          data[dataParse[j][2]] = {
            ...(data[dataParse[j][2]] || {}),
            [dataParse[j][0]]:
              i !== 5
                ? (dataParse[j][i] / 100000).toFixed(2)
                : twoDecimals(dataParse[j][i]),
          };
        }
      }

      const indicatorSlug =
        generateSlug(metaObj[`indicator-${i - 2}-name`]) || '';

      obj.metadata.indicators.push(indicatorSlug);

      obj.data = {
        ...obj.data,
        [`indicator_0${i - 2}`]: {
          data,
          name: metaObj[`indicator-${i - 2}-name`] || '',
          description: metaObj[`indicator-${i - 2}-description`] || '',
          note: metaObj[`indicator-${i - 2}-note`] || '',
          slug: indicatorSlug,
          unit: metaObj[`indicator-${i - 2}-unit`] || '',
        },
      };
    }
  });
  return obj;
}
