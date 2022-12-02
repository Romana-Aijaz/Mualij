import "./profile.css";
import Feed from "../../components/feed/Feed";
import Header from "../../components/header/Header";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/contextApi";
import axios from "axios";
import { useState } from "react";

export default function Profile() {
    const [user, setUser] = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    
    useEffect(()=>{
        const getFirends = async () => {
            try {
              const friendList = await axios.get("/users/friends/"+user[0].id);
              setFriends(friendList.data);
            }
            catch (err) {
              console.log(err);
            }
        };
        getFirends();
    }, [user[0].id])

   return  <>
      <Header />
      <div className="profile">
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className="coverProfilePic"src={"http://localhost:3000/assets/"+user[0].coverPic} alt="" />
            <img className="profileUserPic" src={"http://localhost:3000/assets/"+user[0].profilePic} alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user[0].name}</h4>
                    <span className="profileInfoDesc">Heyy!! it's {user[0].name}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed />
               <div className="rightSideBar">
        <div className="rightSideBarWrapper">
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
                <span className="rightBarInformationKeyValue">{user[0].occupation}</span>
            </div>
            <div className="rightBarInformationItem">
                <span className="rightBarInformationKey">Disorder:</span>
                <span className="rightBarInformationKeyValue">{user[0].disorder}</span>
            </div>
        </div>
        <h4 className="userInformationTitle">Following</h4>
        <div className="rightBarFollowingContainer">
            {friends.map((friend) => (
                <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src={"http://localhost:3000/assets/"+friend.profilePicture} alt="" />
            <span className="rightBarFollowingName">{friend.username}</span>
            </div>
            
            ))}
        </div>
        </div></div>
                    
            </div>
        </div>
      </div>
    </>
}