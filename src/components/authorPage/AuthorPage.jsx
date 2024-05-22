import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { MyCarousel } from '../MyCarousel';
import { AuthorItem } from './AuthorItem';
import { useParams } from 'react-router-dom';
import { MyPagination } from '../MyPagination';
import { getAuthor, getNovel } from '../../services/apiServices';
import { NotFound } from '../404Page/NotFound';
import { Spinner } from 'flowbite-react';

export const AuthorPage = () => {
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [novel, setNovel] = useState([]);
  const [author, setAuthor] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const aRes = await getAuthor(param.aId);
        setAuthor(aRes?.data?.author);
        console.log(author);
        document.title = aRes?.data?.author?.name;
        const res = await getNovel(`?author=${param.aId}&page=${currentPage}`);
        setNovel(res?.data?.novels);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage, param]);
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
  if (!author && isLoading === false) return <NotFound></NotFound>;
  return (
    <div>
      <Header />
      <MyCarousel />
      <div className="m-auto bg-white md:rounded-xl  md:max-w-[900px] lg:max-w-[1200px]  max-w-[98%] w-full md:-translate-y-20    min-h-[500px] p-5 ">
        <h5 className="font-medium">{author.name}</h5>
        <div>
          {novel.map((novel) => (
            <AuthorItem key={novel.id} novel={novel} />
          ))}
        </div>
        <MyPagination setPage={setCurrentPage} page={currentPage} />
      </div>
      <Footer />
    </div>
  );
};
