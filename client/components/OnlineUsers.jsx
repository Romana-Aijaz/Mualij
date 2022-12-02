import "./onlineUsers.css";
export default function Online({user}) {
     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
          <li className="rightBarFriend">
                    <div className="rightBarProfileImgContainer">
                        <img className="rightBarProfileImg" src={"http://localhost:3000/assets/"+user.profilePic} alt="" />
                        <span className="rightBarOnline"></span>
                    </div>
            <span className="rightBarUsername">{user.username}</span>
                </li>
    )
}