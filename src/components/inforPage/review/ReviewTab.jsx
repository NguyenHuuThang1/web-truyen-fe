import React, { useState } from 'react';
import { ReviewInput } from './ReviewInput';
import { ReviewList } from './ReviewList';

export const ReviewTab = (props) => {
  const [reviews, setReviews] = useState([]);
  return (
    <div className="w-full">
      <ReviewInput
        novel={props.novel}
        reviews={reviews}
        setReviews={setReviews}
      ></ReviewInput>
      <ReviewList
        novel={props.novel}
        reviews={reviews}
        setReviews={setReviews}
      />
    </div>
  );
};
