import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dropdown from 'components/Dropdown/Dropdown';

const options = [
  {
    value: 'tender_bid_opening_date:asc',
    title: 'Date Asc',
  },
  {
    value: 'tender_bid_opening_date:desc',
    title: 'Date Desc',
  },
  {
    value: 'tender_value_amount:asc',
    title: 'Tender Value Asc',
  },
  {
    value: 'tender_value_amount:desc',
    title: 'Tender Value Desc',
  },
  {
    value: 'buyer_name:asc',
    title: 'Departments',
  },
  {
    value: 'score:desc',
    title: 'Relevance',
  },
];

const Sort: React.FC<{ newSort: any }> = ({ newSort }) => {
  const router = useRouter();
  const [sort, setSort] = useState('');

  useEffect(() => {
    const currentSort = router.query.sort
      ? router.query.sort
      : 'tender_bid_opening_date:asc';

    setSort(currentSort as string);
  }, [router.query.sort]);

  const handleChange = (event: any) => {
    setSort(event);

    newSort({
      query: 'sort',
      value: event,
    });
  };
  return (
    <Dropdown
      options={options}
      heading="Sort by"
      handleChange={handleChange}
      value={sort}
    />
  );
};

export default Sort;
