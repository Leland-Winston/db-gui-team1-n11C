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
import { NewPost } from "./pages/user/NewPost";

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
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile/:username/:id" element={<ProfileView/>}/>
        <Route path="/newpost/:username/:garage"element={<NewPost/>}/>
      </Routes>
      </Grommet>
    </UserContext.Provider>
    </>
  );
}

export default App;
