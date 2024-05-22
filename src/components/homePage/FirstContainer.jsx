import React from 'react';
import { TopList } from './topList/TopList.jsx';
import { HistoryList } from './HistoryList';

export const FirstContainer = () => {
  return (
    <div className="flex mt-[10px] h-[50%] z-10 ">
      <div className="m-auto bg-be md:rounded-xl  md:max-w-[1000px] lg:max-w-[1280px]  max-w-[98%] w-full md:-translate-y-20  shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
        <TopList />
        <HistoryList />
      </div>
    </div>
  );
};
