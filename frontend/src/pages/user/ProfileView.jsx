import {
  Avatar,
  Box,
  Button,
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
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi";
import { getPostsByAuthor } from "../../api/postApi";
import { useState } from "react";
import UserContext from "../../UserContext";
import { PostList } from "../../components/PostList";
import { getGaragesByMember } from "../../api/garageApi";

export const ProfileView = () => {
  const params = useParams();
  const username = params.username
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({})
  const [garages, setGarages] = useState([]);
  useEffect(() => {
    getPostsByAuthor(username).then(x => setPosts(x));
    getUserByUsername(username).then(x => setUser(x[0]))
    getGaragesByMember(username).then(x => setGarages(x))
  }, [])
  let currUser = useContext(UserContext);
  let navigate = useNavigate();

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
                  {user.username === currUser &&  (<Button label="Edit Profile" onClick={() => navigate("/profile/edit/" + user.username)}></Button>)}
                </Box>
              </CardHeader>
              <CardBody>
                <Box direction="row" gap="small" pad="small">
                  {garages.map((garage) => {<Tag value={garage.name} key={garage.garage_id}></Tag>})}
                </Box>
              </CardBody>
            </Card>
            {user.username === currUser &&  (<Heading margin="small">My Posts</Heading>) || <Heading margin="small">Posts</Heading>}
            {/* map user's posts here into post templates */}
            <PostList title="My Posts" posts={posts}/>
          </PageContent>
        </Page>
      </>
    )
  );
};
