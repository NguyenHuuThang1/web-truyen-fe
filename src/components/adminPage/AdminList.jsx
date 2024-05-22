import React, { useEffect, useState } from 'react';
import { getUserList } from '../../services/api/admin/getUserList';
import { MyPagination } from '../MyPagination';

export const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserList(
          '?role=admin&fields=username,email,firstName,lastName,avatar&page=' +
            currentPage
        );
        setAdminList(res.data || []);
      } catch (error) {
        setAdminList([]);
      }
    };
    fetchData();
  }, [currentPage]);
  return (
    <div className="mx-auto mt-[2%] w-[96%] bg-white rounded-lg p-8">
      <h3 className="text-xl font-medium mb-3">Danh sách ADMIN</h3>
      <div className="grid grid-cols-3 gap-4 py-4">
        {adminList.map((admin) => (
          <div key={admin.id} className="w-full flex p-4 rounded-sm shadow-md ">
            <img
              src={admin.avatar}
              alt=""
              className="h-[80px] w-[80px] rounded-full"
            />
            <div className="ml-2 grid content-between flex-1">
              <small className="text-gray-500 overflow-hidden truncate">
                {'id: ' + admin.id}
              </small>
              <h4 className="overflow-hidden truncate">
                {'Name: ' + admin.firstName + ' ' + admin.lastName}
              </h4>
              <h4 className="overflow-hidden truncate">
                {'Username: ' + admin.username}
              </h4>
            </div>
          </div>
        ))}
      </div>
      <MyPagination setPage={setCurrentPage} page={currentPage} />
    </div>
  );
};
