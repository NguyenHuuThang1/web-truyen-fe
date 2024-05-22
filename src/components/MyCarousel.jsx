import React, { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react';
import test from './../assets/test.webp';
import { getTopList } from '../services/apiServices';

export const MyCarousel = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchTopList = async () => {
      try {
        const response = await getTopList('');
        setList(response?.data?.novels || []);
      } catch (error) {
        setList([]);
      }
    };

    fetchTopList();
  }, []);
  const customTheme = {
    scrollContainer: {
      base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-hiden scroll-smooth rounded-none',
      snap: 'snap-x',
    },
    control: {
      base: '',
      icon: 'hidden',
    },
  };
  return (
    <div className="hidden md:h-80 sm:flex xl:h-96 2xl:h-120 w-full">
      <Carousel theme={customTheme} slideInterval={60000}>
        {list.map((el, index) => (
         <a href={`/novel/${el.slug}`} key={index} className="h-[100%] block w-full">  
          <img
            src={el?.coverImg ? el?.coverImg : test}
            alt="..."
            className="h-[100%] w-full"
          />
        </a>
        ))}
      </Carousel>
    </div>
  );
};
