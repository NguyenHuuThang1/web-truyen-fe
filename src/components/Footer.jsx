import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import bg from '../assets/footerbg.png';

const Footer = () => {
  return (
    <div
      className=" w-[100%] bg-cover bg-center h-[100px] sm:h-[200px] mt-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col">
        <Link to="/" className="pl-4 m-auto">
          <img src={logo} alt="Logo" className="h-[50px]" />
        </Link>
        <div className="m-auto w-[50%] pt-[1rem] hidden sm:block">
          <p className="text-gray-600 text-sm text-center">
            TruyenNe là nền tảng mở trực tuyến, miễn phí đọc truyện chữ được
            convert hoặc dịch kỹ lưỡng, do các converter và dịch giả đóng góp,
            rất nhiều truyện hay và nổi bật được cập nhật nhanh nhất với đủ các
            thể loại tiên hiệp, kiếm hiệp, huyền ảo ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
