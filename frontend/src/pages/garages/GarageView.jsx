import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation, NavLink } from "react-router-dom";
import UserContext from "../../UserContext";
import { addUserToGarage, deleteGarage, getGarageByName, getGaragesByMember, removeMembersFromGarage, removeUserFromGarage } from "../../api/garageApi";
import { deleteCommentsFromPost, deletePost, deletePostsFromGarage, getPostsByGarageName } from "../../api/postApi";
import { PostList } from "../../components/PostList";
import { Select, Page, PageContent, Grid, Button, Box, Card, CardHeader, CardBody, CardFooter, Heading, Paragraph, ResponsiveContext } from "grommet";


export default function GarageView() {

    let navigate = useNavigate();
    let location = useLocation();
    let currUser = useContext(UserContext);
    let size = useContext(ResponsiveContext);
    let garageName = useParams().garagename;
    let [currGarage, setCurrGarage] = useState(null);
    let [joined, setJoined] = useState(false);
    let [posts, setPosts] = useState([]);
    let [sort, setSort] = useState('new')
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
    const cascadingDelete = () => {
        posts.forEach(p => {
            deleteCommentsFromPost(p.post_id)
        })
        deletePostsFromGarage(currGarage.name)
        deleteGarage(currGarage.name)
        removeMembersFromGarage(currGarage.name)
    }
    return (
        currGarage !== null &&
        <>
            <Page>
                <PageContent>
                    <Grid
                        rows={size != "small" ? ['xxsmall', 'medium'] : ['medium', 'flex']}
                        columns={size != "small" ? ['flex', 'medium'] : ['flex', 'flex']}
                        gap="small"
                        areas={size != "small" ? [
                            { name: 'posts', start: [0, 1], end: [0, 1] },
                            { name: 'info', start: [1, 1], end: [1, 1] },
                        ] : [{ name: 'info', start: [0, 0], end: [1, 0] },
                        { name: 'posts', start: [0, 1], end: [1, 1] },]}
                    >
                        <Box gridArea="posts">
                        
                            {/* {posts.length > 0 && posts.map(p => {
                                return (<>
                                    <PostTemplate currPost={p} />
                                </>
                                )
                            })} */

                                posts.length > 0 &&
                                <PostList posts={
                                    sort == "new" ? posts.sort((a, b) => (a.post_id < b.post_id) ? 1 : -1) : posts.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
                                } context={{ location: 'garage', garage: garageName }} />}

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
                                    <Button label="Create Post" primary fill="horizontal" margin={{ bottom: 'small' }}
                                        onClick={() => navigate(
                                            currUser ? '/newpost/' + currGarage.name
                                                : '/login', {
                                            state:
                                                { previous: '/newpost/' + currGarage.name }
                                        })}></Button>
                                    {
                                        currUser == currGarage.creator &&
                                        <Button label="Edit Garage"
                                            onClick={() => { navigate('/editgarage/' + currGarage.name) }}>
                                        </Button>
                                    }
                                    {currUser === currGarage.creator && <Button label="Delete Garage"
                                        onClick={() => {
                                            cascadingDelete()
                                            navigate('/')
                                        }}></Button>}
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