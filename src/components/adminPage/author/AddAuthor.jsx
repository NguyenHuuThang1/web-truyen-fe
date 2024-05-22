import { Datepicker } from 'flowbite-react';
import React, { useState } from 'react';
import { createAuthor } from '../../../services/api/admin/author';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AddAuthor = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();
  const handleSBtn = async (e) => {
    e.preventDefault();
    try {
      const res = await createAuthor(name, description, birthday);
      toast.success('🦄 Thành công!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/admin');
    } catch (error) {
      console.log(error);
      toast.error('💣 Lỗi xin thử lại', {
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
  return (
    <div className="mx-auto mt-[2%] w-[96%] bg-white rounded-lg p-8">
      <h5 className="font-medium text-xl">Thêm mới tác giả </h5>
      <form onSubmit={handleSBtn}>
        <div className="p-8">
          <label htmlFor="floating_name" className="font-medium ">
            Tên
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="floating_name"
            id="floating_name"
            className="w-full mt-2 rounded-md"
            required
          />
        </div>
        <div className="px-8 pb-8">
          <label htmlFor="floating_desc" className="font-medium ">
            Mô tả
          </label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="floating_desc"
            id="floating_desc"
            className="w-full mt-2 rounded-md"
            required
          />
        </div>

        <div className="px-8">
          <span className="font-medium">Ngày sinh</span>
          <Datepicker onSelectedDateChanged={setBirthday} className="pt-2" />
        </div>
        <div className="flex ml-8 justify-center pt-8 pr-8">
          <button
            type="submit"
            className="text-white w-full p-2 rounded-xl bg-red-500  hover:opacity-70 font-medium text-base  text-center"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};
