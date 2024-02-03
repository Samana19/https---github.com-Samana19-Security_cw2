import React from 'react';
import '../styles/PostReview.css';

const PostReview = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="heading">
          <h1>Review</h1>
        </div>
        <div className="review-box">
          <textarea placeholder="Add your review here..."></textarea>
        </div>
      </div>
    </div>
  );
}

export default PostReview;
