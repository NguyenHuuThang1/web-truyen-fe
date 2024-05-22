import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { register } from '../../services/apiServices';
import { useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    document.title = 'Đăng ký';
    if (isAuthenticated) return navigate('/');
  });
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateUsername = (username) => {
    return username.length >= 6 && /^[a-z0-9_\.]+$/.test(username);
  };

  const validatePassword = (pwString) => {
    var strength = 0;

    strength += /[A-Z]+/.test(pwString) ? 1 : 0;
    strength += /[a-z]+/.test(pwString) ? 1 : 0;
    strength += /[0-9]+/.test(pwString) ? 1 : 0;
    strength += /[\W]+/.test(pwString) ? 1 : 0;

    if (strength === 4) return true;
    return false;
  };

  const handleUsername = (e) => {
    const usernameInput = e.target;
    const label = document.querySelector("[for='floating_username']");
    if (!validateUsername(usernameInput.value)) {
      usernameInput.classList.add('!text-red-600');
      usernameInput.classList.add('!border-red-600');

      label.classList.add('!text-red-600');
    } else {
      usernameInput.classList.remove('!text-red-600');
      usernameInput.classList.remove('!border-red-600');

      label.classList.remove('!text-red-600');
    }

    setUsername(usernameInput.value);
  };

  const handlePasswordChange = (e) => {
    const pwdInput = e.target;
    const label = document.querySelector("[for='floating_password']");
    if (!validatePassword(pwdInput.value)) {
      pwdInput.classList.add('!text-red-600');
      pwdInput.classList.add('!border-red-600');

      label.classList.add('!text-red-600');
    } else {
      pwdInput.classList.remove('!text-red-600');
      pwdInput.classList.remove('!border-red-600');

      label.classList.remove('!text-red-600');
    }

    setPwd(pwdInput.value);
    const pwdComfirmInput = document.getElementById(
      'floating_comfirm_password'
    );
    const labelComfirm = document.querySelector(
      "[for='floating_comfirm_password']"
    );
    if (pwdComfirmInput.value !== '') {
      if (pwdComfirmInput.value !== pwdInput.value) {
        pwdComfirmInput.classList.add('!text-red-600');
        pwdComfirmInput.classList.add('!border-red-600');

        labelComfirm.classList.add('!text-red-600');
      } else {
        pwdComfirmInput.classList.remove('!text-red-600');
        pwdComfirmInput.classList.remove('!border-red-600');

        labelComfirm.classList.remove('!text-red-600');
      }
    }
  };
  const handlePasswordComfirmChange = (e) => {
    const pwdInput = e.target;
    const label = document.querySelector("[for='floating_comfirm_password']");
    if (document.getElementById('floating_password').value !== pwdInput.value) {
      pwdInput.classList.add('!text-red-600');
      pwdInput.classList.add('!border-red-600');

      label.classList.add('!text-red-600');
    } else {
      pwdInput.classList.remove('!text-red-600');
      pwdInput.classList.remove('!border-red-600');

      label.classList.remove('!text-red-600');
    }

    setPwdComfirm(pwdInput.value);
  };
  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      setIsLoading(false);
      return toast.error('Tên đăng nhập không hợp lệ!', {
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

    if (validateEmail(!email)) {
      setIsLoading(false);
      return toast.error('Email không hợp lệ!', {
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

    if (!validatePassword(pwd)) {
      setIsLoading(false);
      return toast.error('Mật khẩu quá yếu!', {
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

    if (pwd !== pwdComfirm) {
      setIsLoading(false);
      return toast.error('Mật khẩu không trùng nhau!', {
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

    let res;
    try {
      res = await register(
        firstName,
        lastName,
        username,
        email,
        pwd,
        pwdComfirm
      );
    } catch (error) {
      setIsLoading(false);
      let myError = 'Lỗi! Vui lòng thử lại sau';
      if (error.response.data.keyValue.email)
        myError = `${error.response.data.keyValue.email} đã tồn tại`;
      else if (error.response.data.keyValue.username)
        myError = `${error.response.data.keyValue.username} đã tồn tại`;

      return toast.error(myError, {
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
    return navigate('/log-in');
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdComfirm, setPwdComfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdComfirm, setShowPwdComfirm] = useState(false);
  return (
    <div>
      <div className="flex bg-gradient-to-r from-green-300 via-blue-500 to-purple-600  h-[100vh] bg-[length:300%_300%] animate-color-so-slow w-[100%]">
        <div className="m-auto bg-white rounded-2xl  drop-shadow-sm w-[98%] md:w-[460px] z-10">
          <div>
            <h1 className="text-3xl font-bold text-center pt-8 pb-8">
              Đăng ký
            </h1>
          </div>

          <form
            className="w-[80%] mx-auto"
            onSubmit={(e) => {
              setIsLoading(true);
              handleSubmitBtn(e);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  disabled={isLoading}
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Họ
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  disabled={isLoading}
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tên
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                disabled={isLoading}
                type="text"
                name="floating_username"
                id="floating_username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleUsername}
              />
              <label
                htmlFor="floating_username"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tên đăng nhập
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                disabled={isLoading}
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                disabled={isLoading}
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handlePasswordChange}
              />
              <button
                disabled={isLoading}
                type="button"
                className="absolute top-[20%] right-2 z-10 p-2"
                onClick={() => {
                  setShowPwd(!showPwd);
                  if (showPwd)
                    document
                      .getElementById('floating_password')
                      .setAttribute('type', 'password');
                  else
                    document
                      .getElementById('floating_password')
                      .setAttribute('type', 'text');
                }}
              >
                {!showPwd ? <FaEye /> : <FaEyeSlash />}
              </button>
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mật khẩu
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                disabled={isLoading}
                type="password"
                name="floating_comfirm_password"
                id="floating_comfirm_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handlePasswordComfirmChange}
              />
              <button
                disabled={isLoading}
                type="button"
                className="absolute top-[20%] right-2 z-10 p-2"
                onClick={() => {
                  setShowPwdComfirm(!showPwdComfirm);
                  if (showPwdComfirm)
                    document
                      .getElementById('floating_comfirm_password')
                      .setAttribute('type', 'password');
                  else
                    document
                      .getElementById('floating_comfirm_password')
                      .setAttribute('type', 'text');
                }}
              >
                {!showPwdComfirm ? <FaEye /> : <FaEyeSlash />}
              </button>
              <label
                htmlFor="floating_comfirm_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nhập lại mật khẩu
              </label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="text-white mb-8 w-[100%] rounded-4xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600  hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center0"
            >
              <Spinner
                hidden={!isLoading}
                className="animate-spin-in mr-4"
                aria-label="spinner example"
                size="md"
              />
              Đăng ký
            </button>
            <Link to="/log-in">
              <h5 className="text-sm text-gray-700 hover:text-gray-900 text-center pb-8">
                Nếu bạn đã có tài khoản!
              </h5>
            </Link>
          </form>
        </div>

        <div className="absolute h-[100vh] w-[100%] overflow-hidden">
          <div
            className="absolute animate-in zoom-in-50 repeat-infinite origin-center rotate-45 w-[500px] h-[500px] rounded-full left-[-300px] bg-white opacity-20"
            style={{
              animationDuration: '3s',
            }}
          ></div>
          <div
            className="absolute animate-in zoom-in-50 repeat-infinite origin-center rotate-45 w-[500px] h-[500px] rounded-full right-[-200px] top-[200px] bg-white opacity-20"
            style={{
              animationDuration: '3s',
            }}
          ></div>
          <div
            className="absolute animate-in zoom-in-50 repeat-infinite origin-center rotate-45 w-[500px] h-[500px] rounded-full bottom-[-350px] left-[500px] bg-white opacity-20"
            style={{
              animationDuration: '3s',
            }}
          ></div>
          <div
            className="absolute animate-in zoom-in-50 repeat-infinite origin-center rotate-6 w-[300px] h-[300px] rounded-full bottom-[500px] left-[600px] bg-white opacity-20"
            style={{
              animationDuration: '3s',
            }}
          ></div>
        </div>

        <div className="absolute left-1 top-1 hidden md:flex">
          <Link to="/" className="pl-4">
            <img src={logo} alt="Logo" className="h-[50px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
