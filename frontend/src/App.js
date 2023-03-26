import axios from "axios";
import React, { useState } from "react";
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

function App() {
  const url = "http://localhost:8000";
  const [dark, setDark] = useState(true);
  const size = React.useContext(ResponsiveContext);

  const AppBar = (props) => (
    <Header
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="none"
      {...props}
    ></Header>
  );
  const PostTemplate = ({ title, user, date }) => {
    return (
      <Card>
        <CardHeader pad="medium">
          <Box pad="none" direction="column" justify="end">
            <Heading level={2} margin="none">
              {title}
            </Heading>
            <Heading level={4} margin="none">
              {user}
            </Heading>
          </Box>
        </CardHeader>
        <CardBody pad="medium">
          <Paragraph maxLines={size === "small" ? 3 : undefined}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            porttitor non nulla ac vehicula. Aliquam erat volutpat. Mauris
            auctor faucibus est at mattis. Aliquam a enim ac nisi aliquam
            consectetur et ac velit. Mauris ut imperdiet libero.
          </Paragraph>
        </CardBody>
        <CardFooter pad="medium" background="background-contrast">
          {date}
        </CardFooter>
      </Card>
    );
  };

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
                      alert("Login");
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
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        </AppBar>
        <PageContent>
          <PageHeader title="Popular Posts" />
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
            <PostTemplate title={"I Love Cars"} user={"user1"} date={"Jan 1"} />
            <PostTemplate title={"Subaru"} user={"John Doe"} date={"Jan 4"} />
            <PostTemplate title={"Ford"} user={"user2"} date={"Sep 18"} />
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
