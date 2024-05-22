import React from 'react';
import novel from './../../assets/novel.jpg';
import { CiFileOn } from 'react-icons/ci';
import { LuBookMinus } from 'react-icons/lu';
import { FaGlasses } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const AuthorItem = (props) => {
  return (
    <div className="flex w-full border-b-2 px-6 my-6 pb-4">
      <div>
        <Link to={`/novel/${props.novel.slug}`}>
          <img
            src={props.novel.photo}
            alt={''}
            className="w-[90px] h-[120px] shadow-md hover:cursor-pointer hover:opacity-90"
          />
        </Link>
      </div>
      <div className=" flex-1 mb-5 ml-5 grid content-between">
        <Link to={`/novel/${props.novel.slug}`}>
          <h2 className=" text-base font-semibold  hover:text-yellow-400 hover:drop-shadow-md text-ellipsis overflow-hidden line-clamp-2">
            {props.novel.name}
          </h2>
        </Link>

        <p className="pt-2 text-sm text-ellipsis overflow-hidden line-clamp-3">
          {props.novel.description}
        </p>
        <div className="flex  justify-between mt-2">
          <div className="flex font-light">
            <div className="flex items-center mr-5">
              <LuBookMinus />
              <span className="text-sm ml-2">
                {props.novel.translator.firstName +
                  ' ' +
                  props.novel.translator.lastName}
              </span>
            </div>
            <div className="flex items-center">
              <CiFileOn />
              <span className="text-sm ml-2">
                {props.novel.progress + ' Chương'}
              </span>
            </div>
          </div>
          <div className="text-[12px] h-6 pl-2 pr-2 flex items-center font-light">
            <span className="">
              <FaGlasses className="text-gray-400 mr-2" />
            </span>
            {props.novel.watch}
          </div>
        </div>
      </div>
    </div>
  );
};
