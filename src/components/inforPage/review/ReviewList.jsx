import { Rating } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { getReviewList, updateReview } from '../../../services/apiServices';
import { useSelector } from 'react-redux';
import ava from '../../../assets/dfAvaUser.jpg';
import moment from 'moment';
export const ReviewList = (props) => {
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const [modelContent, setModelContent] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const username = useSelector((state) => state.user.account.username);
  const handleSubmitFrom = async (e) => {
    e.preventDefault();
    try {
      if (modelContent?.id) {
        const res = await updateReview(
          modelContent?.novel,
          modelContent?.id,
          score,
          content
        );
        props.setReviews([]);
        setOpenModal(false);
        setModelContent({});
        setScore(0);
        setContent('');
      }
    } catch (error) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      if (props?.novel) {
        try {
          const res = await getReviewList(props?.novel);
          props.setReviews(res?.data?.reviewList);
        } catch (error) {}
      }
    };
    fetchData();
  }, [props?.reviews.length]);
  return (
    <div>
      {props?.reviews.map((review) => (
        <article
          key={review.id}
          className="p-6 my-4 text-base bg-white rounded-lg"
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={review?.user?.avatar ? review?.user?.avatar : ava}
                  alt={review?.user?.username}
                />
                {review?.user?.firstName
                  ? review?.user?.firstName + ' ' + review?.user?.lastName
                  : 'Người dùng TruyenNe'}
              </p>
              <p className="text-sm text-gray-600">
                <time>
                  {moment(new Date(review.createTime)).format('YYYY-MM-DD')}
                </time>
              </p>
            </div>
            {username === review.user.username && (
              <button
                onClick={() => {
                  setScore(review?.rate);
                  setContent(review?.content);
                  setModelContent(review);
                  setOpenModal(true);
                }}
                className="inline-flex items-center p-2 border-2 border-yellow-500 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <FaEdit className="text-yellow-500"></FaEdit>
              </button>
            )}
          </footer>
          <p className="text-gray-500">{review?.content}</p>
          <div className="flex items-center mt-4 space-x-4">
            <Rating className="pb-4 ">
              {[1, 2, 3, 4, 5].map((el) => (
                <Rating.Star
                  key={el}
                  filled={review?.rate >= el ? true : false}
                ></Rating.Star>
              ))}
            </Rating>
          </div>
        </article>
      ))}
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Sửa Review</Modal.Header>
          <Modal.Body>
            <form className="mb-6 w-full" onSubmit={handleSubmitFrom}>
              <Rating className="pb-4 " size="lg">
                {[1, 2, 3, 4, 5].map((el) => (
                  <Rating.Star
                    key={el}
                    onClick={() => {
                      setScore(el);
                    }}
                    filled={score >= el ? true : false}
                  ></Rating.Star>
                ))}
              </Rating>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
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
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-yellow-500 rounded-lg focus:ring-4 focus:ring-primary-200 "
              >
                Sửa
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};
