import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { changePwd } from '../../services/apiServices';

export const ChangePwdForm = () => {
  const [disable, setDisable] = useState(false);
  const [cPwd, setCPwd] = useState('');
  const [nPwd, setNPwd] = useState('');
  const [nPwdC, setNPwdC] = useState('');
  const validatePassword = (pwString) => {
    var strength = 0;

    strength += /[A-Z]+/.test(pwString) ? 1 : 0;
    strength += /[a-z]+/.test(pwString) ? 1 : 0;
    strength += /[0-9]+/.test(pwString) ? 1 : 0;
    strength += /[\W]+/.test(pwString) ? 1 : 0;

    if (strength === 4) return true;
    return false;
  };

  const handlerSubmitBtn = (e) => {
    e.preventDefault();
    if (nPwd !== nPwdC) {
      toast.error('💣 Mật khẩu không khớp', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return setDisable(false);
    }

    if (!validatePassword(nPwd)) {
      toast.error('💣 Mật khẩu quá yếu', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return setDisable(false);
    }
    //   if (validatePassword(nPwd)) {
    changePwd(cPwd, nPwd)
      .then(() => {
        toast.success(`Đổi mật khẩu thành công 😎`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setCPwd('');
        setNPwd('');
        setNPwdC('');
      })
      .catch((error) =>
        toast.error('💣' + error.response.data, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      )
      .finally(() => {
        setDisable(false);
      });
    //   } else
    //
    // } else
    //   toast.error('💣 Mật khẩu không trùng khớp', {
    //     position: 'top-right',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'light',
    //   });
    // setDisable(false);
  };

  return (
    <div className="p-8">
      <div className="flex text-lg font-medium border-b-2 justify-center pb-5">
        <span>Đổi mật khẩu</span>
      </div>
      <form
        onSubmit={(e) => {
          setDisable(true);
          handlerSubmitBtn(e);
        }}
      >
        <div className="flex-col mt-4">
          <label
            htmlFor="current-password"
            className="pl-2 font-medium block pt-2"
          >
            Mật khẩu hiện tại
          </label>
          <input
            disabled={disable}
            type="password"
            name="current-password"
            className="w-full mt-2 rounded-2xl"
            id="current-password"
            value={cPwd}
            onChange={(e) => {
              setCPwd(e.target.value);
            }}
          />
        </div>
        <div className="flex-col mt-4">
          <label htmlFor="new-password" className="pl-2 font-medium block pt-2">
            Mật khẩu mới
          </label>
          <input
            disabled={disable}
            type="password"
            name="new-password"
            className="w-full mt-2 rounded-2xl"
            id="new-password"
            value={nPwd}
            onChange={(e) => {
              setNPwd(e.target.value);
            }}
          />
        </div>
        <div className="flex-col mt-4">
          <label
            htmlFor="new-password-comfirm"
            className="pl-2 font-medium block pt-2"
          >
            Nhập lại mật khẩu mới
          </label>
          <input
            value={nPwdC}
            disabled={disable}
            type="password"
            name="new-password-comfirm"
            className="w-full mt-2 rounded-2xl"
            id="new-password-comfirm"
            onChange={(e) => {
              setNPwdC(e.target.value);
            }}
          />
        </div>
        <div className="flex md:justify-end justify-center pt-8">
          <button
            disabled={disable}
            type="submit"
            className="text-white w-full md:w-[30%] p-2 rounded-xl bg-yellow-400  hover:opacity-70 font-medium text-base  text-center"
          >
            <Spinner
              hidden={!disable}
              className="animate-spin-in mr-4"
              aria-label="spinner example"
              size="md"
            />
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};
