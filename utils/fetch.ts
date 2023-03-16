export const fetchDatasets = async (variables) => {
  function changeKeyName(key) {
    if (key == 'size') return 'rows';
    else if (key == 'from') return 'start';
    else return key;
  }

  const fq = variables.fq ? variables.fq.replace(/&/g,"%26") : null;
  variables.fq
  ? (variables.fq = fq.concat(
      `AND !schemeType:summary-data AND !schemeType:state-data AND private:false`
    ))
  : (variables.fq = `AND !schemeType:summary-data AND !schemeType:state-data AND private:false`);

  // creating a string of parameter from object of variables for CKAN API use
  const varArray = Object.keys(variables).map((key) => {
    return `${changeKeyName(key)}=${variables[key]}`;
  });

  const varString =
    varArray.length > 0
      ? varArray.join('&')
      : `fq=organization:haq-up AND !schemeType:summary-data AND !schemeType:state-data AND private:false&rows=1000`;

  const response = await fetch(
    `https://data.girleducation.in/api/3/action/package_search?${varString}`
  );
  const data = await response.json();
  return data;
};

export async function fetchFilters(list, variable) {
  try {
    // if filters and searc found in url, also use those
    const fq = variable.fq ? variable.fq.replace(/&/g,"%26") : variable.fq;
    const queryVars = `fq=${fq}&q=${
      variable.q ? variable.q : ''
    }`;
  
    const fetchData = await fetch(
      `https://data.girleducation.in/api/3/action/package_search?facet.field=[${list}]&${queryVars}`
    ).then((res) => res.json());
    return fetchData.result.search_facets;
  } catch (error) {
    throw new Error(error);
  }
}

export function convertToCkanSearchQuery(query) {
  const ckanQuery = {
    q: '',
    fq: '',
    rows: '',
    start: '',
    sort: '',
    'facet.field': '',
    'facet.limit': '',
    'facet.mincount': 0,
    organization: {},
  };
  // Split by space but ignore spaces within double quotes:
  if (query.q) {
    query.q.match(/(?:[^\s"]+|"[^"]*")+/g).forEach((part) => {
      if (part.includes(':')) {
        ckanQuery.fq += part + ' ';
      } else {
        ckanQuery.q += part + ' ';
      }
    });
    ckanQuery.fq = ckanQuery.fq.trim();
    ckanQuery.q = ckanQuery.q.trim();
  }

  if (query.fq) {
    ckanQuery.fq = ckanQuery.fq ? ckanQuery.fq + ' ' + query.fq : query.fq;
  }

  // standard 'size' => ckan 'rows'
  ckanQuery.rows = query.size || '';

  // standard 'from' => ckan 'start'
  ckanQuery.start = query.from || '';
  ckanQuery.organization = query.organization || '';

  // standard 'sort' => ckan 'sort'
  const sortQueries = [];
  if (query.sort && query.sort.constructor == Object) {
    for (let [key, value] of Object.entries(query.sort)) {
      sortQueries.push(`${key} ${value}`);
    }
    ckanQuery.sort = sortQueries.join(',');
  } else if (query.sort && query.sort.constructor == String) {
    ckanQuery.sort = query.sort.replace(':', ' ');
  } else if (query.sort && query.sort.constructor == Array) {
    query.sort.forEach((sort) => {
      sortQueries.push(sort.replace(':', ' '));
    });
    ckanQuery.sort = sortQueries.join(',');
  }

  // Facets
  ckanQuery['facet.field'] = query['facet.field'] || ckanQuery['facet.field'];
  ckanQuery['facet.limit'] = query['facet.limit'] || ckanQuery['facet.limit'];
  ckanQuery['facet.mincount'] =
    query['facet.mincount'] || ckanQuery['facet.mincount'];
  ckanQuery['facet.field'] = query['facet.field'] || ckanQuery['facet.field'];

  // Remove attributes with empty string, null or undefined values
  Object.keys(ckanQuery).forEach(
    (key) => !ckanQuery[key] && delete ckanQuery[key]
  );

  return ckanQuery;
}
