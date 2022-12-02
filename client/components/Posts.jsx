import "./posts.css";
import {BsCardImage, BsFillCaretRightFill, BsCamera, BsFillTagsFill} from "react-icons/bs";
import {GoLocation} from "react-icons/go";
import { useRef, useState, useContext } from "react";
import { UserContext } from "../../context/contextApi";
import axios from "axios";

export default function Post() {
const [user, setUser] = useContext(UserContext);
const desc = useRef();
const [file, setFile] = useState(null);
const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user[0].id,
      desc: desc.current.value
    }
    try {
      const res = await axios.get("/posts/createPost/"+user[0].id+"/"+desc.current.value);
      window.location.reload();
      console.log(res.data); 
    }
    catch (err) {
      console.log(err);
    }
}
return (
    
    <div className="postContainer">
        <div className="postWrapper">
            <form className="postTop" onSubmit={submitHandler}>
                <div className="contentInput">
                    <input placeholder="Share a photo, video or blog" className="postInput" ref={desc}></input>
                    <button className="postContentBtn" type="submit">Post</button>
                </div>
                <div className="divider">
                    <hr></hr>
                </div>
                <form className="shareOption">
                    <label htmlFor="file" className="postingOptionsButton">
                         <BsCardImage className="iconBadge"/>
                         <input style={{display: "none"}}
                          type="file" id="file" 
                          accept=".png, .jpeg, .jpg" 
                          onChange={(e)=>setFile(e.target.files[0])}
                         />
                    </label>
                  <button className="postingOptionsButton">
                         <BsFillCaretRightFill className="iconBadge"/>
                    </button>
                    <button className="postingOptionsButton">
                         <BsCamera className="iconBadge"/>
                    </button>
                    <button className="postingOptionsButton">
                         <BsFillTagsFill className="iconBadge"/>
                    </button>
                      <button className="postingOptionsButton">
                         <GoLocation className="iconBadge"/>
                    </button>
                </form>
            </form>
        </div>
    </div>
)
}