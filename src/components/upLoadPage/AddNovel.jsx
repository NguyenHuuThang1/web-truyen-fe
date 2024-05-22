import { Button, FileInput, Modal, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import AuthorCombobox from './novel/AuthorCombobox';
import CategoryCombobox from './novel/CategoryCombobox';
import { getAllAuthor } from '../../services/api/admin/author';
import getCategories from '../../services/api/getCategories';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNovel } from '../../services/api/translator/novel';

export const AddNovel = () => {
  //name description author category photoImg coverImg
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState('true');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [authorList, setAuthorList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photoImg, setPhotoImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAuthor();
        setAuthorList([
          { _id: '', id: '', name: 'Tự sáng tác' },
          ...res.data.authors,
        ]);
        const cate = await getCategories();
        setCategories([
          { _id: '', id: '', name: 'Chưa chọn' },
          ...cate?.data?.categories,
        ]);
      } catch (error) {}
      setLoading(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true);
    try {
      const res = await createNovel(
        name,
        description,
        author,
        category,
        photoImg,
        coverImg
      );
      if (res) {
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
        navigate('/up-load/my-novel');
      }
    } catch (error) {
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
    <div className="mx-auto mt-[2%] w-[96%]  rounded-lg p-8">
      <h1 className="text-xl font-medium">Thêm truyện</h1>
      <small className="pb-4">Viết nên câu truyện của riêng bạn!</small>
      <form className="p-8 bg-white mt-6" onSubmit={handleSubmit}>
        <div className="rounded-sm">
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
        <div className="pt-6 rounded-sm">
          <label htmlFor="floating_desc" className=" font-medium ">
            Mô tả
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="floating_desc"
            id="floating_desc"
            className="w-full mt-2 rounded-md"
            required
          />
        </div>
        <div className="flex">
          <div className="mt-6">
            <span className="font-medium">Tác giả </span>
            <AuthorCombobox people={authorList} setAuthor={setAuthor} />
          </div>
          <div className="mt-6 ml-10">
            <span className="font-medium">Thể loại </span>
            <CategoryCombobox people={categories} setCategory={setCategory} />
          </div>
        </div>

        <div className="pt-6">
          <div className="mb-2 block font-medium">
            <label htmlFor="photoImg">Ảnh photo</label>
          </div>
          <FileInput
            id="photoImg"
            onChange={(e) => setPhotoImg(e.target.files[0])}
          />
        </div>

        <div className="pt-6">
          <div className="mb-2 block font-medium">
            <label htmlFor="coverImg">Ảnh cover</label>
          </div>
          <FileInput
            id="coverImg"
            onChange={(e) => setCoverImg(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="mt-6 py-2 px-4 w-full bg-violet-600 text-white  rounded-lg relative"
        >
          Lưu
        </button>
      </form>
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Xin chờ trong vài giây 🧐</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <span>Thời gian chờ có thể lên tới 1 phút! </span>
                <span>Chỉ tắt thông báo này khi có lỗi xảy ra!</span>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};
