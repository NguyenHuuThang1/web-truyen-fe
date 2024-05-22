import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChapterList } from '../../../services/apiServices';
import moment from 'moment';

export const ChapterTab = (props) => {
  const [chapterList, setChapterList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (props?.novel) {
        try {
          const res = await getChapterList(props?.novel);
          setChapterList(res?.data?.chapterList || []);
        } catch (error) {}
      }
    };
    fetchData();
  }, []);
  return (
    <div className='min-h-[300px]'>
      <div className="grid grid-cols-3 gap-y-1 w-full">
        {chapterList.map((chapter) => (
          <Link
            key={chapter?.id}
            to={`/novel/${props.nSlug}/${chapter?.slug}`}
            className="col-span-3 md:col-span-1 w-full relative py-2 border-b-2  "
          >
            <div className=" overflow-x-hidden md:w-[80%] w-full">
              <h1 className="truncate text-sm">
                {'Chương ' + chapter?.number + ': ' + chapter?.name}
                <small className="text-gray-400 ml-2">
                  {`(${moment(new Date(chapter?.createTime)).format(
                    'YYYY-MM-DD'
                  )})`}
                </small>
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
