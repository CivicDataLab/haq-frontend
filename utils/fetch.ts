export const fetchDatasets = async () => {
  const response = await fetch(
    `http://15.206.122.72/api/3/action/package_search?fq=type:"tender_dataset"`
  );
  const data = await response.json();
  return data;
};

export const fetchFilters = async (list: string) => {
  const fetchData = await fetch(
    `http://15.206.122.72/api/3/action/package_search?facet.field=[${list}]`
  ).then((res) => res.json());
  return fetchData.result.search_facets;
};
