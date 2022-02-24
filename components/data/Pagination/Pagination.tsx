import { useRouter } from 'next/router';
import React from 'react';
import {
  PaginationComp,
  PaginationJump,
  PaginationButtons,
  ButtonsLabel,
} from './PaginationComp';
import { Button, Menu } from 'components/actions';
import { ArrowDown } from 'components/icons';

const paginationItems = [
  {
    title: '10',
    value: '10',
  },
  {
    title: '20',
    value: '20',
  },
  {
    title: '50',
    value: '50',
  },
];

const Pagination: React.FC<{ total: number; newPage: any }> = ({
  total,
  newPage,
}) => {
  const router = useRouter();
  const [current, setCurrent] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [resultSize, setResultSize] = React.useState('10');
  const [maxPage, SetMaxPage] = React.useState(1);

  React.useEffect(() => {
    const from = router.query.from ? router.query.from : '0';
    const size = router.query.size ? router.query.size : '10';
    SetMaxPage(Math.floor(total / parseInt(size as string)) + 1);

    setResultSize(size as string);

    const pageNo = Math.floor(
      parseInt(from as string) / parseInt(size as string) + 1
    );
    (document.getElementById('jumpNumber') as HTMLInputElement).value =
      String(pageNo);

    setPage(pageNo);
  }, [router.query.from, router.query.size, total]);

  function fetchNewResults(val: any, type: string) {
    newPage({
      query: type,
      value: val,
    });
  }

  function handleRowsChange(e: string) {
    fetchNewResults(e, 'size');
  }

  function handleJump(val: string) {
    const jumpVal = parseInt(val as string);
    if (!(jumpVal < 1 || jumpVal > maxPage || jumpVal == current)) {
      const size = router.query.size ? router.query.size : '10';
      const from = (jumpVal - 1) * parseInt(size as string);

      const pageNo = Math.floor(from / parseInt(size as string) + 1);
      setCurrent(pageNo);

      fetchNewResults(from, 'from');
    }
  }

  function handleButton(val: number) {
    if (!((current == 1 && val == -1) || (current == maxPage && val == 1))) {
      const size = router.query.size ? router.query.size : '10';
      const oldFrom = router.query.from ? router.query.from : '0';

      const from =
        parseInt(oldFrom as string) + val * parseInt(size as string);
      setCurrent((prevCurrent) => prevCurrent + val * 1);

      fetchNewResults(from, 'from');
    }
  }

  return (
    <PaginationComp className="pagination">
      <Menu
        options={paginationItems}
        heading="Rows:"
        handleChange={handleRowsChange}
        value={resultSize}
        top={true}
        position="left"
      />

      <PaginationJump>
        <label className="label-green" htmlFor="jumpNumber">
          Jump to: &nbsp;
          <input
            type="text"
            id="jumpNumber"
            onBlur={(e) => handleJump(e.target.value)}
          />
        </label>
      </PaginationJump>

      <PaginationButtons>
        <ButtonsLabel>
          Page No. {<span>{page}</span>} of {<span>{maxPage}</span>}
        </ButtonsLabel>
        <div>
          <Button
            onClick={() => handleButton(-1)}
            kind="custom"
            className="pagination__back"
            icon={<ArrowDown />}
            iconOnly={true}
          >
            Previous Page
          </Button>
           <Button
            onClick={() => handleButton(1)}
            className="pagination__next"
            icon={<ArrowDown />}
            iconOnly={true}
          >
            Next Page
          </Button>
        </div>
      </PaginationButtons>
    </PaginationComp>
  );
};

export default Pagination;
