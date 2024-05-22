import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserList } from '../../../services/api/admin/getUserList';
import { MyPagination } from '../../MyPagination';
import { deleteUser } from '../../../services/api/admin/deleteUser';

export const SearchUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      
      const res = await getUserList( 
        `?firstName=${firstName}&lastName=${lastName}&fields=username,email,firstName,lastName,avatar&page=${currentPage}`
      );
      
      setUserList(res.data || []);
    } catch (error) {
      setUserList([]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserList(
          `?fields=username,email,firstName,lastName,avatar&page=${currentPage}`
        );
        console.log(res)
        setUserList(res.data || []);
      } catch (error) {
        setUserList([]);
      }
    };
    fetchData();
  }, [currentPage]);
  
 

  return (
    <div className="mx-auto mt-[2%] w-[96%] bg-white rounded-lg p-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2  w-full gap-4 pt-2">
          <div className="flex-col col-span-1">
            <div>
              <label htmlFor="floating_fistname" className="font-medium ">
                Họ
              </label>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="floating_fistname"
              id="floating_fistname"
              className="w-full mt-2 rounded-md"
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
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="floating_lastname"
              id="floating_lastname"
              className="w-full mt-2 rounded-md"
              required
            />
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            className="text-white w-full p-2 rounded-xl bg-red-500  hover:opacity-70 font-medium text-base  text-center"
          >
            Tìm
          </button>
        </div>
      </form>

      <div className="py-8">
        <div className="grid grid-cols-3 gap-4 py-4">
          {userList.map((user) => (
            <div
              key={user.id}
              className="w-full flex p-4 rounded-sm shadow-md justify-between"
            >
              <img
                src={user.avatar}
                alt=""
                className="h-[80px] w-[80px] rounded-full"
              />
              <div className="ml-2 grid content-between flex-1">
                <small className="text-gray-500 overflow-hidden truncate">
                  {'id: ' + user.id}
                </small>
                <h4 className="overflow-hidden truncate">
                  {'Name: ' + user.firstName + ' ' + user.lastName}
                </h4>
                <h4 className="overflow-hidden truncate">
                  {'Username: ' + user.username}
                </h4>
              </div>
              <div className="grid content-between pl-2">
                <Link
                  to={'/admin/search/' + user.id}
                  className="px-8 py-1 bg-yellow-400 hover:opacity-90 text-white rounded-lg"
                >
                  Sửa
                </Link>
                <button className="px-8 py-1 bg-red-500 hover:opacity-90 text-white rounded-lg">
                  Xóa
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
