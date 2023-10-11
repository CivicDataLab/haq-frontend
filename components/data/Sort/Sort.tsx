import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'components/actions';

const options = [
  {
    value: 'title_string:asc',
    title: 'Name Asc',
  },
  {
    value: 'title_string:desc',
    title: 'Name Desc',
  },
  {
    value: 'metadata_modified:desc',
    title: 'Date Modified',
  },
  {
    value: 'score:desc',
    title: 'Relevance',
  },
  {
    value: 'avg_scheme_allotment:desc',
    title: 'Scheme Allotment',
  },
  {
    value: 'avg_scheme_expenditure:desc',
    title: 'Scheme Expenditure',
  },
  {
    value: 'avg_scheme_utilisation:desc',
    title: 'Scheme Utilisation',
  }
];

const Sort: React.FC<{ newSort: any; className?: string }> = ({
  newSort,
  className,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState('metadata_modified:desc');
  const [value, setValue] = useState('Date Modified');

  useEffect(() => {
    const currentSort = router.query.sort
      ? router.query.sort
      : 'metadata_modified:desc';

    setSort(currentSort as string);
  }, [router.query.sort]);

  useEffect(() => {
    let currentSort = options.find((o) => o.value === sort);
    currentSort && setValue(currentSort.title);
  }, [sort]);

  const handleChange = (event: any) => {
    setSort(event);

    newSort({
      query: 'sort',
      value: event,
    });
  };
  return (
    <Menu
      options={options}
      heading="Sort by"
      handleChange={(e) => handleChange(e)}
      value={value}
      className={className}
    />
  );
};

export default Sort;
