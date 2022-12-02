import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./context/contextApi";
import Messenger from "./pages/messenger/Messenger";
import Payment from "./pages/payment/Payment";

function App() {
  const [user, setUser] = useContext(UserContext);
  console.log(
    "From app " +
      user[0].name +
      " " +
      user[0].id +
      " " +
      user[0].emailId +
      " " +
      user[0].occupation +
      " " +
      user[0].profilePic +
      " " +
      user[0].coverPic +
      " " +
      user[0].disorder +
      " " +
      user[0].followers.length
  );

  return (
    <Router>
      <Routes>
      <Route path="/" element={ <Home/> }></Route>
      <Route path="/profile/:username" element={ <Profile/> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/messenger" element={ <Messenger/> } />
      <Route path="/payment" element={ <Payment/> } />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
