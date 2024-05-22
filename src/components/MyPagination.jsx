import { Pagination } from 'flowbite-react';
import { useState } from 'react';

export const MyPagination = (props) => {
  // const [currentPage, setCurrentPage] = useState(1);
  {
    /* <MyPagination setPage={setCurrentPage} page={currentPage} /> */
  }
  const onPageChange = (page) => {
    props.setPage(page);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={props.page}
        totalPages={100}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
};
