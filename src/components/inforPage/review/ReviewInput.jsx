import { Rating } from 'flowbite-react';
import React, { useState } from 'react';
import { createReview } from '../../../services/apiServices';

export const ReviewInput = (props) => {
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const handleSubmitFrom = async (e) => {
    e.preventDefault();
    try {
      if (props?.novel) {
        const res = await createReview(props?.novel, score, content);
        props.setReviews([res?.data?.review, ...props.reviews]);
        setScore(0);
        setContent('');
      }
    } catch (error) {}
  };
  return (
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
        Đánh giá
      </button>
    </form>
  );
};
