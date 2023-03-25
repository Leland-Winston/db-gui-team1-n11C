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
    >
    </Header>
  );
  const CardTemplate = ({ title }) => {
    return (
      <Card>
        <CardHeader pad="medium">
          <Heading level={2} margin="none">
            {title}
          </Heading>
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
          Footer
        </CardFooter>
      </Card>
    );
  };

  const checkAPI = () => {
    axios
      .get(url + "/")
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const user = {
    first: "Hayden",
    last: "Center",
    age: 22,
    admin: true,
  };

  const sendJSON = () => {
    console.log(user);

    axios
      .put(url + "/parse", user)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendUser = () => {
    axios
      .post(url + "/user", user)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsers = () => {
    axios
      .get(url + "/users")
      .then((res) => {
        alert(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearUsers = () => {
    axios
      .put(url + "/users/clear")
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                    label: <Box pad="small">
                      {dark ? "Light Mode" : "Dark Mode"}
                    </Box>,
                    icon: (
                    <Box pad="small">
                      {dark ? <Moon /> : <Sun />}
                    </Box>
                    ),
                    onClick: () => {setDark(!dark)},
                    href: "",
                  },
                  {
                    label: <Box pad="small">Login</Box>,
                    icon: (
                      <Box pad="small">
                        <User/>
                      </Box>
                      ),
                    href: "",
                  },
                ]}
              />
            </Box>
          ) : (
            <Box direction="row" gap="medium">
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
                      {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </Box>
                  ),
                  plain: true,
                }}
              />
              <Button
                icon={<User />}
                onClick={() => {}}
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
          <PageHeader title="Welcome to Grommet!" />
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
            <CardTemplate title={"Card 1"} />
            <CardTemplate title={"Card 2"} />
            <CardTemplate title={"Card 3"} />
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
