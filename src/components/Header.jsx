// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { CiSearch } from 'react-icons/ci';
import { ImUpload2 } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineCollections } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { doLogout } from '../redux/action/userAction';
import { toast } from 'react-toastify';
import {} from '../services/apiServices';
import { logout } from '../services/apiServices';
const Header = () => {
    const [search, setSearch] = useState('');
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const handleLogOutBtn = async () => {
        try {
            const res = await logout();
            dispatch(doLogout());
            toast.info('Quay trở lại sớm nhé bạn yêu💕', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } catch (error) {
            console.log(error);
            toast.error('Xin thử lại sau💕', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    const handleToggleMenu = () => {
        setToggle(!toggle);
        console.log(1);
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/novel/search?search=${search}'`);
    };

    return (
        <div className="h-[80px] bg-be sticky drop-shadow z-50">
            <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto ">
                <Link to="/" className="pl-4">
                    <img src={logo} alt="Logo" className="h-[50px]" />
                </Link>

                <div className="relative hidden pl-[18rem]  md:flex">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm"
                            className="px-8 py-2 rounded-md w-[320px]"
                        />
                        <button type="submit" className="absolute top-[12px] right-[16px]">
                            <CiSearch />
                        </button>
                    </form>
                </div>
                <ul className="hidden md:flex flex-row">
                    <li className="pr-10 hover:text-green-500">
                        <Link to="/up-load" className="flex items-center">
                            Đăng truyện <ImUpload2 className="pl-[4px]" />
                        </Link>
                    </li>
                    {!isAuthenticated ? (
                        <>
                            <li className="pr-4 hover:text-green-500">
                                <Link to="/log-in">Đăng nhập</Link>
                            </li>
                            <li className=" hover:text-green-500">
                                <Link to="/register">Đăng ký</Link>
                            </li>
                        </>
                    ) : (
                        <div className="relative flex items-center">
                            <div className="flex items-center" onClick={(e) => setIsShowUserMenu(!isShowUserMenu)}>
                                <img
                                    src={account.avatar ? account.avatar : '/src/assets/dfAvaUser.jpg'}
                                    className="h-8 w-8 rounded-full"
                                    alt="avatar"
                                />
                                <span className="ml-2 hover:text-yellow-400 hover:cursor-pointer">
                                    {account.firstName + ' ' + account.lastName}
                                </span>
                            </div>

                            <div
                                className={`${
                                    isShowUserMenu ? '' : 'hidden'
                                } absolute top-full w-[200px] rounded-xl shadow-2xl bg-white z-20`}
                            >
                                <ul className="text-gray-700">
                                    <li
                                        className="pl-3 hover:bg-yellow-50 rounded-t-xl"
                                        onClick={() => {
                                            setIsShowUserMenu(!isShowUserMenu);
                                        }}
                                    >
                                        <Link to="/user/profile">
                                            <span className="flex items-center">
                                                <CgProfile className="mr-2 text-gray-500"></CgProfile>
                                                Hồ sơ
                                            </span>
                                        </Link>
                                    </li>
                                    {account.role === 'admin' ? (
                                        <li
                                            className="pl-3 hover:bg-yellow-50 rounded-t-xl"
                                            onClick={() => {
                                                setIsShowUserMenu(!isShowUserMenu);
                                            }}
                                        >
                                            <Link to="/admin">
                                                <span className="flex items-center">
                                                    <MdAdminPanelSettings className="mr-2 text-gray-500"></MdAdminPanelSettings>
                                                    Admin
                                                </span>
                                            </Link>
                                        </li>
                                    ) : null}

                                    <li
                                        className="pl-3 hover:bg-yellow-50 "
                                        onClick={() => {
                                            setIsShowUserMenu(!isShowUserMenu);
                                        }}
                                    >
                                        <Link to="/user/my-collection">
                                            <span className="flex items-center">
                                                <MdOutlineCollections className="mr-2 text-gray-500"></MdOutlineCollections>{' '}
                                                Tủ truyện
                                            </span>
                                        </Link>
                                    </li>
                                    <li
                                        className="pl-3 hover:bg-yellow-50 rounded-b-xl hover:cursor-pointer"
                                        onClick={handleLogOutBtn}
                                    >
                                        <span className="flex items-center">
                                            <IoIosLogOut className="mr-2 "></IoIosLogOut> Đăng xuất
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
