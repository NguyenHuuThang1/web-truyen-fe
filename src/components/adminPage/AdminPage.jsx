import React, { useEffect } from 'react';
import logo from './../../assets/admin-logo.svg';
import { FaUserShield } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { FaUserPen } from 'react-icons/fa6';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const AdminPage = () => {
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Admin';
    if (screen.width < 1280) {
      navigate('/');
    }
    if (account.role !== 'admin') navigate('/');
  });
  return (
    <div className="grid grid-cols-12">
      <div className="fixed xl:w-[17%] md:w-[25%] grid border-r-2 h-[100vh] shadow-xl content-between bg-xam">
        <div>
          <Link to={'/admin'}>
            <img src={logo} className="w-[150px] m-auto " alt="logo" />
          </Link>
          <div>
            <ul className="p-6">
              <NavLink
                to={'/admin/search'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-xl font-normal rounded-md text-white bg-red-500 block shadow-md shadow-gray-500 '
                    : 'text-xl font-normal rounded-md text-gray-600'
                }
              >
                <li>
                  <span className="hover:animate-move-to-right flex items-center pl-4">
                    <FaSearch className="mr-4" />
                    Search
                  </span>
                </li>
              </NavLink>
              <NavLink
                to={'/admin/ads'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-xl font-normal rounded-md text-white bg-red-500 block shadow-md shadow-gray-500 '
                    : 'text-xl font-normal rounded-md text-gray-600'
                }
              >
                <li>
                  <span className="hover:animate-move-to-right flex items-center pl-4">
                    <FaUserShield className="mr-4" />
                    Admins
                  </span>
                </li>
              </NavLink>
              <NavLink
                to={'/admin/author'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-xl font-normal rounded-md text-white bg-red-500 block shadow-md shadow-gray-500 '
                    : 'text-xl font-normal rounded-md text-gray-600'
                }
              >
                <li>
                  <span className="hover:animate-move-to-right flex items-center pl-4">
                    <FaUserPen className="mr-4" />
                    Author
                  </span>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>

        <div className="m-auto mb-10 p-8 rounded-lg  bg-gradient-to-tr from-red-500 to-pink-400 shadow-xl w-[80%] flex-col">
          <img
            src={
              account.avatar ||
              'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/399825645_3255842764713267_2308659912949694663_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGwlOMJ2zTgDf18EI4tmbys5nCnYITr8MTmcKdghOvwxDvwiRqE48dT_bFnQCHyGshwrazx79nZEIRWfdFKcmpN&_nc_ohc=m85tlUaNtUQAX_4JTnE&_nc_ht=scontent.fhan5-9.fna&oh=00_AfDo3ZF6_R7l70iCQkpC7pY1nTWj6YMojA7RwpwOcBPGKg&oe=65C381F7'
            }
            className="m-auto h-[100px] rounded-full w-[100px] "
            alt="avatar"
          />
          <small className="m-auto block text-center mt-4 text-white ">
            {`${account.role.toUpperCase()} ${account.firstName} ${
              account.lastName
            }`}
          </small>

          <Link to={'/'}>
            <button className="m-auto text-center mt-4 py-2 px-2 block rounded-lg bg-white hover:opacity-80 text-xl font-medium text-red-600">
              Trang Chủ
            </button>
          </Link>
        </div>
      </div>
      <div className="xl:col-start-3 xl:col-span-10 md:col-start-4 md:col-span-9">
        <div className="w-full flex bg-xam min-h-screen items-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
