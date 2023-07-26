import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

function Pagination({ count = 20 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function handlePrev() {
    const prev = currentPage === 1 ? 1 : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  return (
    <div
      className="flex items-center justify-between gap-x-3 px-2 py-2
                     font-semibold text-yellow-950"
    >
      <div>
        {' '}
        show results from{' '}
        <span className="text-sky-600">
          {(currentPage - 1) * PAGE_SIZE}
        </span>{' '}
        to{' '}
        <span className="text-sky-600">
          {currentPage * PAGE_SIZE < count ? currentPage * PAGE_SIZE : count}
        </span>{' '}
        of <span className="text-sky-600">{count}</span>
      </div>
      <div
        className="flex items-center gap-2 rounded border 
                  border-yellow-200 bg-yellow-100 px-2 py-1 text-sm"
      >
        <button
          className="rounded border border-yellow-200 bg-white p-1 hover:bg-sky-50"
          onClick={handlePrev}
        >
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          className="rounded border border-yellow-200 bg-white p-1 hover:bg-sky-50"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
