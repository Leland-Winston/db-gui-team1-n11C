import React from "react";
import { useState, useContext } from "react";
import { Box, Button, Header, Menu, ResponsiveContext, Text } from "grommet";
import { deepMerge } from "grommet/utils";
import { Moon, Sun, Close, Send, User, Menu as MenuIcon } from "grommet-icons";
import { NavLink } from "react-router-dom";
function AppBar({ setView, setDark, dark }) {
  const size = useContext(ResponsiveContext);
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
            a11yTitle={
              dark ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            icon={dark ? <Moon color="light-1" /> : <Sun color="light-1" />}
            onClick={() => setDark(!dark)}
            tip={{
              content: (
                <Box
                  pad="small"
                  round="small"
                  background={dark ? "dark-1" : "light-3"}
                >
                  {dark
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"}
                </Box>
              ),
              plain: true,
            }}
          />

          <NavLink to="/login">
            <Button
              icon={<User color="light-1" />}
              a11yTitle={"Login"}
              tip={{
                content: (
                  <Box
                    pad="small"
                    round="small"
                    background={dark ? "dark-1" : "light-3"}
                  >
                    {"Login"}
                  </Box>
                ),
                plain: true,
              }}

            />
          </NavLink>

        </Box>
      </Header>

    </>
  )
}
export default AppBar;