import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getNovelById } from '../../../services/api/translator/novel';
import { toast } from 'react-toastify';
import {
  getChapterByID,
  updateChapter,
} from '../../../services/api/translator/chapter';

const modules = {
  toolbar: [], // Pass an empty array to hide the toolbar
};
const styles = {
  height: '500px', // Đặt kích thước font chữ// Chiều cao 100% của màn hình  // Chiều rộng 100% của màn hình
};

export const UpdateChapter = () => {
  const [novel, setNovel] = useState({});
  const [chapter, setChapter] = useState({});
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myNovel = await getNovelById(param.nId);
        setNovel(myNovel.data.novel);
        const myChapter = await getChapterByID(param.cId);
        setName(myChapter.data.chapter.name);
        setContent(myChapter.data.chapter.content);
        setChapter(myChapter.data.chapter);
      } catch (error) {}
      setIsLoading(false);
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
    try {
      const res = await updateChapter(param.nId, param.cId, name, content);
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
        navigate('/up-load/my-novel/chapter-list/' + param.nId);
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
    <div className="mx-auto mt-[2%] w-[96%] rounded-lg p-8">
      <h1 className="text-xl font-medium">Truyện {novel.name}</h1>
      <small>Sửa chapter! </small>
      <small>
        Chapter số: {chapter.number} Tên: {chapter.name}
      </small>

      <div
        className="mt-6 gap-4 rounded-md w-full bg-white p-8"
        onSubmit={handleSubmit}
      >
        <form>
          <div>
            <label htmlFor="floating_name" className="font-medium">
              Tên chương
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
          <div>
            <ReactQuill
              className="pt-8 rounded-lg"
              modules={modules}
              style={styles}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>
          <button
            type="submit"
            className=" mt-16 py-2 px-4 w-full bg-violet-600 text-white  rounded-lg relative"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
