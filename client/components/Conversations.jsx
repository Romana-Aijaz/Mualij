import axios from "axios";
import { useEffect } from "react";
import { useState} from "react";
import "./conversations.css";

export default function Conversations({conversation, currentUser}) {
    const [userName, setUserName] = useState("");
    const [userDp, setUserDp] = useState("");
    console.log(currentUser[0].name)
        
    useEffect(()=>{
         const friendId = conversation.members.find((m) => m !== currentUser[0].id);
        const getUser = async () => {
            try{
            const res = await axios.get("/users/"+friendId);
            setUserName(res.data.username);
            setUserDp(res.data.profilePicture);
            
        }
            catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation, userName]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="conversation">
              <img className="conversationImg" src={userDp? "http://localhost:3000/assets/"+userDp : "http://localhost:3000/assets/profilePic.jpg"} alt="" />
              <span className="conversationName">{userName? userName : "John"}</span>
        </div>
    )
}