import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Grid,
  Page,
  PageContent,
  Tag,
} from "grommet";
import PostTemplate from "../../components/PostTemplate";
import { Car, Sidebar } from "grommet-icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi";
import { useState } from "react";
export const ProfileView = () => {
  const s = useParams().username;
  let data = {
    username: "",
    posts: [],
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserByUsername(s).then((x) => {
      setUser(x[0]);
    });
  }, []);

  return (
    user.username != "" && (
      <>
        <Page>
          <PageContent>
            <Card margin="small">
              <CardHeader>
                <Box pad="small" direction="row" align="center" gap="large" fill="horizontal">
                  <Heading level={2}>{user.username}</Heading>
                  <Avatar background="brand" size="xlarge">
                    <Car size="large"></Car>
                  </Avatar>
                </Box>
              </CardHeader>
              <CardBody>
                <Box direction="row" gap="small" pad="small">
                  <Tag value="tag 1"></Tag>
                  <Tag value="tag 2"></Tag>
                </Box>
              </CardBody>
            </Card>
            {}
            {/* map user's posts here into post templates */}
          </PageContent>
        </Page>
      </>
    )
  );
};
