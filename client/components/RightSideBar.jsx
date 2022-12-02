import "./rightSideBar.css";
import {IoIosArrowDown} from "react-icons/io";
import { dummyUsers } from "../../dummyData";
import Online from "../online/OnlineUsers";
export default function RightSideBar({profile }) {
     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HomeRightbar = () => {
        return (
            <>
            <h4 className="rightBarTitle">Online Friends</h4>
            <ul className="rightBarFriendList">
               {dummyUsers.map(u=>(
                   <Online key={u.userId} user={u} />
               ))}
                 <li className="rightBarFriend">
                    <button className="viewOnlineFriendsBtn">view More</button>
                    <IoIosArrowDown />
                </li>
            </ul></>
        )
    }
    const ProfileRightbar = () => {
        return (
        <>
        <h4 className="userInformationTitle">
        User Information Title</h4>
        <div className="rightBarInformationContainer">
            <div className="rightBarInformationItem">
                <span className="rightBarInformationKey">City:</span>
                <span className="rightBarInformationKeyValue">Islamabad </span>
            </div>
            <div className="rightBarInformationItem">
                <span className="rightBarInformationKey">From:</span>
                <span className="rightBarInformationKeyValue">Pakistan </span>
            </div>
            <div className="rightBarInformationItem">
                <span className="rightBarInformationKey">Occupation:</span>
                <span className="rightBarInformationKeyValue">Software Engineer </span>
            </div>
            <div className="rightBarInformationItem">
                <span className="rightBarInformationKey">Frustrations:</span>
                <span className="rightBarInformationKeyValue">Suffering from depression, bipolar disorder and other disorders. </span>
            </div>
        </div>
        <h4 className="userInformationTitle">Following</h4>
        <div className="rightBarFollowingContainer">
                <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src={PF+"suggestion.jpg"} alt="" />
            <span className="rightBarFollowingName">Jolly Black</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src={PF+"suggestion.jpg"} alt="" />
            <span className="rightBarFollowingName">Jolly Black</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src={PF+"suggestion.jpg"} alt="" />
            <span className="rightBarFollowingName">Jolly Black</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src={PF+"suggestion.jpg"} alt="" />
            <span className="rightBarFollowingName">Jolly Black</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src={PF+"suggestion.jpg"} alt="" />
            <span className="rightBarFollowingName">Jolly Black</span>
            </div>
            </div>
            </>
            )
    }
    return (<div className="rightSideBar">
        <div className="rightSideBarWrapper">
            <HomeRightbar />
        </div></div>);
}