import "./header.css";
import {GoBell, GoPerson, GoSearch} from "react-icons/go";
import {HiAnnotation} from "react-icons/hi";
import {AiFillHome} from "react-icons/ai";
import {BiMenu} from "react-icons/bi";
import { Link } from "react-router-dom";
export default function Header() {
  return <div className="headerContainer">
  <div className="headerLeft">
    < Link to="/" style={{textDecoration: "none"}}>
       <div className="logo">Mualij</div>
    </Link>
  </div>
   <div className="headerCentre">
     <div className="searchBar">
<GoSearch className="searchIcon"/>
       <input placeholder="Search" className="searchInput" />
     </div>
   </div>
    <div className="headerRight">
      <div className="headerIcons">
        <div className="headerIconItem">
          <Link to="/" style={{textDecoration: "none"}}>
            <AiFillHome className="homeIcon"/>
          </Link>
        </div>
        <div className="headerIconItem">
          <GoPerson className="personIcon"/>
          <span className="headerIconBadge">1</span>
        </div>
        <div className="headerIconItem">
          <GoBell className="notificationIcon"/>
          <span className="headerIconBadge">4</span>
        </div>
        <div className="headerIconItem">
          <Link to="/messenger">
            <HiAnnotation className="messengerIcon"/>
          </Link>
          <span className="headerIconBadge">1</span>
        </div>
        <div className="headerIconItem">
          <BiMenu className="menuIcon"/>
        </div>
      </div>
    </div>
  </div>;
}