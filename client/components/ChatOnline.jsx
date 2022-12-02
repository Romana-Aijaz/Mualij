import "./chatOnline.css";

export default function ChatOnline() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                     <img className="chatOnlineImg" src={"http://localhost:3000/assets/coverPic.png"} alt="" />
                  <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">ishaaa</span>
            </div>
        </div>
    )
}
