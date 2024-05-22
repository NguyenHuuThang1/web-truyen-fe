import React, { useEffect, useState } from 'react';
import { getNewChapterList } from '../../services/apiServices';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

export const NewList = () => {
  const [chapterList, setChapterList] = useState([]);
  useEffect(() => {
    const fetchChapterList = async () => {
      try {
        const response = await getNewChapterList('?limit=10&sort=-createTime');
        setChapterList(response?.data?.chapter || []);
      } catch (error) {
        setChapterList([]); // Xử lý lỗi bằng cách đặt chapterList là một mảng rỗng
      }
    };

    fetchChapterList();
  }, []);

  return (
    <div className="flex md:-translate-y-10">
      <div className="m-auto p-2 md:max-w-[1000px] lg:max-w-[1280px] w-full max-w-[98%]  ">
        <div className="flex  items-center	 text-xl pb-8 ">
          <h2 className="text-start font-bold ">Truyện mới cập nhật</h2>
          <a
            href="/novel/search"
            className=" hover:text-yellow-400 text-yellow-900 text-base align-baseline ml-4"
          >
            Xem tất cả
          </a>
        </div>

        <div className="relative truncate">
          <table className="table-fixed w-full text-left rtl:text-right text-base ">
            <tbody className="px-4">
              {chapterList.map((el) => (
                <tr
                  key={el?.id}
                  className="w-full grid grid-cols-12 gap-6 py-2 hover:bg-be px-2"
                >
                  <th className="hidden md:flex col-span-2">
                    <Link
                      to={`/novel/search?category=${el?.novel?.categories?.id}`}
                    >
                      <h5 className="font-light truncate">
                        {el?.novel?.categories?.name
                          ? el?.novel?.categories?.name
                          : 'Chưa rõ'}
                      </h5>
                    </Link>
                  </th>
                  <th className=" md:col-span-3 col-span-5">
                    <Link to={`/novel/${el?.novel?.slug}`}>
                      <h5 className="truncate">{el?.novel?.name}</h5>
                    </Link>
                  </th>
                  <th className="md:col-span-4 col-span-5">
                    <Link to={`/novel/${el?.novel?.slug}/${el?.slug}`}>
                      <h5 className="truncate font-light">{`Chương ${el?.number}: ${el?.name}`}</h5>
                    </Link>
                  </th>
                  <th className="col-span-2 hidden md:flex">
                    <Link to={el?.novel?.author?.id? `/author/${el?.novel?.author?.id}` : `/novel/search?translator=${el?.translator?.id}`}>
                      <h5 className="truncate font-light ">
                        {el?.novel?.author?.name
                          ? el?.novel?.author?.name
                          : el?.translator?.firstName +
                            ' ' +
                            el?.translator?.lastName}
                      </h5>
                    </Link>
                  </th>
                  <th className="md:col-span-1  col-span-2  ">
                    <h5 className="font-light text-end">
                      {moment(new Date(el.createTime)).format('YYYY-MM-DD')}
                    </h5>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
