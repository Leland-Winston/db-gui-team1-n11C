import React, { useState, useEffect, useContext } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Header,
  Heading,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  Sidebar,
} from "grommet";
import PostTemplate from "../components/PostTemplate";
import PostView from "./posts/PostView";
import { getAllGarages, getGaragesByMember } from "../api/garageApi";
import { getPosts } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { PostList } from "../components/PostList";
import { GarageBrowser } from "../components/GarageBrowser";
function LandingPage() {
  let navigate = useNavigate();
  let currentUser = useContext(UserContext);
  let [garages, setGarages] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [joinedGarages, setJoinedGarages] = useState([]);
  let [posts, setPosts] = useState([]);
  const size = useContext(ResponsiveContext);
  const sortPopular = async () =>{
    
  }
  useEffect(() => {
    getAllGarages().then((x) => setGarages(x));
    getPosts().then((x) => {
      setPosts(x)
      setLoaded(true)
    })
  }, []);
  return (
    <>
      {size !== "small" ? ( // DISPLAY FOR MEDIUM - LARGE SCREENS
        <Grid
          fill
          areas={
                       [
                  { name: "nav", start: [0, 0], end: [0, 0] },
                  { name: "main", start: [1, 0], end: [1, 0] },
                ]
          }
          columns={["medium", "flex"]}
          rows={["flex"]}
          gap="small"
        >
          <Box
            gridArea="nav"
            gap="large"
            pad={{ bottom: "medium", top: "large" }}
          >
            <GarageBrowser garages={garages} context={size} />
          </Box>
          <Box
            gridArea="main"
            gap="large"
            pad={{ bottom: "medium", top: "large" }}
          >
            <Page>
              <PageContent>
                <Heading>Popular Posts</Heading>
                {loaded &&<PostList
                  posts={posts.sort((a, b)=> (a.rating < b.rating) ? 1: -1)}
                  context={size}
                ></PostList>}
                
              </PageContent>
            </Page>
          </Box>
        </Grid>
      ) : ( // DISPLAY FOR SMALL SCREENS BELOW
        <Grid
          fill
          areas={
            [
                  { name: "nav", start: [0, 0], end: [0, 0] },
                  { name: "main", start: [0, 1], end: [0, 1] },
                ]
          }
          columns={["auto"]}
          rows={["small", "flex"]}
          gap="small"
          pad={"small"}
        >
          <Accordion>
          <AccordionPanel label="Garages">
          <Box
            gridArea="nav"
          >
            <GarageBrowser garages={garages} />
          </Box>
          </AccordionPanel>
                <AccordionPanel label="Popular Posts">
                <Box
            gridArea="main"
          >
                <PostList
                  posts={posts.sort((a, b)=> (a.rating < b.rating) ? 1: -1)}
                ></PostList>
                </Box>
                </AccordionPanel>
          </Accordion>
        </Grid>
        
      )}
    </>
  );
}
export default LandingPage;
