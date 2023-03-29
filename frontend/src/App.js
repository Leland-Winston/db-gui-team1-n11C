import axios from "axios";
import React, { useState } from "react";
import {Router, Routes, Route} from 'react-router-dom';
import { Login } from "./pages/login.jsx";
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

const theme = deepMerge(grommet, appTheme);

function App() {
  const url = "http://localhost:8000";
  const [dark, setDark] = useState("dark");
  return (
    <>
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
    <AppBar setDark={setDark} dark={dark}></AppBar>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </Grommet>
    </>
  );
}

export default App;
