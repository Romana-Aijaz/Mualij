import { useRef, useContext } from "react";
import "./login.css";
//import {UserContext} from "../../context/contextApi";
import { UserContext } from "../../context/contextApi";
import axios from "axios";

 export default function Login() {
     const [user, setUser] = useContext(UserContext);
     const username = useRef();
     const password = useRef();
     const handleClick = async (e) => {
         e.preventDefault();
         const user_name = username.current.value;
         const pass = password.current.value;
         try {
         const res = await axios.get("/users/login/"+user_name+"/"+pass);
         console.log(res.status);
         if (res.status === 200) {
         setUser([{id: res.data._id,
         name: res.data.username,
         emailId: res.data.email,
         age: res.data.age,
         city: res.data.city,
         occupation: res.data.occupation,
         profilePic: res.data.profilePicture,
         coverPic: res.data.coverPicture,
         disorder: res.data.disorder,
        followers: res.data.followers
        }]); } 
        localStorage.setItem('user', res.data);
        const loggedInUser = localStorage.getItem("user");
        console.log(loggedInUser[0]);
    }
        catch (err) {
            alert("User Not Found!!")
        }
     }
     return (
         <div className="loginContainer">
             <div className="loginWrapper">
                 <div className="loginLeft">
                     <h3 className="loginLogo">Mualij</h3>
                     <span className="loginDesc">Description here!</span>
                 </div>
                 <div className="loginRight">
                     <form className="loginBox" onSubmit={handleClick}> 
                         <input type="text" className="loginInput" placeholder="Username" name="username" required ref={username}/>
                         <input placeholder="Password" type="password" className="loginInput" name="password" required minLength="6" ref={password}/>
                         <button className="loginButton">Log In</button>
                         <span className="loginForgot">Forgot Password?</span>
                         <button className="loginRegisterButton">Create a New Account</button>
                     </form>
                 </div>
             </div>
         </div> ) 
 }