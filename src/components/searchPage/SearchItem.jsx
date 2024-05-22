import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import novel from './../../assets/novel.jpg';
import { MdOutlineMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
export const SearchItem = (props) => {
  return (
    <div className="grid grid-cols-4 gap-3 w-full border-b-2 py-6 content-between">
      <div>
        <Link to={`/novel/${props?.novel?.slug}`}>
          <img
            src={props?.novel?.photo || novel}
            alt={''}
            className="w-[90px] h-[120px] shadow-md hover:cursor-pointer hover:opacity-90"
          />
        </Link>
      </div>
      <div className="col-span-3 ">
        <Link to={`/novel/${props?.novel?.slug}`}>
          <h2 className=" line-clamp-1 text-base font-semibold  hover:text-yellow-400 hover:drop-shadow-md text-ellipsis overflow-hidden ">
            {props?.novel?.name}
          </h2>
        </Link>

        <p className="pt-2 text-sm text-ellipsis overflow-hidden line-clamp-2">
          {props?.novel?.description}
        </p>
        <div className="flex pt-2 justify-between ">
          <div className="flex flex-col font-light">
            <div className="flex items-center">
              <FaPencilAlt />
              <span className="text-sm ml-2 line-clamp-1 overflow-hidden">
                {props?.novel?.author?.name ||
                  props?.novel?.translator?.firstName +
                    ' ' +
                    props?.novel?.translator?.lastName}
              </span>
            </div>
            <div className="flex items-center">
              <MdOutlineMenu />
              <span className="text-sm ml-2">{`${props?.novel?.progress} Chương`}</span>
            </div>
          </div>
          <Link to={`/novel/search?category=${props?.novel?.categories?.id}`}>
            <button className="text-[10px] h-6 pl-2 pr-2  border-[1px] border-orange-700 text-orange-700">
              {props?.novel?.categories?.name || 'Chưa rõ'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
