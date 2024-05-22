import { Card } from './Card.jsx';
import React, { useEffect, useState } from 'react';
import { getTopList } from '../../../services/apiServices.js';

export const TopList = () => {
  const [topList, setTopList] = useState([]);
  useEffect(() => {
    const fetchTopList = async () => {
      try {
        const response = await getTopList('?sort=-watch&limit=6');
        setTopList(response?.data?.novels || []);
      } catch (error) {

        setTopList([]); // Xử lý lỗi bằng cách đặt topList là một mảng rỗng
      }
    };
  
    fetchTopList();
  }, []);
  
  return (
    <div className="md:col-span-2">
      <h2 className="text-start font-bold text-xl p-8 pb-0">Truyện đề cử</h2>
      <div className=" p-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:h-[520px]">
        {topList.map((cardInfor) => (
          <Card info={cardInfor} key={cardInfor._id} />
        ))}
      </div>
    </div>
  );
};
