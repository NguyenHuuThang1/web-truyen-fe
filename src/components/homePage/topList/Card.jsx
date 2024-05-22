import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import novel from './../../../assets/novel.jpg';
import { Link } from 'react-router-dom';
export const Card = (props) => {
  return (
    <div>
      <div className="grid grid-cols-4 w-full border-b-2  ">
        <div>
          <Link to={`/novel/${props.info.slug}`}>
            <img
              src={props.info?.photo ? props.info?.photo : novel}
              alt={''}
              className="w-[75px] h-[100px] shadow-md hover:scale-110"
            />
          </Link>
        </div>
        <div className="col-span-3 pl-4">
          <Link to={`/novel/${props.info.slug}`}>
            <h2 className="truncate text-base font-semibold  hover:text-yellow-400 hover:drop-shadow-md">
              {props.info.name}
            </h2>
          </Link>

          <p className="pt-2 text-sm text-ellipsis overflow-hidden line-clamp-2">
            {props.info.description}
          </p>
          <div className="flex pt-2 relative ">
            <FaPencilAlt className=" h-6" />
            <h5 className="pl-1 truncate text-base w-[50%] font-normal">
              {props.info?.author?.name
                ? props.info?.author?.name
                : props.info?.translator?.firstName +
                  ' ' +
                  props.info?.translator?.lastName}
            </h5>
            <Link
              to={`novel/search?category=${props.info?.categories?.id}`}
              className=" flex items-center text-[10px] h-6 pl-2 pr-2 absolute bottom-0 right-0 border-[1px] border-orange-700 text-orange-700"
            >
              {props.info?.categories?.name
                ? props.info?.categories?.name
                : 'Chưa rõ'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
