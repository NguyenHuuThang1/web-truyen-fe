import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineCollections } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { MdKey } from 'react-icons/md';
import { useSelector } from 'react-redux';

export const UserPage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    document.title = 'Hồ sơ';
    if (!isAuthenticated) return navigate('/log-in');
  });
  const navigate = useNavigate();
  return (
    <div className="flex mt-[10px] h-[50%] z-10 ">
      <div className="m-auto bg-be md:rounded-xl  md:max-w-[1000px] lg:max-w-[1280px]  max-w-[98%] w-full md:-translate-y-20  shadow-md grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 col-span-1 md:min-h-[70vh] pt-8 pl-3 h-[100%]">
          <ul>
            <li className="pl-4 py-0">
              <NavLink
                to="/user/profile"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-yellow-600 px-4 py-2 w-full block hover:text-yellow-300 text-white'
                    : 'px-4 py-2 w-full block hover:text-yellow-300'
                }
              >
                <span className="flex items-center">
                  <CgProfile className="mr-2"></CgProfile> Hồ sơ
                </span>
              </NavLink>
            </li>
            <li className="pl-4 py-0">
              <NavLink
                to="/user/my-collection"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-yellow-600 px-4 py-2 w-full block hover:text-yellow-300 text-white'
                    : 'px-4 py-2 w-full block hover:text-yellow-300 '
                }
              >
                <span className="flex items-center">
                  <MdOutlineCollections className="mr-2"></MdOutlineCollections>{' '}
                  Tủ truyện
                </span>
              </NavLink>
            </li>
            <li className="pl-4 py-0">
              <NavLink
                to="/user/change-password"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-yellow-600 px-4 py-2 w-full block hover:text-yellow-300 text-white'
                    : 'px-4 py-2 w-full block hover:text-yellow-300'
                }
              >
                <span className="flex items-center">
                  <MdKey className="mr-2"></MdKey> Đổi mật khẩu
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="md:col-span-9 col-span-1 min-h-[70vh] pl-3 h-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
