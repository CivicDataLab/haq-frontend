import { LawJustice, WomenChild, Police, HomeAffairs } from 'components/icons';

export function categoryIcon(tags) {
  if (tags.includes('law')) return <LawJustice />;
  else if (tags.includes('wcd')) return <WomenChild />;
  else if (tags.includes('police')) return <Police />;
  else return <HomeAffairs />;
}

export function categoryTag(tags) {
  if (tags.includes('law')) return 'Ministry of Law & Justice';
  else if (tags.includes('wcd'))
    return 'Ministry of Women & Child Development';
  else if (tags.includes('police')) return 'Department of Police';
  else return 'Ministry of Home Affairs';
}

export function stripTitle(name) {
  const shortName = name.includes('data for the')
    ? name.split('data for the ')[1]
    : name.split('data for ')[1];

  return shortName;
}

export function explorerPopulation(obj) {
  let newObj = {};
  const resources = {};
  const resUrls = [];
  obj?.resources &&
    obj?.resources.forEach((res) => {
      resUrls.push(res.url);
      if (res.name == 'Datasheet') resources.dataUrl = res.url;
      if (res.name == 'Metadata') resources.metaUrl = res.url;
    });

  newObj = {
    id: obj.id,
    title: `${obj.title} | ${obj.extras[1].value}` ,
    notes: obj.notes || ' ',
    tags: [obj.extras[3].value,obj.extras[2].value],
    dataUrl: resources.dataUrl || '',
    metaUrl: resources.metaUrl || '',
    resUrls,
  };

  return newObj;
}

export function datasetPopulation(obj) {
  const populated = [];

  obj.forEach((item) => {
    const resources = {};
    item.resources &&
      item.resources.forEach((res) => {
        if (res.name == 'Datasheet') resources.dataUrl = res.url;
        if (res.name == 'Metadata') resources.metaUrl = res.url;
      });

    populated.push({
      id: item.name,
      title: item.title,
      tags: item.tags.map((item) => item.display_name),
      dataUrl: resources.dataUrl || '',
      metaUrl: resources.metaUrl || '',
    });
  });

  return populated;
}

export function filter_data_indicator(mainData, indicatorName) {
  let data = mainData;
  if (indicatorName) {
    if (data.length > 0) {
      data = data.filter((item) => item['indicators'] == indicatorName);
    }
  }
  return data;
}

export function filter_data_budgettype(mainData, budgetType) {
  let data = mainData;
  if (budgetType) {
    if (data.length > 0) {
      data = data.filter((item) => item['budgetType'] == budgetType);
    }
  }

  return data;
}

// fetch based on tags
export async function fetchFromTags(tags, id) {
  const tagsString = tags.map((i) => `"${i}"`).join(' OR ');
  const response = await fetch(
    `https://justicehub.in/api/3/action/package_search?fq=tags:(${tagsString}) AND groups:budgets-for-justice`
  ).then((res) => res.json());
  const data = response.result.results;
  let filteredData = data.filter((item) => item.name != id).splice(0, 2);
  filteredData = filteredData.map((item) => explorerPopulation(item));

  return filteredData;
}

// filter obj to String
export function filterObjToString(filterObj) {
  const final = [];
  let filter;
  Object.keys(filterObj).forEach((val) => {
    if (filterObj[val].length > 0) {
      filterObj[val].forEach((item) => final.push(`${val}:"${item}"`));

      filter = final.join(' AND ');
    }
  });
  return filter;
}

// Filter string to Filter Object
export function filterStringToObject(fq, data) {
  const obj = {};
  Object.keys(data).forEach((val) => {
    obj[val] = [];
  });
  if (fq) {
    const removeEscape = fq.replaceAll(/"/g, '');
    const splitFilters = removeEscape.split(' AND ');

    splitFilters.forEach((query) => {
      const id = query.split(':')[0];
      const value = query.split(':')[1];
      obj[id].push(value);
      if (document.getElementById(value))
        document.getElementById(value).setAttribute('aria-pressed', 'true');
    });
  }

  return obj;
}

// fetch medium post banner URL
export function getMediumBanner(postContent) {
  const srcIndex = postContent.indexOf('src=');
  const srcStart = srcIndex + 5;
  const srcEnd = postContent.substring(srcStart).indexOf('"') + srcStart;
  const src = postContent.substring(srcStart, srcEnd);
  return src;
}

// return post time in required format
export function getDate(time) {
  // ordinal suffix for date
  const getOrdinal = function (d) {
    let type;
    if (d > 3 && d < 21) type = 'th';
    switch (d % 10) {
      case 1:
        type = 'st';
        break;
      case 2:
        type = 'nd';
        break;
      case 3:
        type = 'rd';
        break;
      default:
        type = 'th';
        break;
    }
    return `${d}${type}`;
  };

  const dt = new Date(time);
  if (dt instanceof Date && !isNaN(dt.valueOf())) {
    const date = getOrdinal(dt.getDate());
    const month = dt.toLocaleString('default', { month: 'short' });
    return `${date} ${month}, ${dt.getFullYear()}`;
  } else return time;
}

// fetch list of datasets.
// Required: type -> type of dataset; variables -> from url parameters.
export async function fetchDatasets() {
  const ministry = await fetch(
    'https://justicehub.in/api/3/action/package_search?fq=(tags:ministry AND groups:budgets-for-justice)&rows=200'
  ).then((res) => res.json());
  const scheme = await fetch(
    'https://justicehub.in/api/3/action/package_search?fq=(tags:scheme AND groups:budgets-for-justice)&rows=200'
  ).then((res) => res.json());
  const category = await fetch(
    'https://justicehub.in/api/3/action/package_search?fq=(tags:scheme-category AND groups:budgets-for-justice)&rows=200'
  ).then((res) => res.json());
  const data = {
    ministry: datasetPopulation(ministry.result.results),
    scheme: datasetPopulation(scheme.result.results),
    category: datasetPopulation(category.result.results),
  };
  return data;
}

// fetch particular dataset
export async function fetchAPI(path) {
  const response = await fetch(
    `http://13.232.98.238/api/3/action/package_show?id=${path}`
  );
  const data = await response.json();
  return data;
}

export async function getFilters(list, variable, page) {
  try {
    // if filters and searc found in url, also use those
    const queryVars = `fq=${
      variable.fq ? `${variable.fq} AND type:${page}` : `type:${page}`
    }&q=${variable.q ? variable.q : ''}`;

    const fetchData = await fetch(
      `http://13.126.46.107/api/3/action/package_search?facet.field=[${list}]&facet.limit=6&${queryVars}`
    ).then((res) => res.json());
    return fetchData.result.search_facets;
  } catch (error) {
    throw new Error(error);
  }
}

// function to create tabbed interface
export function tabbedInterface(tablist, panels) {
  // Get relevant elements and collections
  const tabs = tablist.querySelectorAll('a');

  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  };

  // Add the tablist role to the first <ul> in the .tabbed container
  tablist.setAttribute('role', 'tablist');

  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });

    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', (e) => {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir =
        e.which === 37
          ? index - 1
          : e.which === 39
          ? index + 1
          : e.which === 40
          ? 'down'
          : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down'
          ? panels[i].focus()
          : tabs[dir]
          ? switchTab(e.currentTarget, tabs[dir])
          : void 0;
      }
    });
  });

  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true;
  });

  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
}

export function handleSearch(query, obj) {
  const newObj = {};
  Object.keys(obj).forEach((objVal) => {
    newObj[objVal] = obj[objVal].filter((item) =>
      JSON.stringify(item, ['title', 'tags'])
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  });

  return newObj;
}
