import React from "react";
import { useState, useContext } from "react";
import { Box, Button, Header, Heading, Menu, ResponsiveContext, Text } from "grommet";
import { deepMerge } from "grommet/utils";
import { Moon, Sun, Close, Send, User, Menu as MenuIcon, ContactInfo, Logout, Login, HomeRounded } from "grommet-icons";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
function AppBar({ setView, setDark, dark, setCurrentUser }) {
  const size = useContext(ResponsiveContext);
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const logout = () => {
    setCurrentUser(null);
    window.localStorage.removeItem("currentUser")
    navigate('/')
  }
  return (
    <>
      <Header
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="none"
      >
        <Box
          direction="row"
          gap="medium"
        >
          <Button
            onClick={() => navigate('/')}
            a11yTitle="Home"
            icon={<img src="https://i.imgur.com/PycqvbA.png"
              style={{ height: '1em' }} />}>

          </Button>
          <Button
            a11yTitle={
              dark ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            icon={dark ? <Moon color="light-1" /> : <Sun color="light-1" />}
            onClick={() => setDark(!dark)}
            tip={{
              content: (
                <Box pad="small" round="small"
                  background={dark ? "dark-1" : "light-3"}>
                  {dark
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"}
                </Box>
              ),
              plain: true,
            }}
          />

          <NavLink to={user == null && "/login"
            || ("/profile/" + user)}>
            <Button
              icon={
                user == null && <Login color="light-1" />
                ||
                <ContactInfo color="light-1" />}
              a11yTitle={"Login"}
              tip={{
                content: (
                  <Box pad="small" round="small"
                    background={dark ? "dark-1" : "light-3"}
                  >
                    {user == null && "Login"
                      ||
                      "My Profile"}
                  </Box>
                ),
                plain: true,
              }}

            />
          </NavLink>
          {user !== null &&
            < Button
              icon={<Logout color='light-1' />}
              tip={{
                content: (
                  <Box pad="small" round="small"
                    background={dark ? "dark-1" : "light-3"}
                  >
                    Logout
                  </Box>
                ),
                plain: true,
              }}
              onClick={() => logout()} />}
        </Box>
      </Header>

    </>
  )
}
export default AppBar;