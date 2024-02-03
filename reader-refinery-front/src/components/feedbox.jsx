import { Avatar,Button } from "@mui/material";
import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectUser } from "../feature/userSlice";

import '../styles/FeedBox.css';

function FeedBox() {
//   const user = useSelector(selectUser);
  const [isAsking, setIsAsking] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleAskQuestion = () => {
    setIsAsking(true);
    setIsAnswering(false);
    setIsPosting(false);
  };

  const handleAnswerQuestion = () => {
    setIsAsking(false);
    setIsAnswering(true);
    setIsPosting(false);
  };

  const handlePostContent = () => {
    setIsAsking(false);
    setIsAnswering(false);
    setIsPosting(true);
  };

  return (
    <div className="feedBox">
      <div className="feedBox__info">
        <Avatar  />
      </div>
      {isAsking && <AskQuestionComponent />}
      {isAnswering && <AnswerComponent />}
      {isPosting && <PostComponent />}
      {!isAsking && !isAnswering && !isPosting && (
        <>
        <div className="feedBox__feed">
          <input
            type="text"
            // value={questionOrLink}
            // onChange={handleInputChange}
            placeholder="What is your question or link?"
          />
        </div>
        <div className="qHeader__Rem">
          <Button  onClick={handleAskQuestion}>Ask a Question</Button>
          <Button onClick={handleAnswerQuestion}>Answer</Button>
          <Button onClick={handlePostContent}>Post</Button>
        </div>
      </>
      )}
    </div>
  );
}

// Additional components for "Ask a Question," "Answer," and "Post"
function AskQuestionComponent() {
  return <div>Ask a Question Component</div>;
}

function AnswerComponent() {
  return <div>Answer Component</div>;
}

function PostComponent() {
  return <div>Post Component</div>;
}

export default FeedBox;
