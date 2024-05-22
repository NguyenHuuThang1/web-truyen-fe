import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import ava from '../../assets/dfAvaUser.jpg';
import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../../services/apiServices';

export const Comment = (props) => {
  const theme = useSelector((state) => state.readingSetting.theme);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [content, setContent] = useState('');
  const username = useSelector((state) => state.user.account.username);
  const handleDeleteBtn = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteComment(props.comment.id);
      props.setCommentList(
        props.commentList.filter((el) => el.id !== props.comment.id)
      );
    } catch (error) {}
    setOpenModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateComment(props.comment.id, content);
      props.setCommentList(
        props.commentList.filter((el) => el.id !== props.comment.id)
      );
    } catch (error) {}
  };
  return (
    <>
      <article
        className={`mt-6 p-6 text-base bg-white rounded-lg dark:bg-gray-900`}
      >
        {/* Article Footer */}
        <footer className="flex justify-between items-center mb-2">
          {/* Author Info */}
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={props.comment.user.avatar || ava}
                alt={props.comment.user.username}
              />
              {props?.comment.user.firstName +
                ' ' +
                props?.comment.user.lastName || 'user'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time>
                {moment(new Date(props.comment.createTime)).format(
                  'YYYY-MM-DD'
                )}
              </time>
            </p>
          </div>
          {/**/}
          <div>
            {username === props.comment?.user?.username && (
              <>
                <button
                  onClick={() => {
                    setContent(props.comment.content);
                    setOpenModalEdit(true);
                  }}
                  className="inline-flex items-center p-2 border-2 border-yellow-500 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <FaEdit className="text-yellow-500"></FaEdit>
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="ml-4 inline-flex items-center p-2 border-2 border-red-500 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <FaDeleteLeft className="text-red-500"></FaDeleteLeft>
                </button>
              </>
            )}
          </div>
          {/* Dropdown menu */}
        </footer>
        {/* Comment Content */}
        <p className="text-gray-500 dark:text-gray-400">
          {props.comment.content}
        </p>
      </article>
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Xoá comment</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Bạn có chắc xoá không?
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
        <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
          <form className={`w-full ${theme} relative`} onSubmit={handleSubmit}>
            <div className="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <textarea
                id="comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="absolute bottom-3 right-3 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-300 dark:bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Sửa
            </button>
          </form>
        </Modal>
      </>
    </>
  );
};
