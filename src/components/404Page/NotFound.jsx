import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import notFoundImg from '../../assets/404-img.png';
import { MyCarousel } from '../MyCarousel';

export const NotFound = () => {
  useEffect(() => {
    document.title = '404';
  }, []);
  return (
    <>
      <Header></Header>
      <MyCarousel />
      <div className="flex h-[30vh]">
        <div className="m-auto grid">
          <img src={notFoundImg} alt="404" className="m-auto" />
          <h5 className="text-base font-medium text-center">Rất tiếc</h5>
          <h4 className="text-sm mt-4">
            Nội dung không tồn tại hoặc đã bị xoá?
          </h4>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
