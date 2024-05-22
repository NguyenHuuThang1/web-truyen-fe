import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { MyPagination } from '../../MyPagination';
import removeAccents from '../../../utils/removeAccents';
import { getAllAuthor, getAuthor } from '../../../services/api/admin/author';

export const Author = () => {
  const [authorList, setAuthorList] = useState([]);
  const [slug, setSlug] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await getAuthor(`?page=${currentPage}`);
        console.log(res.data);
        setAuthorList(res?.data?.author || []);
      } catch (error) {
        setAuthorList([]);
      }
    };
    fetchData();
  }, [currentPage]);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const q = { slug: { $regex: slug } };
      const res = await getAuthor(
        `?q=${JSON.stringify(q)}&page=${currentPage}`
      );
      setAuthorList(res?.data?.author || []);
    } catch (error) {
      setAuthorList([]);
    }
  };
  return (
    <div className="mx-auto mt-[2%] w-[96%] bg-white rounded-lg p-8">
      <Link to={'/admin/author/add-new'}>
        <button className="fixed p-6 bg-red-600 bottom-10 right-10 rounded-full shadow-2xl shadow-red-800 hover:">
          <IoMdAdd className="text-2xl text-white" />
        </button>
      </Link>
      <form onSubmit={handleSearch}>
        <div className="flex-col">
          <div>
            <label htmlFor="floating_slug" className="pl-2 font-medium ">
              Tên tác giả
            </label>
          </div>
          <input
            onChange={(e) =>
              setSlug(
                removeAccents(e.target.value.toLowerCase().split(' ').join('-'))
              )
            }
            type="text"
            name="floating_slug"
            id="floating_slug"
            className="w-full mt-2 rounded-md"
            required
          />
        </div>

        <div className="flex  justify-center pt-8">
          <button
            type="submit"
            className="text-white w-full p-2 rounded-xl bg-red-500  hover:opacity-70 font-medium text-base  text-center"
          >
            Tìm
          </button>
        </div>
      </form>

      <div className="py-8">
        <div className="grid grid-cols-1 gap-4 py-4">
          {authorList.map((author) => (
            <div
              key={author.id}
              className="w-full flex p-4 rounded-sm shadow-md justify-between"
            >
              <div className="ml-2 grid flex-1">
                <small className="text-gray-500 overflow-hidden truncate">
                  {'id: ' + author.id}
                </small>
                <h4 className="overflow-hidden truncate">
                  {'Tên: ' + author.name}
                </h4>
              </div>
              <div className="grid content-between pl-2">
                <Link
                  to={'/admin/author/' + author.id}
                  className="px-8 py-1 bg-yellow-400 hover:opacity-90 text-white rounded-lg mb-2"
                >
                  Sửa 
                </Link>
                <button className="px-8 py-1 bg-red-500 hover:opacity-90 text-white rounded-lg">
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
        <MyPagination setPage={setCurrentPage} page={currentPage} />
      </div>
    </div>
  );
};
