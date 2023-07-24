import React from 'react';
import { Breadcrumb } from './BreadcrumbComp';

type Props = {
  crumbs: any;
  selected?: (crumb: any) => void;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
};

const Breadcrumbs = ({
  crumbs,
  selected,
  itemsBeforeCollapse,
  itemsAfterCollapse,
}: Props) => {
  const [collapsed, setCollapsed] = React.useState(true);

  React.useEffect(() => {
    if (itemsBeforeCollapse && itemsAfterCollapse) {
      if (itemsBeforeCollapse < 1 || itemsAfterCollapse < 1) {
        throw new Error('Please enter a positive number');
      }
      const totalVisibleItems = itemsBeforeCollapse + itemsAfterCollapse;
      setCollapsed(totalVisibleItems >= crumbs.length ? false : true);
    } else {
      setCollapsed(false);
    }
  }, [crumbs, itemsBeforeCollapse, itemsAfterCollapse]);

  const visibleCrumbsBeforeCollapse = collapsed
    ? [...crumbs.slice(0, itemsBeforeCollapse)]
    : crumbs;

  const visibleCrumbsAfterCollapse = collapsed
    ? itemsAfterCollapse
      ? [...crumbs.slice(-itemsAfterCollapse)]
      : []
    : [];

  return (
    <Breadcrumb>
      <ol className="List">
        {visibleCrumbsBeforeCollapse.length > 0 &&
          visibleCrumbsBeforeCollapse.map((crumb: any, index: any) => (
            <li key={`crumb_item${index}`} className="ListItem">
              {crumb}
            </li>
          ))}
        {collapsed && (
          <li className="CollapseItem">
            <span
              className="CollapseToggle"
              onClick={() => setCollapsed(!collapsed)}
            >
              {'\u2026'}
            </span>
          </li>
        )}
        {visibleCrumbsAfterCollapse.length > 0 &&
          visibleCrumbsAfterCollapse.map((crumb: any, index: any) => (
            <li key={`crumb_item${index}`} className="ListItem">
              {crumb}
            </li>
          ))}
      </ol>
    </Breadcrumb>
  );
};

export default Breadcrumbs;