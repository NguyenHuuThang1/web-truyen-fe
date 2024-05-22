import { Carousel, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import ava from '../../../assets/dfAvaUser.jpg';
import React, { useEffect, useState } from 'react';
import { getTopList } from '../../../services/apiServices';

export const TranslatorInfo = (props) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (props?.translator?.id) {
        try {
          const response = await getTopList(
            `?translator=${props?.translator?.id}`
          );
          setList(response?.data?.novels || []);
        } catch (error) {
          setList([]);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [props]);

  if (isLoading)
    return (
      <div className="w-full h-full flex">
        <div className="m-auto">
          <Spinner
            className="animate-spin-in "
            aria-label="spinner example"
            size="lg"
          />
        </div>
      </div>
    );
  const customTheme = {
    scrollContainer: {
      base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-hiden scroll-smooth rounded-xl',
      snap: 'snap-x',
    },
    indicators: {
      active: {
        off: 'bg-white/50 bg-gray-800/50 hover:bg-gray-800',
        on: 'bg-gray-800',
      },
      base: 'h-3 w-3 rounded-full',
      wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
    },

    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-gray-400 sm:h-10 sm:w-10',
      icon: 'h-5 w-5 text-black  sm:h-6 sm:w-6',
    },
  };
  return (
    <div className="w-full rounded-xl p-8 bg-gray-300 flex-col">
      <div className="m-auto flex-col">
        <img
          src={props?.translator?.avatar ? props?.translator?.avatar : ava}
          className="h-[120px] m-auto  rounded-full w-[120px] shadow-lg"
          alt="avatar"
        />
        <h5 className="pt-4 font-medium text-center text-xl">
          {props?.translator?.firstName
            ? props?.translator?.firstName + ' ' + props?.translator?.lastName
            : 'Tác giả'}
        </h5>
      </div>
      <div className="pt-6 hidden xs:flex xs:h-[450px] sm:h-[550px] md:h-[400px] ">
        <Carousel theme={customTheme}>
          {list.map((el) => (
            <img
              key={el?.id}
              className="md:w-[180px] w-[60%] sm:w-[40%]"
              src={el?.photo}
              alt={el?.name}
            />
          ))}
        </Carousel>
      </div>
      <div className="flex font-bold">
        <Link
          to={`/novel/search?translator=${props?.translator?.id}`}
          className="m-auto text-yellow-700"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};
