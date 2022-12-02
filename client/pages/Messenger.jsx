import "./messenger.css"
import Header from "../../components/header/Header";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chat/ChatOnline";
import {useContext, useState, useEffect} from 'react';
import { UserContext } from "../../context/contextApi";
import axios from "axios";
import { useRef } from "react";

export default function Messenger() {
     const [user, setUser] = useContext(UserContext);
     const [conversations, setConversations] = useState([]);
     const [currentChat, setCurrentChat] = useState(null);
     const [messages, setMessages] = useState([]);
     const [newMessage, setNewMessage] = useState("");
     const scrollRef = useRef()
     
     useEffect(() => {
         const getConversations = async() => {
             try {
                const res = await axios.get("/conversations/"+user[0].id);
                setConversations(res.data);
             }
             catch (err) {
                 console.log(err);
             }
         }
         getConversations();
     }, [user[0].id]);

     useEffect(() => {
         const getMessages = async() => {
             try {
                const res = await axios.get("/messages/getConvo/"+currentChat._id);
                setMessages(res.data);
             }
             catch (err) {
                console.log(err);
             }
         };
         getMessages();
     }, [currentChat]);

     
    const handleSubmit = async (e) => {
       e.preventDefault();
       const message = {
           sender: user[0].id,
           text: newMessage,
           conversationId: currentChat._id
       }
       try {
         const res = await axios.get("/messages/"+message.conversationId+"/"+message.sender+"/"+message.text);
         setMessages([...messages, res.data]);
         setNewMessage("");
        }
       catch (err) {
         console.log(err);
       }
    }
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])
    return (
        <>
        <Header />
        <div className="messenger">
           <div className="chatMenu">
               <div className="chatMenuWrapper">
                   <input placeholder="Search for friends" className="chatMenuInput" />
                      {conversations.map((c)=> (
                          <div  onClick={() => setCurrentChat(c)}>
                      <Conversations conversation={c} currentUser={user}/>
                      </div>
                  ))} 
               </div>
           </div>
           <div className="chatBox">
               <div className="chatBoxWrapper">
                  {currentChat ? 
                  <>
                   <div className="chatBoxTop">
                       {messages.map((m) => (
                           <div ref={scrollRef}>
                            <Message message={m} own={m.sender === user[0].id}/>
                           </div>
                      ))}
                   </div>
                   <div className="chatBoxBottom">
                       <textarea className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e)=>setNewMessage(e.target.value)}
                        value={newMessage}
                        ></textarea>
                       <button className="chatSubmitButton" 
                       onClick={handleSubmit}>Send</button>
                   </div></> :(
                   <span className="noConversationText">Open a conversation to start a chat.</span>)}
                   
               </div>
           </div>
           <div className="chatOnline">
               <div className="chatOnlineWrapper">
                   <ChatOnline />
               </div>
           </div>
        </div>
        </>
    )
}