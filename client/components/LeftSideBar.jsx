import "./leftSideBar.css";
import {MdRssFeed, MdVideoLibrary} from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";
import {FaPeopleArrows} from "react-icons/fa";
import {RiUserFollowFill} from "react-icons/ri";
import {VscSaveAll} from "react-icons/vsc";
import {BsFillBookmarkFill, BsChatRightTextFill} from "react-icons/bs";
import {IoIosArrowForward} from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {MdPayments} from "react-icons/md";
import { UserContext } from "../../context/contextApi";

export default function LeftSideBar() {
    const [user, setUser] = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return <div className="leftSideBar">
        <div className="leftSideBarWrapper1">
        <img src={"http://localhost:3000/assets/"+user[0].coverPic} alt="" className="coverPageImage"/>
        <img src={"http://localhost:3000/assets/"+user[0].profilePic} alt="" className="profileImage"/>
        <div className="userNameContainer">
            < Link to={"/profile/"+user[0].name} style={{textDecoration: "none"}}>
        <text className="userName">{user[0].name}</text>
    </Link>
        </div>
        <div className="aboutContainer">
            <text className="aboutInformation">
                  {user[0].occupation}. Suffering from {user[0].disorder}
            </text>       
        </div>
        <div>
            <hr className="solid"></hr>
        </div>
        <div className="aboutMiddleContainer">
        <div className="viewsInformationContainer">
            <text className="viewsInformation">5</text></div>
        <div className="aboutContainer">
            <text className="aboutInformation">Profile views</text>
        </div>
        </div>
         <div>
            <hr className="solid"></hr>
        </div>
        <div className="aboutMiddleContainer">
        <div className="viewsInformationContainer">
            <text className="followersInformation" >{user[0].followers.length}</text></div>
        <div className="aboutContainer">
            <text className="aboutInformation">Followers</text>
        </div>
        </div>
        </div>
        <div className="leftSideBarWrapper2">
            <ul className="leftSideBarList">
                <li className="leftSideBarListHeading">Explore</li>
                <li className="leftSideBarListItem">
                    <MdRssFeed className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Feed</span>
                </li>
                <li className="leftSideBarListItem">
                    <HiUserGroup className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Groups</span>
                </li>
                <li className="leftSideBarListItem">
                    <FaPeopleArrows className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Sessions</span>
                </li>
                <li className="leftSideBarListItem">
                    <RiUserFollowFill className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Followers</span>
                </li>
                <li className="leftSideBarListItem">
                    <VscSaveAll className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Saved</span>
                </li>
                 <li className="leftSideBarListItem">
                    <BsFillBookmarkFill className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Bookmarks</span>
                </li>
                <li className="leftSideBarListItem">
                    <BsChatRightTextFill className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Chats</span>
                </li>
                <li className="leftSideBarListItem">
                    <MdVideoLibrary className="leftSideBarListIcon"/>
                    <span className="leftSideBarListText">Videos</span>
                </li>
                <li className="leftSideBarListItem">
                    <MdPayments className="leftSideBarListIcon"/>
                    <Link to="/payment"  style={{textDecoration: "none"}}>
                        <span className="leftSideBarListText">Payment</span>
                    </Link>
                </li>
                <li><button className="leftSideBarButton">Explore More <IoIosArrowForward className="leftSideBarListIconNext"/></button></li>
            </ul>
        </div>
    </div>
}