import React, { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState([
    {
      id: "634164f8c3c248c4a96b3f42",
      name: "roomi.ak",
      emailId: "romanaaijaz99@gmail.com",
      age: 23,
      city: "Islamabad",
      occupation: "se",
      profilePic: "profilePic.jpg",
      coverPic: "coverPic.png",
      disorder: "Mood Disorders",
      followers: ["6341654ac3c248c4a96b3f44"],
    },
  ]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
