import React, { useEffect, useState } from 'react';
import { SearchItem } from './SearchItem';
import getNovel from '../../services/api/getNovel';
import { MyPagination } from '../MyPagination';
import removeAccents from '../../utils/removeAccents';
import { getCategories } from '../../services/apiServices';
import { Link, useLocation } from 'react-router-dom';
import { TranslatorInfo } from './../inforPage/info/TranslatorInfo';
export const SearchPage = () => {
  const location = useLocation();
  const [currentSearch, setCurrentSearch] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCate, setCurrentCate] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const [translator, setTranslator] = useState('');
  const [novel, setNovel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await getCategories();
        setCategories(categoriesRes?.data?.categories);
        let myQ = {};
        if (searchParam) myQ = { ...myQ, slug: { $regex: searchParam } };
        if (categoryParam) myQ = { ...myQ, categories: categoryParam };
        if (statusParam === '0') myQ = { ...myQ, status: 'Chưa hoàn thành' };
        if (statusParam === '1') myQ = { ...myQ, status: 'Hoàn thành' };
        if (translatorParam) myQ = { ...myQ, translator: translatorParam };
        const res = await getNovel(
          `?q=${JSON.stringify(myQ)}&page=${currentPage}&sort=${
            sortParams ? sortParams : '-createTime'
          }`
        );
        setNovel(res.data.novels);
      } catch (error) {}
    };
    setCurrentCate('');
    setCurrentStatus('');
    setCurrentSearch('');
    setTranslator('');
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let searchParam = params.get('search');
    if (searchParam) {
      searchParam = searchParam.slice(0, params.get('search').length - 1);
      setCurrentSearch(searchParam);
      searchParam = removeAccents(
        searchParam.toLowerCase().split(' ').join('-')
      );
    }
    let statusParam = params.get('status');
    if (statusParam) setCurrentStatus(statusParam);
    let categoryParam = params.get('category');
    if (categoryParam === 'undefined') categoryParam = null;
    if (categoryParam) setCurrentCate(categoryParam);
    let translatorParam = params.get('translator');
    if (translatorParam) setTranslator(translatorParam);
    fetchData();
    let sortParams = params.get('sort');
    if (sortParams) setSort(sortParams);
    fetchData();
  }, [currentPage, location]);

  return (
    <div className="border-b-[1px]">
      <div className="m-auto bg-white md:rounded-xl  md:max-w-[1000px] lg:max-w-[1280px]  max-w-[98%] w-full md:-translate-y-20   grid grid-cols-4  min-h-[500px] py-4">
        <div className="hidden p-5 md:flex md:flex-col">
          <div>
            <h5 className="font-medium text-[14px] my-1 ">Thể loại</h5>
            {categories.map((category) => (
              <Link
                key={category.id}
                className="inline-block"
                to={`/novel/search?category=${category.id}`}
              >
                <div className="border-b-[1px] flex flex-wrap mb-2">
                  <div
                    className={`hover:bg-red-500 ${
                      category.id === currentCate ? 'bg-red-500 text-white' : ''
                    }   text-gray-700 rounded-md text-sm flex items-center px-2 py-1 mb-2 mr-2 text-nowrap cursor-pointer hover:text-white`}
                  >
                    {category.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <h5 className="font-medium text-[14px] my-1 ">Tình trạng</h5>
            <Link className="inline-block" to={`/novel/search?status=0`}>
              <div className="border-b-[1px] flex flex-wrap mb-2">
                <div
                  className={`hover:bg-red-500 ${
                    currentStatus === '0' ? 'bg-red-500 text-white' : ''
                  }   text-gray-700 rounded-md text-sm flex items-center px-2 py-1 mb-2 mr-2 text-nowrap cursor-pointer hover:text-white`}
                >
                  Chưa hoàn thành
                </div>
              </div>
            </Link>
            <Link className="inline-block" to={`/novel/search?status=1`}>
              <div className="border-b-[1px] flex flex-wrap mb-2">
                <div
                  className={`hover:bg-red-500 ${
                    currentStatus === '1' ? 'bg-red-500 text-white' : ''
                  }   text-gray-700 rounded-md text-sm flex items-center px-2 py-1 mb-2 mr-2 text-nowrap cursor-pointer hover:text-white`}
                >
                  Hoàn thành
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-4 md:col-span-3">
          <div className="my-4">
            {novel.length} kết quả cho:{' '}
            <span className="font-medium text-red-600 text-sm">
              {currentSearch}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mx-4 ">
            {novel.map((nov) => (
              <SearchItem key={nov.id} novel={nov} />
            ))}
          </div>
          <MyPagination setPage={setCurrentPage} page={currentPage} />
        </div>
      </div>
    </div>
  );
};
