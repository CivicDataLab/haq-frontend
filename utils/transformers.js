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
