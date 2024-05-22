import React, { useEffect, useState } from 'react';
import { MyPagination } from '../MyPagination';
import novel from './../../assets/novel.jpg';
import { FaTrash } from 'react-icons/fa';
import {
  deleteCollection,
  getCollection,
} from '../../services/apiServices';
import { Link } from 'react-router-dom';
export const Collections = () => {
  const [isActive, setIsActive] = useState(true);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleDeleteBtn = (id) => {
    deleteCollection(id)
      .then(() => {
        setList(list.filter((item) => item.novel.id !== id));
      })
      .catch(() => {});
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (isActive
          ? getCollection(`?page=${currentPage}&limit=5`)
          : getCollection(`?page=${currentPage}&limit=5&isLove=true`));

        setList(response?.data?.collection || []);
      } catch (error) {
        setList([]);
      }
    };

    fetchData();
  }, [currentPage, isActive]);
  return (
    <div className="p-8">
      <div className="flex text-lg font-medium border-b-2">
        <div
          className="mr-2 px-2 hover:cursor-pointer"
          onClick={() => {
            setIsActive(true);
          }}
        >
          <span
            className={`py-2 px-1 block ${
              isActive
                ? 'text-yellow-500 border-yellow-500 border-b-4 mb-0'
                : ''
            }`}
          >
            Đã đọc
          </span>
        </div>
        <div
          className="ml-2 px-2 hover:cursor-pointer"
          onClick={() => {
            setIsActive(false);
          }}
        >
          <span
            className={`py-2 px-1 block ${
              !isActive
                ? 'text-yellow-500 border-yellow-500 border-b-4 mb-0'
                : ''
            }`}
          >
            Yêu thích
          </span>
        </div>
      </div>
      <div className="w-full ">
        <div className="pb-4 min-h-[400px]">
          {list &&
            list.map((info) => (
              <div className="flex pt-4" key={info.novel.id}>
                <img
                  src={info?.novel?.photo ? info?.novel?.photo : novel}
                  alt=""
                  className="h-[47px] w-[32px]"
                />
                <div className="pl-4 overflow-hidden ">
                  <Link to={`/novel/${info?.novel?.slug}`}>
                    <h2 className=" truncate text-sm font-semibold  hover:text-yellow-400 hover:drop-shadow-md">
                      {info?.novel?.name}
                    </h2>
                  </Link>
                  <div className="flex items-center pt-2 ">
                    <p className="text-sm pr-2">
                      {info?.chapter?.number
                        ? `Đang đọc: chương ${info?.chapter?.number}`
                        : 'Đánh dấu'}
                    </p>
                    <button
                      onClick={() => {
                        handleDeleteBtn(info.novel.id);
                      }}
                    >
                      <FaTrash className="w-4 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <MyPagination setPage={setCurrentPage} page={currentPage} />
    </div>
  );
};
