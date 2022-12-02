import { useEffect } from "react";
import { useState } from "react";
import "./feed.css";
import Post from "../post/Posts";
import Timeline from "../timeline/Timeline";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/contextApi";

export default function Feed({username}) {
    const [user, setUser] = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        try{
        const fetchPosts = async () => {
        const res = username
        ? await axios.get("/posts/profile/" +username)
        : await axios.get("/posts/timeline/"+user[0].id);
        setPosts(res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));}
      fetchPosts();
    } catch (err) {
        console.log(err);
    };
    }, [username, user[0].id])
    return <div className="feedContainer">
    <div className="feedWrapper">
        <Post />
       {posts.map((p)=> (
           <Timeline key={p._id} post={p} />
       ))}
        </div></div>
}