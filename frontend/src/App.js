import axios from "axios";
import React, { useState } from "react";

import { Login } from "./pages/login.js";
import { PostTemplate } from "./components/PostTemplate.jsx";
import { AppBar } from "./components/AppBar.jsx";

import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  Grommet,
  grommet,
  Header,
  Heading,
  Menu,
  Nav,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Text,
} from "grommet";

import { deepMerge } from "grommet/utils";
import { Moon, Sun, Close, Send, User, Menu as MenuIcon } from "grommet-icons";
import appTheme from "./appTheme.json";

const theme = deepMerge(grommet, appTheme);

export default function App() {
  const url = "http://localhost:8000";
  const [dark, setDark] = useState(true);

  // use state for page view
  const [view, setView] = useState("home");

  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page>
        <AppBar>
          <ResponsiveContext.Consumer>
            {(size) =>
              size === "small" ? (
                <Box>
                  <Menu
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: "bottom", right: "right" } }}
                    icon={<MenuIcon color="active-text" />}
                    items={[
                      {
                        label: (
                          <Box pad="small">
                            {dark ? "Light Mode" : "Dark Mode"}
                          </Box>
                        ),
                        icon: (
                          <Box pad="small">{dark ? <Moon /> : <Sun />}</Box>
                        ),
                        onClick: () => {
                          setDark(!dark);
                        },
                        href: "",
                      },
                      {
                        label: <Box pad="small">Login</Box>,
                        icon: (
                          <Box pad="small">
                            <User />
                          </Box>
                        ),
                        href: "",
                      },
                    ]}
                  />
                </Box>
              ) : (
                <Box
                  direction="row"
                  gap="medium"
                >
                  <Button
                    a11yTitle={
                      dark ? "Switch to Light Mode" : "Switch to Dark Mode"
                    }
                    icon={dark ? <Moon /> : <Sun />}
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
                  <Button
                    icon={<User />}
                    onClick={() => {
                      setView("login");
                    }}
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

                  <Button 
                  icon={<Close/>}
                  onClick={() => {
                    setView("home");
                  }}
                  a11yTitle={"Close"}
                  tip={{
                    content: (
                      <Box
                        pad="small"
                        round="small"
                        background={dark ? "dark-1" : "light-3"}
                      >
                        {"Close"}
                      </Box>
                    ),
                    plain: true,
                  }}
                  />
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        </AppBar>

        <PageContent>
            
          {  view == "home" && 
          <>
          <PageHeader title="Popular Posts" />
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
            <PostTemplate title={"I Love Cars"} user={"user1"} date={"Jan 1"} />
            <PostTemplate title={"Subaru"} user={"John Doe"} date={"Jan 4"} />
            <PostTemplate title={"Ford"} user={"user2"} date={"Sep 18"} />
          </Grid>
          </>
          ||
          <Login/>
        }
        </PageContent>


      </Page>
    </Grommet>
  );
}