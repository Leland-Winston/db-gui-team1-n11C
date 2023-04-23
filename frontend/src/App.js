import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/user/login.jsx";
import AppBar from "./components/AppBar.jsx";
import { Grommet, grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import appTheme from "./appTheme.json";
import LandingPage from "./pages/LandingPage.js";
import UserContext from "./UserContext.js";
import { Register } from "./pages/user/Register.jsx";
import { ProfileView } from "./pages/user/ProfileView";
import { NewPost } from "./pages/user/NewPost";
import PostView from "./pages/posts/PostView.jsx";
import GarageView from "./pages/garages/GarageView.jsx"
import { CreateGarage } from "./pages/garages/CreateGarage.jsx";
import { getUserByUsername } from "./api/userApi.js";
const theme = deepMerge(grommet, appTheme);

function App() {
  const userContext = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [dark, setDark] = useState("dark");
  
  const _setCurrentUser = (newUser) => {
    setCurrentUser(newUser);
    window.localStorage.setItem('currentUser', newUser)
  };
  const _setDark = (theme) =>{
    setDark(theme);
    window.localStorage.setItem('theme', theme ? "dark" : "light")
  }
  useEffect(()=>{
    const u = window.localStorage.getItem('currentUser');
    const t = window.localStorage.getItem('theme');
    _setDark(t==="dark" ? true : false);
    setCurrentUser(u)
  }, [])
  return (
    <>
      <UserContext.Provider value={currentUser}>
        <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
          <AppBar
            setDark={_setDark}
            dark={dark}
            setCurrentUser={_setCurrentUser}
          ></AppBar>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login setCurrentUser={_setCurrentUser}/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<ProfileView />} />
            <Route path="/garage/:garagename" element={<GarageView />} />
            <Route path="/garage/:garage/post/:post" element={<PostView />} />
            <Route path="/newpost/:garage" element={<NewPost />} />
            <Route path="/newgarage" element={<CreateGarage />} />
          </Routes>
        </Grommet>
      </UserContext.Provider>
    </>
  );
}

export default App;