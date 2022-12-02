import "./timeline.css";
import {FcLike, FcComments} from "react-icons/fc";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import { UserContext } from "../../context/contextApi";
import React from 'react';
import { format } from "timeago.js";

export default function Timeline({post}) {

    const [user, setUser] = useContext(UserContext);

    const [like, setLike] =useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [userData, setUserData] = useState({});
    const post_userId = post.userId;
    const profileLink = "/profile/"+userData.username;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=> {
        setIsLiked(post.likes.includes(user[0].id))
    }, [user[0].id, post.likes]);

     useEffect(()=>{
        try{
        const fetchUser = async () => {
        const res = await axios.get('/users/'+post_userId);
        setUserData(res.data);
        console.log(res.data);}
      fetchUser();
    } catch (err) {
        console.log(err);
    };
    }, [post_userId])

    const updateLikes = async () => {
        try {
            const res = await axios.get("/posts/like/"+post._id+"/"+user[0].id);
            console.log(post._id);
            console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }
        var increaseLikes = like;
        if (isLiked === false) {
        increaseLikes = increaseLikes + 1;
        setLike(increaseLikes);
        setIsLiked(true);
        }
        else if (isLiked === true) {
        increaseLikes = increaseLikes - 1;
        setLike(increaseLikes);
        setIsLiked(false);
        }
    }
    return (<div className="timelineContainer">
        <div className="timelineWrapper">
            <div className="timelineTop"> 
            <div className="topLeft">
                
                
                     <img className="postProfilePic"src={"http://localhost:3000/assets/"+userData.profilePicture} alt="" />
              
               
            <span className="timelineUsername">{userData.username}</span>
            <span className="timelinePostDate">{format(post.createdAt)}</span>
            </div>
            </div>
            <div className="timelineCenter"> 
            <span className="timelineText">{post?.desc}</span>
            <img className="timelineImage" src={"http://localhost:3000/assets/"+post.img} alt="" />
            </div>
            <div className="timelineBottom"> 
            <button className="likeButton">
                < FcLike onClick={updateLikes}/>
            </button>
            <div className="noOfLikes">
               <span>{like} people like it</span> 
            </div>
            <button className="commentButton">
                < FcComments/>
            </button>
            </div>
        </div>
    </div>
    )
}