import React, { useContext, useState } from "react";
import {Routes, Route} from 'react-router-dom';
import { Login } from "./pages/user/login.jsx";
import AppBar from "./components/AppBar.jsx";
import {
  Grommet,
  grommet,
} from "grommet";
import { deepMerge } from "grommet/utils";
import appTheme from "./appTheme.json";
import LandingPage from "./pages/LandingPage.js";
import UserContext from "./UserContext.js";
import { Register } from "./pages/user/Register.jsx";
import { ProfileView } from "./pages/user/ProfileView";
import { PostView } from "./pages/PostView";

const theme = deepMerge(grommet, appTheme);

function App() {
  const userContext = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const _setCurrentUser = (newUser) => setCurrentUser(newUser);
  const [dark, setDark] = useState("dark");

  const post = {
    id: 1,
    title: "How to make a million dollars with CS",
    username: "NoobMaster69",
    text: "Hey guys I wanted to ask what is the quickest way to make money with CS. I'm thinking of majoring in CS, but I don't want alot of work. Any advice would be appreciated!",
    date: "2021-04-20",
    comments: [
      {
        id: 1,
        username: "Knightmare",
        date: "2021-04-20",
        text: "I think you should major in CS. It's a great major and you can make a lot of money with it.",
      },

      {
        id: 2,
        username: "DarkMagician07",
        date: "2021-04-20",
        text: "I think you should major in CS. It's a great major and you can make a lot of money with it.",
      }
    ]
}

  return (
    <>
    <UserContext.Provider value={currentUser}>
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
    <AppBar setDark={setDark} dark={dark} setCurrentUser={_setCurrentUser}></AppBar>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login setCurrentUser={_setCurrentUser}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<ProfileView user={currentUser}/>}/>
        <Route path="/post/:id" element={<PostView post = {post}/>}/>
      </Routes>
      </Grommet>
    </UserContext.Provider>
    </>
  );
}

export default App;