import { Datepicker, FileInput, Modal, Spinner, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAuthorById,
  updateAuthor,
} from '../../../services/api/admin/author';
import moment from 'moment';

export const UpdateAuthor = () => {
  
  const [openModal, setOpenModal] = useState(false);
  const param = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();
  const handleUpdateAuthor = async () => {
    try {
      const res = await updateAuthor(param.aId, name, description, birthday);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAuthorById(param.aId);
        setAuthor(res.data.author);
        setDescription(res.data.author.description);
        setName(res.data.author.name);
        setBirthday(new Date(res.data.author.birthday) || new Date());
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);
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
  return (
    <div className="mx-auto mt-[2%] w-[96%] bg-white rounded-lg p-8">
      <form>
        <div className="ml-2 grid content-between pb-16">
          <small className="text-gray-500">{'ID: ' + author.id}</small>
          <h2 className="text-2xl font-medium">
            {'Tên tác giả: ' + author.name + ' 💕'}
          </h2>
          <small className="text-gray-600">
            {/* {moment(author.birthday ? new Date(author.birthday) : '2000-01-01').format('YYYY-MM-DD')} */}
          </small>
          <h2 className="text-xl font-normal overflow-hidden line-clamp-2">
            {'Mô tả: ' + (author.description ? author.description : '')}
          </h2>
        </div>
        <div className="p-8">
          <label htmlFor="floating_name" className=" font-medium ">
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
          <label htmlFor="floating_desc" className=" font-medium ">
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
          <Datepicker
            // defaultDate={new Date(author.birthday) }
            className="pt-2"
            onSelectedDateChanged={setBirthday}
          />
        </div>
        <div className="flex justify-center p-8 pb-0">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-white w-full p-2 rounded-xl bg-red-500  hover:opacity-70 font-medium text-base  text-center"
          >
            Lưu
          </button>
        </div>
        <>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Có chắc sẽ lưu không 🧐</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Khi lưu tác giả này sẽ có vai trò mới có thể ảnh hướng tới
                  website!?
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleUpdateAuthor}>Lưu</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Huỷ
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </form>
    </div>
  );
};
