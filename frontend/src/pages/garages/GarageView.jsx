import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation, NavLink } from "react-router-dom";
import UserContext from "../../UserContext";
import { addUserToGarage, getGarageByName, getGaragesByMember, removeUserFromGarage } from "../../api/garageApi";
import { getPostsByGarageName } from "../../api/postApi";
import { PostList } from "../../components/PostList";
import { Page, PageContent, Grid, Button, Box, Card, CardHeader, CardBody, CardFooter, Heading, Paragraph } from "grommet";


export default function GarageView() {

    let navigate = useNavigate();
    let location = useLocation();
    let currUser = useContext(UserContext);
    let garageName = useParams().garagename;
    let [currGarage, setCurrGarage] = useState(null);
    let [joined, setJoined] = useState(false);
    let [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadData = async () => getGarageByName(garageName).then(x => {
            if (!!x[0]) {
                setCurrGarage(x[0])
            }
        })
        const loadPosts = async () => getPostsByGarageName(garageName).then(x => {
            setPosts(x)
        })
        loadData().then(loadPosts())
    }, [])
    useEffect(() => {
        getGaragesByMember(currUser).then(x => {
            console.log(x)
            x.forEach(m => {
                if (m.garage_name == currGarage.name) {
                    setJoined(true)
                }
            })
        })
    }, [currGarage])
    const joinGarage = () => {
        addUserToGarage(currGarage.name, currUser);
        setJoined(true)
    }
    const leaveGarage = () => {
        removeUserFromGarage(currGarage.name, currUser);
        setJoined(false)
    }

    return (
        currGarage !== null &&
        <>
            <Page>
                <PageContent>
                    <Grid
                        rows={['xxsmall', 'medium']}
                        columns={['flex', 'medium']}
                        gap="small"
                        areas={[
                            { name: 'posts', start: [0, 1], end: [0, 1] },
                            { name: 'info', start: [1, 1], end: [1, 1] },
                        ]}
                    >
                        <Box gridArea="posts">
                            {/* {posts.length > 0 && posts.map(p => {
                                return (<>
                                    <PostTemplate currPost={p} />
                                </>
                                )
                            })} */
                            <PostList title="Garage Posts" posts={posts}/>}

                        </Box>
                        <Box gridArea="info">
                            <Card>
                                <CardHeader pad="small">
                                    <Box pad="none" direction="column" justify="end">
                                        <Heading level={4} margin="none">
                                            {currGarage.name}
                                        </Heading>
                                    </Box>
                                    {
                                        !joined &&
                                        <Button label="Join Garage"
                                            onClick={() => joinGarage()}>
                                        </Button>
                                        ||
                                        <Button label="Leave Garage"
                                            onClick={() => leaveGarage()}>
                                        </Button>
                                    }

                                </CardHeader>
                                <CardBody pad="small">
                                    <Paragraph>
                                        {currGarage.description}
                                    </Paragraph>
                                    <Button label="Create Post" primary fill="horizontal"
                                        onClick={() => navigate(
                                            currUser ? '/newpost/' + currGarage.name
                                                : '/login', {
                                            state:
                                                { previous: '/newpost/' + currGarage.name }
                                        })}></Button>
                                </CardBody>
                            </Card>
                        </Box>
                    </Grid>
                </PageContent>
            </Page >
        </>
        ||
        <>
            <h1>This garage does not exist</h1>
            <Link to='/'>Return Home</Link></>
    )
}