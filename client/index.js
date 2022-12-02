import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/contextApi";
//import { AuthContextProvider } from "./context/AuthContext";
//import { UserProvider } from "./context/contextApi";

//var User = { name: "Tania", loggedIn: true };

function Index() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    // <UserProvider value={User}>
    <UserProvider>
      <App />
    </UserProvider>
    /*<React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>*/
  );
}
Index();