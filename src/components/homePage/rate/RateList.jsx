import React, { useEffect, useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { FaPencilAlt } from 'react-icons/fa';
import { FiBook } from 'react-icons/fi';
import novel from '../../../assets/novel.jpg';
import { getTopList } from '../../../services/apiServices';

export const RateList = (props) => {
  const [list, setList] = useState([]);
  const [isShowBtn, setIsShowBtn] = useState(false);

  useEffect(() => {
    const fetchTopList = async () => {
      try {
        const response = await getTopList(props.sortBy);
        setList(response?.data?.novels || []);
      } catch (error) {
        setList([]); // Xử lý lỗi bằng cách đặt list là một mảng rỗng
      }
    };

    fetchTopList();
  }, [props.sortBy]);

  return (
    <div
      className="md:col-span-1 w-full m-auto bg-be rounded-xl shadow-xl max-w-[400px]"
      onMouseOver={() => {
        setIsShowBtn(true);
      }}
      onMouseLeave={() => {
        setIsShowBtn(false);
      }}
    >
      <div className="p-4 flex justify-between">
        <h2 className="text-start font-medium text-base ">{props.top}</h2>
        {isShowBtn ? (
          <a
            href={`/novel/search${props.sortBy}`}
            className=" hover:text-yellow-400 text-yellow-900 text-base align-baseline ml-4"
          >
            Xem tất cả
          </a>
        ) : (
          ''
        )}
      </div>
      <div className="p-8 pt-0 text-base">
        {list.map((el, index) => {
          if (index === 0)
            return (
              <div key={el.id} className="flex py-2 border-b-2 justify-start">
                <h5>
                  <FaMedal className="w-6 h-6 text-yellow-300" />
                </h5>
                <div className="overflow-hidden pl-2 mr-2 text-sm w-full">
                <a href={`/novel/${el.slug}`}>
                  <h2 className="truncate text-base font-medium  hover:text-yellow-400 hover:drop-shadow-md">
                    {el?.name}
                  </h2>
                </a>
                  <span className="flex items-center text-green-500">
                    <GrView className="mr-2"></GrView>
                    {el?.watch}
                  </span>
                  <span className="flex items-center text-gray-500 truncate">
                    <FaPencilAlt className="mr-2" />
                    {el?.author?.name
                      ? el?.author?.name
                      : el?.translator?.firstName +
                        ' ' +
                        el?.translator?.lastName}
                  </span>
                  <span className="flex items-center text-gray-500 truncate">
                    <FiBook className="mr-2" />{' '}
                    {el?.categories?.name
                      ? el?.categories?.name
                      : 'Chưa rõ'}
                  </span>
                </div>
                <div>
                  <a
                    href={`/novel/${el.slug}`}
                    className="block w-[75px] h-[100px]"
                  >
                    <img
                      src={el?.photo}
                      alt="photo"
                      className="w-[75px] h-[100px] shadow-md hover:scale-110"
                    />
                  </a>
                </div>
              </div>
            );
          else if (index === 1)
            return (
              <a key={el.id} href={`/novel/${el.slug}`}>
                <div className="flex py-2 border-b-2 justify-start items-center">
                  <h5>
                    <FaMedal className="w-6 h-6 text-gray-400" />
                  </h5>
                  <h2 className="w-full truncate text-base font-medium pl-2 hover:text-yellow-400 hover:drop-shadow-md">
                    {el?.name}
                  </h2>
                  <span className=" text-gray-500 text-end text-sm">
                    {el?.watch}
                  </span>
                </div>
              </a>
            );
          else if (index === 2)
            return (
              <a key={el.id} href={`/novel/${el.slug}`}>
                <div className="flex py-2 border-b-2 justify-start items-center">
                  <h5>
                    <FaMedal className="w-6 h-6 text-yellow-600" />
                  </h5>
                  <h2 className=" w-full truncate text-base font-medium pl-2 hover:text-yellow-400 hover:drop-shadow-md">
                    {el?.name}
                  </h2>
                  <span className=" text-gray-500 text-end text-sm">
                    {el?.watch}
                  </span>
                </div>
              </a>
            );
          else
            return (
              <a key={el.id} href={`/novel/${el.slug}`}>
                <div className="flex py-2 border-b-2 justify-start items-center">
                  <h5 className="text-base font-medium ml-[6px] mr-2">
                    {index + 1}
                  </h5>
                  <h2 className="truncate w-full text-base font-normal pl-2 hover:text-yellow-400 hover:drop-shadow-md">
                    {el?.name}
                  </h2>
                  <span className=" text-gray-500 text-end text-sm">
                    {el?.watch}
                  </span>
                </div>
              </a>
            );
        })}
      </div>
    </div>
  );
};
