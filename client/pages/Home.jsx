import "./home.css";
import Feed from "../../components/feed/Feed"
import Header from "../../components/header/Header";
import LeftSideBar from "../../components/left/LeftSideBar";
import RightSideBar from "../../components/right/RightSideBar";

export default function Home() {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <LeftSideBar />
        <Feed />
        <RightSideBar />
      </div>
    </>
  );
}
