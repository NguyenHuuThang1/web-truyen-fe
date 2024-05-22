import React from 'react';

export const AdminRule = () => {
  return (
    <div className="mx-auto mt-[2%] w-[96%] bg-white rounded-lg p-8">
      <h3 className="text-xl">Luật dành cho Admin</h3>
      <ul className="pt-8 list-[circle] pl-8">
        <li>
          <a href="#">Quy định về thêm mới và chỉnh sửa tác giả!</a>
        </li>
        <li>
          <a href="#">Quy địnhk về thêm mới dịch giả!</a>
        </li>
        <li>
          <a href="#">Quy định về kiểm duyệt nội dung!</a>
        </li>
        <li>
          <a href="#">Bộ quy tắc ứng xử trước người dùng!</a>
        </li>
        <li>
          <a href="#">Tuyệt đối không xoá người dùng!</a>
        </li>
      </ul>
    </div>
  );
};
