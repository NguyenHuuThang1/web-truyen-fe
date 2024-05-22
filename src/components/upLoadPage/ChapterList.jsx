import { Spinner, Modal, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEditSquare } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { getNovelById } from '../../services/api/translator/novel';
import getChapterList from '../../services/api/getChapterList';
import { IoMdAdd } from 'react-icons/io';
import moment from 'moment';
export const ChapterList = () => {
  const [novel, setNovel] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chapterList, setChapterList] = useState([]);
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myNovel = await getNovelById(param.nId);
        setNovel(myNovel.data.novel);
        const res = await getChapterList(param.nId);
        setChapterList(res.data.chapterList || []);
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
  return (
    <div className="mx-auto mt-[2%] w-[96%]  rounded-lg p-8">
      {novel.status ==="Chưa hoàn thành" && <Link to={'/up-load/my-novel/add-chapter/' + param.nId}>
        <button className="absolute p-6 bg-violet-600 bottom-10 right-10 rounded-full shadow-2xl shadow-violet-800 hover:">
          <IoMdAdd className="text-2xl text-white" />
        </button>
      </Link>}
      <h1 className="text-xl font-medium">Tên truyện: {novel.name}</h1>
      <small className="pb-4">Danh sách chương!</small>
      <div className="rounded-md mt-4 bg-white w-full p-4">
        <div className="relative truncate">
          <table className="table-fixed w-full text-left rtl:text-right text-base ">
            <tbody className="px-4">
              {chapterList.length === 0 && <span>Chưa có chương nào</span>}
              {chapterList.map((el, index) => (
                <tr
                  key={el.id}
                  className="w-full grid grid-cols-12 gap-6 py-2 hover:bg-be px-2"
                >
                  <th key={1} className="col-span-1">
                    <h5 className="font-light truncate">{index + 1}</h5>
                  </th>
                  <th key={2} className="col-span-6">
                    <h5 className="truncate">
                      {'Chương ' + el.number + ': ' + el.name}
                    </h5>
                  </th>
                  <th key={3} className="col-span-3">
                    <h5 className="truncate font-light">
                      {moment(new Date(el.createTime)).format('YYYY-MM-DD')}
                    </h5>
                  </th>
                  {novel.status ==="Chưa hoàn thành"  && <><th key={4} className="col-span-1">
                    <Link to={'/up-load/my-novel/update-chapter/' +param.nId+'/'+ el.id}>
                      <button>
                        <MdEditSquare className="text-green-600" />
                      </button>
                    </Link>
                  </th>
                  <th key={5} className="col-span-1">
                    <button onClick={(e) => setOpenModal(true)}>
                      <MdDelete className="text-red-600"></MdDelete>
                    </button>
                  </th></>}
                </tr>
              ))}
            </tbody>
          </table>
          <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header className="bg-red-500">
                <span className="text-white">Xoá Chương</span>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Chức năng xoá chương có thể gây ảnh hưởng lớn tới dữ liệu
                    truyện! Bạn nên sửa chương truyện muốn xoá, còn nếu thực sự
                    muốn xoá chương hãy liên hệ với admin!😢
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button>Xoá</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Huỷ
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};
