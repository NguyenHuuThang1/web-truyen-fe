import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { FiBook } from 'react-icons/fi';
import { FaPenToSquare } from 'react-icons/fa6';
import { TbTextSize } from 'react-icons/tb';
import { FaRegHeart } from 'react-icons/fa6';
import { FaRegClock } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegBookmark } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { NotFound } from '../404Page/NotFound';
import CommentList from './CommentList';
import { Spinner, ToggleSwitch } from 'flowbite-react';
import { FontCombobox } from './FontCombobox';
import { TextSizeCombobox } from './TextSizeCombobox';
import { Link, useParams } from 'react-router-dom';
import {
  getMarkBook,
  getNewChapterList,
  getNovel,
  toggleBookMark,
} from '../../services/apiServices';
import { FaBookmark } from 'react-icons/fa';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { changeThemeSetting } from '../../redux/action/readingAction';
import upView from '../../services/api/upView';

export const ReadingPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.readingSetting.theme);
  const font = useSelector((state) => state.readingSetting.font);
  const size = useSelector((state) => state.readingSetting.size);
  const slug = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bookMark, setBookMark] = useState({});
  const [novel, setNovel] = useState({});
  const [chapter, setChapter] = useState('');
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const toggleBookMarkBtn = async () => {
    try {
      const res = await toggleBookMark(novel?.id, !bookMark?.isLove);
      setBookMark(res?.data?.collection);
    } catch (error) {}
  };
  const scrollToSection = () => {
    const targetElement = document.getElementById('comment');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const novelResponse = await getNovel(`?slug=${slug.nSlug}`);
        setNovel(novelResponse?.data?.novels[0]);
        if (novelResponse?.data?.novels[0]) {
          const res = await getNewChapterList(
            `?novel=${novelResponse?.data?.novels[0]?.id}&slug=${slug.cSlug}`
          );
            const view = await upView(res?.data?.chapter[0]?.id);
          setChapter(res?.data?.chapter[0]);
          if (res?.data?.chapter[0]?.content) {
            document.title =
              'Chương ' +
              res?.data?.chapter[0]?.number +
              ' ' +
              res?.data?.chapter[0]?.name;
            if (novelResponse?.data?.novels[0]) {
              const bookmarkResponse = await getMarkBook(
                novelResponse.data.novels[0].id
              );
              setBookMark(bookmarkResponse?.data?.collection);
              await toggleBookMark(
                novelResponse.data.novels[0].id,
                bookmarkResponse?.data?.collection?.isLove,
                res?.data?.chapter[0]?.id
              );
            }
          }
        }
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
    if (theme === 'dark') setSwitch1(true);
  }, [slug.nSlug, slug.cSlug]);

  if (isLoading)
    return (
      <div
        className={`w-screen h-screen flex ${
          theme === 'dark' ? 'bg-black' : ''
        }`}
      >
        <div className="m-auto">
          <Spinner
            className="animate-spin-in "
            aria-label="spinner example"
            size="lg"
          />
        </div>
      </div>
    );
  if (chapter && !isLoading)
    return (
      <div className={theme}>
        <Header></Header>
        <div className="w-full flex bg-be text-black dark:text-white dark:bg-black">
          <div className="relative m-auto bg-read dark:bg-gray-700 rounded-xl  md:max-w-[1080px]  max-w-[98%] w-full my-6 md:p-12 p-4">
            <div className="hidden md:flex absolute right-[-10px] top-0">
              <ul className="fixed ">
                <Link to={`/novel/${novel?.slug}`}>
                  <li className="block  bg-read dark:bg-gray-700  border-b-2 border-gray-300 rounded-t-xl">
                    <div className="py-4 px-8">
                      <MdArrowBack className="text-2xl" />
                    </div>
                  </li>
                </Link>
                <li
                  className={`relative block  border-b-2 border-gray-300 ${
                    isShowSetting
                      ? 'bg-white dark:bg-gray-400'
                      : 'bg-read dark:bg-gray-700 '
                  }`}
                >
                  <div
                    className="py-4 px-8"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsShowSetting(!isShowSetting);
                    }}
                  >
                    <IoSettingsOutline className="text-2xl " />
                  </div>
                  <div
                    className={`absolute bg-white dark:bg-gray-400 right-full top-0 w-[500px] ${
                      isShowSetting ? '' : 'hidden'
                    } `}
                  >
                    <div className="p-8 grid grid-cols-3 gap-4">
                      <span className="col-span-1">Theme:</span>
                      <ToggleSwitch
                        className="col-span-2"
                        checked={switch1}
                        label={!switch1 ? 'Light Mode' : 'Dark Mode'}
                        onChange={() => {
                          setSwitch1(!switch1);
                          dispatch(
                            changeThemeSetting({
                              theme: !switch1 ? 'dark' : 'light',
                            })
                          );
                        }}
                      />

                      <span className="col-span-1">Font Chữ:</span>
                      <div className="col-span-2 p-2  rounded-lg border-2">
                        <FontCombobox />
                      </div>
                      <span className="col-span-1">Cỡ chữ:</span>
                      <div className="col-span-2 p-2  rounded-lg border-2">
                        <TextSizeCombobox />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="block  bg-read dark:bg-gray-700  border-b-2 border-gray-300 ">
                  <div className="py-4 px-8">
                    <button onClick={toggleBookMarkBtn}>
                      {bookMark?.isLove ? (
                        <FaBookmark className="text-2xl text-red-500 dark:text-red-700"></FaBookmark>
                      ) : (
                        <FaRegBookmark className="text-2xl" />
                      )}
                    </button>
                  </div>
                </li>
                <li className="block  bg-read dark:bg-gray-700  border-gray-300 rounded-b-xl">
                  <div className=" py-4 px-8" onClick={scrollToSection}>
                    <IoChatboxEllipsesOutline className="text-2xl" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:hidden relative">
                <div
                  className="pb-2 absolute right-1 top-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsShowSetting(!isShowSetting);
                  }}
                >
                  <IoSettingsOutline className="text-2xl rounded-full" />
                </div>
                <div className={`bg-be mb-2 dark:bg-gray-700 rounded-lg ${isShowSetting ? '' : 'hidden'} `}>
                  <div className="p-8 grid grid-cols-3 gap-4">
                    <span className="col-span-1">Theme:</span>
                    <ToggleSwitch
                      className="col-span-2"
                      checked={switch1}
                      label={!switch1 ? 'Light Mode' : 'Dark Mode'}
                      onChange={() => {
                        setSwitch1(!switch1);
                        dispatch(
                          changeThemeSetting({
                            theme: !switch1 ? 'dark' : 'light',
                          })
                        );
                      }}
                    />

                    <span className="col-span-1">Font Chữ:</span>
                    <div className="col-span-2 p-2  rounded-lg border-2">
                      <FontCombobox />
                    </div>
                    <span className="col-span-1">Cỡ chữ:</span>
                    <div className="col-span-2 p-2  rounded-lg border-2">
                      <TextSizeCombobox />
                    </div>
                  </div>
                </div>
            </div>
            <div className="hidden md:flex justify-between px-4">
              <Link to={`/novel/${novel.slug}/chuong-${chapter.number - 1}`}>
                <button
                  disabled={chapter.number === 1}
                  className="px-6 py-2 hover:opacity-75 rounded-[50px] bg-gray-400 disabled:opacity-50"
                >
                  <div className="w-[140px] justify-between flex items-center text-base font-medium text-white">
                    <FaLongArrowAltLeft className="mr-2" />
                    <span> Chương Trước</span>
                  </div>
                </button>
              </Link>
              <Link to={`/novel/${novel.slug}/chuong-${chapter.number + 1}`}>
                <button
                  disabled={novel.progress === chapter.number}
                  className="px-6 py-2 hover:opacity-75 rounded-[50px] bg-gray-400 disabled:opacity-50"
                >
                  <div className="w-[140px] justify-between flex items-center text-base font-medium text-white">
                    Chương Sau
                    <FaLongArrowAltRight className="ml-2" />
                  </div>
                </button>
              </Link>
            </div>
            <div className="md:pt-12">
              <h1 className="md:text-3xl text-xl block w-[90%]">
                {`Chương ${chapter.number || '...'}: ${chapter.name || '...'}`}
              </h1>

              <div className="md:flex hidden pt-6 ">
                <div className="flex items-center">
                  <FiBook className="mr-1" />{' '}
                  <span className="text-base">{novel.name || '...'}</span>
                </div>
                <div className="flex items-center ml-6">
                  <FaPenToSquare className="mr-1" />{' '}
                  <span className="text-base">
                    {chapter?.translator?.firstName
                      ? chapter?.translator?.firstName +
                        ' ' +
                        chapter?.translator?.lastName
                      : 'Dịch giả'}
                  </span>
                </div>
                <div className="flex items-center ml-6">
                  <TbTextSize className="mr-1" />
                  <span className="text-base">
                    {chapter?.content?.toString().length || 0}
                  </span>
                </div>
                <div className="flex items-center ml-6">
                  <FaRegHeart className="mr-1" />{' '}
                  <span className="text-base">{chapter?.watch || 0}</span>
                </div>
              </div>
              <div className="flex items-center mt-1">
                <FaRegClock className="mr-1" />{' '}
                <span className="text-base">
                  {moment(new Date(chapter?.createTime)).format('YYYY-MM-DD')}
                </span>
              </div>
              <div
                className={`pt-6 ${
                  size === 'sm' ? 'leading-7 font-normal ' : ''
                } ${size === 'base' ? 'leading-9 font-normal' : ''} ${
                  size === 'xl' ? 'leading-9 font-normal' : ''
                } ${size === '3xl' ? 'font-light' : ''} ${
                  size === '4xl' ? 'font-light' : ''
                } text-${size}`}
              >
                <article
                  id="content"
                  dangerouslySetInnerHTML={{
                    __html: chapter.content.replace(/<\/p>/g, '</p><br>'),
                  }}
                  className={`pb-32 font-${font}`}
                ></article>
                <div className="hidden">
                  <span className="font-sans">C</span>
                  <span className="font-patrick">H</span>
                  <span className="font-playfair">A</span>
                  <span className="font-protes">T</span>
                  <span className="font-roboto">E</span>
                  <span className="font-mono">R</span>
                </div>
                ===============
              </div>
              <div className="pt-8 md:pt-16 grid grid-cols-1 md:grid-cols-2">
                <Link to={`/novel/${novel.slug}/chuong-${chapter.number - 1}`}>
                  <button
                    disabled={chapter.number === 1}
                    className="w-full flex text-xl xs:py-4 justify-center items-center border-[1px] border-gray-300"
                  >
                    <FaLongArrowAltLeft className="mr-2" />
                    <span> Chương Trước</span>
                  </button>
                </Link>
                <Link to={`/novel/${novel.slug}/chuong-${chapter.number + 1}`}>
                  <button
                    disabled={novel.progress === chapter.number}
                    className="w-full flex text-xl mt-4 md:mt-0 xs:py-4 justify-center items-center border-[1px] border-gray-300"
                  >
                    <span> Chương Sau</span>
                    <FaLongArrowAltRight className="ml-2" />
                  </button>
                </Link>
              </div>
              <div className="mt-8" id="comment">
                <CommentList chapter={chapter.id} />
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  return <NotFound />;
};
