import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
// import { FaHome, FaInfoCircle, FaClipboardList } from 'react-icons/fa';
import '../styles/UserNavbar.css';
import { Avatar, Button,Input } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import '../styles/UserNavbar.css';

import {
  AssignmentTurnedInOutlined,
  Close,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore,
} from "@mui/icons-material"; 

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">Welcome User!</a>
        </div>

        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
        </div>

        <div className="qHeader__input">
        <Search />
          <input type="text" placeholder="Search questions" />

        <div className="search-bar">
        <button type="button" className="search-button">
          Search
        </button>
      </div>
      </div>
        
        {/* <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#section1">
                <FaHome /> Home
              </a>
            </li>
            <li>
              <a href="#section2">
                <FaInfoCircle /> About
              </a>
            </li>
            <li>
              <a href="#section3">
                <FaClipboardList /> Services
              </a>
            </li>
            
            <li>
            <div className="search-bar">
        <input type="text" placeholder="Search" className="search-input" />

      </div>
            </li>

            <li>
            <div className="search-bar">
        <button type="button" className="search-button">
          Search
        </button>
      </div>
            </li>
          </ul>
        </div> */}
       
        {/* <div className="navbar-end">
          <a className="btn" href="#contact">
            Create Post
          </a>
          
        </div> */}
         <div className="qHeader__Rem">
          <span >
            
          </span>

          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Modal
  open={isModalOpen}
  closeIcon={<Close />}
  onClose={() => setIsModalOpen(false)}
  closeOnEsc
  center
  closeOnOverlayClick={false}
  styles={{
    overlay: {
      height: "auto",
    },
  }}
>
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar  className="avatar" />
              <div className="modal__scope">
                
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: inclue a link that gives context"
                />
                {/* {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )} */}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button  type="submit" className="add">
                Add Question
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
