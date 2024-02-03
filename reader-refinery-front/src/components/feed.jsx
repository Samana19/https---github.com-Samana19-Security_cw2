import React, { useEffect, useState } from "react";
import FeedBox from "./feedbox";
// import "./css/Feed.css";
// import Post from "./Post";
import '../styles/Feed.css';
import axios from "axios";
import Post from "./post";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="feed">
      <h1>Feed</h1>

      <FeedBox />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {/* <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  );
}

export default Feed;
