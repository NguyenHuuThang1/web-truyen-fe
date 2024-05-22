import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import imgCover from './../../assets/test.webp';
import img from './../../assets/novel.jpg';
import { FaStar, FaGlasses, FaBookmark, FaCheck } from 'react-icons/fa';
import { TabInfo } from './info/TabInfo';
import { ReviewTab } from './review/ReviewTab';
import { ChapterTab } from './chapterList/ChapterTab';
import { Link, useParams } from 'react-router-dom';
import {
  getMarkBook,
  getNovel,
  toggleBookMark,
} from '../../services/apiServices';
import { NotFound } from '../404Page/NotFound';
import { Spinner } from 'flowbite-react';

export const InforPage = () => {
  const novelSlug = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [novel, setNovel] = useState({});
  const [collection, setCollection] = useState({});
  const toggleBookMarkBtn = async () => {
    try {
      const res = await toggleBookMark(novel?.id, !collection?.isLove);
      setCollection(res?.data?.collection);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const novelResponse = await getNovel(`?slug=${novelSlug.nSlug}`);
        setNovel(novelResponse?.data?.novels[0]);
        // console.log(novelResponse?.data?.novels[0]);
        if (novelResponse?.data?.novels[0]?.id) {
          const bookmarkResponse = await getMarkBook(
            novelResponse.data.novels[0].id
          );
          setCollection(bookmarkResponse?.data?.collection);
        }
        if (novelResponse?.data?.novels[0]?.name)
          document.title = novelResponse?.data?.novels[0]?.name;
      } catch (error) {}
      setIsLoading(false);
    };

    fetchData();
  }, [novelSlug.nSlug]);

  const [tab, setTab] = useState(1);
  if (!novel) return <NotFound></NotFound>;
  if (isLoading)
    return (
      <div className="w-full h-screen flex">
        <div className="m-auto">
          <Spinner
            className="animate-spin-in "
            aria-label="spinner example"
            size="lg"
          />
        </div>
      </div>
    );
  return (
    <div>
      <Header></Header>
      <div className="hidden md:h-80 sm:flex xl:h-96 2xl:h-120 w-full">
        <img
          src={novel.coverImg ? novel.coverImg : imgCover}
          className="w-full h-full"
          alt=""
        />
      </div>
      <div className="flex mt-[10px] z-10 ">
        <div className="m-auto  bg-be md:rounded-xl  md:max-w-[1000px] lg:max-w-[1280px]  max-w-[98%] w-full md:-translate-y-20  shadow-md">
          <div className="xs:flex p-6 ">
            <div>
              <img
                src={novel.photo ? novel.photo : img}
                alt=""
                className="m-auto xs:m-0 md:w-[210px] md:h-[280px] shadow-lg hover:opacity-90"
              />
            </div>
            <div className="pl-6 w-full overflow-hidden pt-4 xs:pt-0">
              <h2 className="truncate text-2xl font-medium text-gray-700 drop-shadow-xl hover:text-yellow-700">
                {novel.name}
              </h2>
              <div className="hidden sm:flex py-4">
                {novel?.author?.name && (
                  <Link to={`/author/${novel?.author?.id}`}>
                    <button className="py-1 px-2 rounded-3xl border-[1px] border-red-500 text-red-500 mr-2">
                      {novel.author.name}
                    </button>
                  </Link>
                )}
                <Link
                  to={
                    novel?.status === 'Chưa hoàn thành'
                      ? '/novel/search?status=0'
                      : '/novel/search?status=1'
                  }
                >
                  <button className="py-1 px-2 rounded-3xl border-[1px] border-green-500 text-green-500 mr-2">
                    {novel?.status}
                  </button>
                </Link>
                <Link to={`/novel/search?category=${novel?.categories?.id}`}>
                  <button className="py-1 px-2 rounded-3xl border-[1px] border-yellow-500 text-yellow-500 mr-2">
                    {novel?.categories?.name
                      ? novel?.categories?.name
                      : 'Chưa biết'}
                  </button>
                </Link>
              </div>
              <div className="hidden sm:flex">
                <div>
                  <h5 className="font-medium text-[18px]">{novel.progress}</h5>
                  <h5>Chương</h5>
                </div>
                <div className="pl-16">
                  <h5 className="font-medium text-[18px]">{novel.watch}</h5>
                  <h5>Lượt đọc</h5>
                </div>
              </div>
              <div className="flex items-center py-4">
                <div className="flex mr-5 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((el) => {
                    if (novel.rateAvg >= el)
                      return <FaStar key={el} className="text-yellow-400" />;
                    else return <FaStar key={el} />;
                  })}
                </div>
                <span className="truncate">
                  {`${Math.round(novel.rateAvg * 10) / 10}/5 điểm (${
                    novel.reviewsQuan
                  } lượt đáng giá)`}{' '}
                </span>
              </div>
              <div className="pt-3">
                <Link
                  to={
                    collection?.chapter?.slug
                      ? `/novel/${novelSlug.nSlug}/${collection?.chapter?.slug}`
                      : `/novel/${novelSlug.nSlug}/chuong-1`
                  }
                >
                  <button
                    disabled={novel.progress === 0 ? true : false}
                    className="hover:opacity-75 px-4 py-3 rounded-[50px] border-2 bg-yellow-500 mr-4 disabled:opacity-50"
                  >
                    <span className="flex items-center text-xl font-semibold text-white">
                      <FaGlasses className="mr-2" />
                      {collection?.chapter?.slug ? 'Đọc tiếp' : 'Đọc Truyện'}
                    </span>
                  </button>
                </Link>
                {collection?.isLove ? (
                  <button
                    onClick={toggleBookMarkBtn}
                    className="hover:opacity-75 px-4 py-3 rounded-[50px] border-2 bg-red-600"
                  >
                    <span className="flex items-center text-xl font-semibold text-white">
                      <FaCheck className="mr-2" />
                      Bỏ đánh dấu
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={toggleBookMarkBtn}
                    className="hover:opacity-75 px-4 py-3 rounded-[50px] border-2 bg-gray-300"
                  >
                    <span className="flex items-center text-xl font-semibold text-black">
                      <FaBookmark className="mr-2" />
                      Đánh dấu
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className=" flex p-6 w-full">
            <div className="text-xl w-full font-medium text-center text-gray-700 border-b-2 border-gray-200 ">
              <ul className="flex flex-wrap -mb-px">
                <li
                  className="me-2 p-0 "
                  onClick={() => {
                    setTab(1);
                  }}
                >
                  <span
                    className={`inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:cursor-pointer ${
                      tab === 1
                        ? 'text-yellow-600 border-b-2 border-yellow-600'
                        : ''
                    }`}
                  >
                    Giới thiệu
                  </span>
                </li>
                <li
                  className="me-2 p-0"
                  onClick={() => {
                    setTab(2);
                  }}
                >
                  <span
                    className={`inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:cursor-pointer ${
                      tab === 2
                        ? 'text-yellow-600 border-b-2 border-yellow-600'
                        : ''
                    }`}
                  >
                    Đánh giá
                  </span>
                </li>
                <li
                  className="me-2 p-0"
                  onClick={() => {
                    setTab(3);
                  }}
                >
                  <span
                    className={`inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:cursor-pointer ${
                      tab === 3
                        ? 'text-yellow-600 border-b-2 border-yellow-600'
                        : ''
                    }`}
                  >
                    D.s chương
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex px-6 pb-6 w-full">
            {tab === 1 && (
              <TabInfo
                desc={novel?.description}
                translator={novel?.translator}
              />
            )}
            {tab === 2 && <ReviewTab novel={novel?.id} />}
            {tab === 3 && (
              <ChapterTab novel={novel?.id} nSlug={novelSlug.nSlug} />
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
