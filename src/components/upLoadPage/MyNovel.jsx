import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoAddOutline } from 'react-icons/io5';
import { CiViewList } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { CiSquareCheck } from 'react-icons/ci';
import {
  deleteANovel,
  endNovel,
  getMyNovel,
} from '../../services/api/translator/novel';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'flowbite-react';
import { toast } from 'react-toastify';
export const MyNovel = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [endedNovel, setEndedNovel] = useState({});
  const [myNovels, setMyNovels] = useState([]);
  const [deleteNovel, setDeleteNovel] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyNovel();
        setMyNovels(res.data.novels);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const handleDeleteBtn = async () => {
    try {
      const res = await deleteANovel(deleteNovel.id);
      toast.success('🙌 Xoá thành công!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setMyNovels(myNovels.filter((el) => el.id !== deleteNovel.id));
      setDeleteNovel({});
      setOpenModal(false);
    } catch (error) {
      toast.error('💣 Có lỗi!', {
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
  const handleEndBtn = async () => {
    try {
      const res = await endNovel(endedNovel.id);
      console.log(res);
      toast.success(
        '🙌 Chúc mừng bạn đã hoàn thành bộ truyện ' + endedNovel.name + '!',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );

      setMyNovels([
        res.data.novel,
        ...myNovels.filter((el) => el.id !== endedNovel.id),
      ]);
      setEndedNovel({});
      setOpenModal1(false);
    } catch (error) {
      toast.error('💣 Có lỗi!', {
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
    <div className="mx-auto mt-[2%] w-[96%]  rounded-lg p-8">
      <h1 className="text-xl font-medium">Truyện đã đăng</h1>
      <small>Danh sách tác phẩm của bạn!</small>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {myNovels.map((novel) => (
          <div className="bg-white p-6" key={novel.id}>
            <div className="flex justify-between">
              <h5 className="text-xl flex-1 overflow-hidden line-clamp-1">
                {novel.name}
              </h5>
              <button
                onClick={() => {
                  setDeleteNovel({ id: novel.id, name: novel.name });
                  setOpenModal(true);
                }}
              >
                <IoClose className="text-red-600"></IoClose>
              </button>
            </div>
            <div className="pt-4">
              <span
                className={
                  novel.status === 'Chưa hoàn thành'
                    ? 'text-red-600'
                    : 'text-green-500'
                }
              >
                Tình trạng: {novel.status}!
              </span>
            </div>
            <div className="pt-4 flex">
              {novel.status === 'Chưa hoàn thành' && <Link to={`/up-load/my-novel/add-chapter/${novel.id}`}>
                <button className="p-2 m-2 bg-be rounded-md">
                  <IoAddOutline className="text-gray-500" />
                </button>
              </Link>}
              <Link to={`/up-load/my-novel/chapter-list/${novel.id}`}>
                <button className="p-2 m-2 bg-be rounded-md">
                  <CiViewList />
                </button>
              </Link>
              <Link to={`/up-load/my-novel/${novel.id}`}>
                <button className="p-2 m-2 bg-be rounded-md">
                  <FiEdit className="text-gray-500" />
                </button>
              </Link>
              <button
                onClick={() => {
                  setEndedNovel({ id: novel.id, name: novel.name });
                  setOpenModal1(true);
                }}
                className={`p-2 m-2 bg-be rounded-md ${
                  novel.status === 'Chưa hoàn thành' ? '' : 'hidden'
                }`}
              >
                <CiSquareCheck className="text-green-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="bg-red-500">
            <span className="text-white">Xoá truyện {deleteNovel.name}</span>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Bạn có chắc xoá không? Bạn sẽ không thể hoàn tác sau khi xoá? 😢
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleDeleteBtn}>Xoá</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Huỷ
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <>
        <Modal show={openModal1} onClose={() => setOpenModal1(false)}>
          <Modal.Header className="bg-green-400">
            <span className="text-white">Cập nhật {deleteNovel.name}</span>
          </Modal.Header>

          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Truyện này sẽ được cập nhật trạng thái hoàn thành 😘
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEndBtn}>OK</Button>
            <Button color="gray" onClick={() => setOpenModal1(false)}>
              Huỷ
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};
