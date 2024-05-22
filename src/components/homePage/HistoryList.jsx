import React, { useEffect, useState } from 'react';
import novel from './../../assets/novel.jpg';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { deleteCollection, getCollection } from '../../services/apiServices.js';
import { Link } from 'react-router-dom';

export const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    const fetchHistoryList = async () => {
      try {
        if (isAuthenticated) {
          const response = await getCollection('?limit=5');
          setHistoryList(response?.data?.collection || []);
        }
      } catch (error) {
        setHistoryList([]); // Xử lý lỗi bằng cách đặt historyList là một mảng rỗng
      }
    };

    fetchHistoryList();
  }, [isAuthenticated]);
  const handleDeleteBtn = (id) => {
    deleteCollection(id)
      .then(() => {
        setHistoryList(historyList.filter((item) => item.novel.id !== id));
      })
      .catch(() => {});
  };
  return (
    <div className="p-8 w-full ">
      <div className="flex justify-between items-center	 text-xl pb-8 ">
        <h2 className="text-start font-bold ">Truyện đã đọc</h2>
        {isAuthenticated && (
          <Link
            to={'/user/my-collection'}
            className=" hover:text-yellow-400 text-yellow-900 text-base align-baseline"
          >
            Xem tất cả
          </Link>
        )}
      </div>
      <div className="md:h-[320px] md:border-b-2">
        {isAuthenticated &&
          historyList.map((info) => (
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

        {!isAuthenticated && (
          <div className="flex h-[80%]">
            <div className="m-auto">
              <span>Đăng nhập để sử dụng!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
