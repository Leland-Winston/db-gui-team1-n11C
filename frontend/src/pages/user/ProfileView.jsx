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
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  Tag,
} from "grommet";
import PostTemplate from "../../components/PostTemplate";
import { Car, Sidebar } from "grommet-icons";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi";
import { getPostsByAuthor } from "../../api/postApi";
import { useState } from "react";
import UserContext from "../../UserContext";

export const ProfileView = () => {
  const params = useParams();
  const username = params.username
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({})
  useEffect(() => {
    getPostsByAuthor(username).then(x => setPosts(x));
    getUserByUsername(username).then(x => setUser(x[0]))
  }, [])

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
            {/* map user's posts here into post templates */}
            <Card margin="small">
              <Table>
                <TableHeader>
                  <Box margin="small">
                    <Heading>My Posts</Heading>
                  </Box>
                </TableHeader>
                <TableBody>
                  {
                    posts.map(post => <TableRow key={post.post_id}>
                      <TableCell><PostTemplate currPost={post}></PostTemplate></TableCell>
                    </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </Card>
          </PageContent>
        </Page>
      </>
    )
  );
};
