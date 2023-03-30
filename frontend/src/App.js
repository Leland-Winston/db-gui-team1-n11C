import axios from "axios";
import React, { useContext, useState } from "react";
import {Router, Routes, Route} from 'react-router-dom';
import { Login } from "./pages/user/login.jsx";
import PostTemplate from "./components/PostTemplate.jsx";
import AppBar from "./components/AppBar.jsx";
import {
  Grid,
  Grommet,
  grommet,
  Page,
  PageContent,
  PageHeader
} from "grommet";
import { deepMerge } from "grommet/utils";
import { Moon, Sun, Close, Send, User, Menu as MenuIcon } from "grommet-icons";
import appTheme from "./appTheme.json";
import LandingPage from "./pages/LandingPage.js";
import UserContext from "./UserContext.js";

const theme = deepMerge(grommet, appTheme);

function App() {
  const userContext = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const _setCurrentUser = (newUser) => setCurrentUser(newUser);
  const [dark, setDark] = useState("dark");
  return (
    <>
    <UserContext.Provider value={currentUser}>
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
    <AppBar setDark={setDark} dark={dark} setCurrentUser={_setCurrentUser}></AppBar>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login setCurrentUser={_setCurrentUser}/>}/>
      </Routes>
      </Grommet>
    </UserContext.Provider>

    </>
  );
}

export default App;
