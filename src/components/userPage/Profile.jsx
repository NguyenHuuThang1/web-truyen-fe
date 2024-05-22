import React, { useEffect, useState } from 'react';
import ava from './../../assets/dfAvaUser.jpg';
import { CiCamera } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { updateMe } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { updateInfo } from '../../redux/action/userAction';
import { Spinner } from 'flowbite-react';
export const Profile = () => {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const [isShowCam, setIsShowCam] = useState(false);

  const [file, setFile] = useState('');
  const [avatar, setAvatar] = useState(account.avatar);
  const [firstName, setFirstName] = useState(account.firstName);
  const [lastName, setLastName] = useState(account.lastName);

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmitBtn = (e) => {
    e.preventDefault();
    if (firstName && lastName)
      updateMe(firstName, lastName, file)
        .then((res) => {
          toast.success(`Cập nhật thông tin thành công 👌`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          dispatch(updateInfo(res));
        })
        .catch((err) =>
          toast.error('💣 ' + err.message, {
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
        .finally(() => setDisable(false));
  };
  return (
    <form
      className="p-8"
      onSubmit={(e) => {
        setDisable(true);
        handleSubmitBtn(e);
      }}
    >
      <div className="flex text-lg font-medium border-b-2 justify-center pb-5">
        <span>{`Thông tin về ${account.username}`}</span>
      </div>
      <div className="flex justify-center relative p-8 border-b-2">
        <label
          htmlFor="avafile"
          onMouseOver={(e) => {
            setIsShowCam(true);
          }}
          onMouseLeave={() => {
            setIsShowCam(false);
          }}
        >
          <img
            src={avatar}
            className="h-[160px] rounded-full w-[160px] shadow-lg"
            alt="avatar"
          />
        </label>
        <input
          disabled={disable}
          accept="image/*"
          className="hidden"
          type="file"
          id="avafile"
          name="avafile"
          onChange={handleChangeImage}
        />
        {isShowCam && (
          <>
            <div className="absolute top-[50%] w-[60px] h-[60px] bg-black opacity-40  rounded-full -translate-y-1/2 pointer-events-none"></div>
            <CiCamera className="absolute text-white text-3xl top-[50%] -translate-y-1/2 pointer-events-none" />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  w-full gap-4 pt-2">
        <div className="flex-col col-span-1">
          <div>
            <label htmlFor="floating_fistname" className="font-medium ">
              Họ
            </label>
          </div>
          <input
            disabled={disable}
            type="text"
            name="floating_fistname"
            id="floating_fistname"
            className="w-full mt-2 rounded-md"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
        </div>
        <div className="flex-col col-span-1">
          <div>
            <label htmlFor="floating_lastname" className="font-medium ">
              Tên
            </label>
          </div>
          <input
            disabled={disable}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            name="floating_lastname"
            id="floating_lastname"
            className="w-full mt-2 rounded-md"
            required
          />
        </div>
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
  );
};
