import "./message.css";
import { format } from "timeago.js";
import { useContext } from "react";
import { UserContext } from "../../context/contextApi";

export default function Message({message, own }) {
    const [user, setUser] = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src={"http://localhost:3000/assets/"+user[0].profilePic} alt="" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}