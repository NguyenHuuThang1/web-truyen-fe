import { FileInput, Spinner, Modal, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import AuthorCombobox from './novel/AuthorCombobox';
import CategoryCombobox from './novel/CategoryCombobox';
import StatusNovel from './novel/StatusNovel';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllAuthor } from '../../services/api/admin/author';
import { getCategories } from '../../services/apiServices';
import { getNovelById, updateNovel } from '../../services/api/translator/novel';
import { toast } from 'react-toastify';

export const UpdateNovel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [photoPre, setPhotoPre] = useState('');
  const [coverImgPre, setCoverImgPre] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [author, setAuthor] = useState('');
  const [authorList, setAuthorList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photoImg, setPhotoImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const navigate = useNavigate();
  const param = useParams();
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
        const myNovel = await getNovelById(param.nId);

        setName(myNovel.data.novel.name);
        setDescription(myNovel.data.novel.description);
        setPhotoPre(myNovel.data.novel.photo);
        setCoverImgPre(myNovel.data.novel.coverImg);
        setStatus(myNovel.data.novel.status === 'Chưa hoàn thành' ? 0 : 1);
      } catch (error) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const handleChangePhoto = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoImg(e.target.files[0]);
      setPhotoPre(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleChangeCover = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImg(e.target.files[0]);
      setCoverImgPre(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true);
    try {
      const res = await updateNovel(
        param.nId,
        name,
        description,
        author,
        category,
        photoImg,
        coverImg,
        status
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
    <div className="mx-auto mt-[2%] w-[96%]  rounded-lg p-8">
      <h1 className="text-xl font-medium">Tên truyện của bạn</h1>
      <small className="pb-4">Cập nhật truyện của bạn!</small>
      <form className="p-8 bg-white mt-6 " onSubmit={handleSubmit}>
        <div
          className="relative w-full h-[300px] bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${coverImgPre})` }}
        >
          <img
            src={photoPre}
            alt=""
            className="absolute h-[120px] w-[90px] top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2 shadow-2xl"
          />
        </div>
        <div className=" mt-6">
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
          <div className="mt-6 ml-10">
            <span className="font-medium">Trạng thái </span>
            <StatusNovel setStatus={setStatus} status={status} />
          </div>
        </div>

        <div className="pt-6">
          <div className="mb-2 block font-medium">
            <label htmlFor="photoImg">Ảnh photo</label>
          </div>
          <FileInput id="photoImg" onChange={handleChangePhoto} />
        </div>

        <div className="pt-6">
          <div className="mb-2 block font-medium">
            <label htmlFor="coverImg">Ảnh cover</label>
          </div>
          <FileInput id="coverImg" onChange={handleChangeCover} />
        </div>
        <button
          type="submit"
          className="mt-6 py-2 px-4 w-full bg-violet-600 text-white  rounded-lg relative"
        >
          Lưu
        </button>
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
      </form>
    </div>
  );
};
