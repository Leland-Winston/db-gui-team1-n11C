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
import { getPostsByAuthorId } from "../../api/postApi";
import { useState } from "react";
import UserContext from "../../UserContext";

export const ProfileView = () => {
  const params = useParams();
  let user = useContext(UserContext);
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    getPostsByAuthorId(user.id).then(x => setPosts(x));
  }, [])

  console.log(posts);
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
              <TableCell><PostTemplate title={post.title}
                                        user={user.username}
                                        date={"jan 1"}
                                        text={post.content}></PostTemplate></TableCell>
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
