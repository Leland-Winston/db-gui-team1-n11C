import react, { useEffect, useState, useContext } from "react";
import { addNewRating, getCommentsFromPost, getPostById, getUserScore, setUserScore, updatePostRating } from "../../api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import { CaretDown, CaretUp } from "grommet-icons";
import { Button, Page, Box, Grid, Card, CardBody, CardHeader, CardFooter, PageContent } from "grommet";
import UserContext from "../../UserContext";
import { getUserByUsername } from "../../api/userApi";
const constructCommentTree = async (allComments, commentTree) => {
    allComments.forEach(newComment => {
        if (newComment.parent !== null) { //comment is not a root
            commentTree.forEach(root => {
                //recursively insert into each root
                recusriveInsert(newComment, root)
            })
        }
        else { //add new root
            commentTree.push({ ...newComment, ...{ children: [] } })
        }
    })
}
const recusriveInsert = (newComment, root) => {
    if (newComment.parent == root.comment_id) {
        root.children.push({ ...newComment, ...{ children: [] } })
    }
    else {
        if (root.children.length > 0) {
            root.children.forEach(c => {
                recusriveInsert(newComment, c)
            })
        }
    }
}

export default function PostView() {
    let currUser = useContext(UserContext)
    let navigate = useNavigate()
    let [userRating, setUserRating] = useState(0);
    let [score, setScore] = useState(0);
    let id = useParams().post;
    let [commentTree, setCommentTree] = useState([]);
    let [currPost, setCurrPost] = useState({});
    let [comments, setComments] = useState([]);
    let [commentsLoaded, setCommentsLoaded] = useState(false);
    const sendRating = (action) => {
        getUserScore(currPost.post_id, currUser)
            .then(x => {
                if (!x[0]) {
                    addNewRating(currPost.post_id, currUser, action == 'like' ? 1 : -1)
                }
                else {
                    setUserScore(currPost.post_id, currUser, action)
                }
            }
            )
        console.log(userRating)
    }
    const rate = (action) => {
        if (action == "like") {
            if (userRating < 1) {
                setUserRating(userRating + 1)
                setScore(score + 1)
                updatePostRating(currPost.post_id, "like")
                sendRating("like");

            }
            else {
                setUserRating(userRating - 1)
                setScore(score - 1)
                updatePostRating(currPost.post_id, "dislike")
                sendRating("dislike");

            }
        }
        else {
            if (userRating > -1) {
                setUserRating(userRating - 1)
                setScore(score - 1)
                updatePostRating(currPost.post_id, "dislike")
                sendRating("dislike");

            }
            else {
                setUserRating(userRating + 1)
                setScore(score + 1)
                updatePostRating(currPost.post_id, "like")
                sendRating("like");

            }
        }

    }
    useEffect(() => {
        getPostById(id).then(x => {
            setCurrPost(x[0]);
            getUserScore(x[0].post_id, window.localStorage.getItem('currentUser'))
                .then(y => setUserRating(y[0].score))
        });

    }, [])
    useEffect(() => {
        async function loadComments() {
            const response = await getCommentsFromPost(id);
            setComments(response)
            constructCommentTree(comments, commentTree)
            if (commentTree.length > 0) setCommentsLoaded(true)
        }
        if (!commentsLoaded) {
            loadComments();
        }
    }, [currPost])
    return (
        !!currPost &&
        <>
            <Page kind="narrow">
                <PageContent>
                    <Card>
                        <CardHeader>
                            <Grid
                                rows={['xxxsmall', 'xsmall']}
                                columns={['xsmall', 'large']}
                                gap="small"
                                areas={[
                                    { name: 'rating', start: [0, 0], end: [0, 1] },
                                    { name: 'main', start: [1, 1], end: [1, 1] },
                                ]}
                            >
                                <Box gridArea="rating"
                                    alignContent="center" style={{ alignContent: 'center', alignItems: 'center' }}>
                                    <Button icon={<CaretUp color={userRating == 1 ? "brand" : ""}></CaretUp>}
                                        pad={0}
                                        onClick={currUser ? () => rate("like") :
                                            () => { navigate('/login', { state: { previous: '/garage/' + currPost.garage + '/post/' + currPost.post_id } }) }}></Button>

                                    <h6>{currPost.rating + score}</h6>
                                    <Button icon={<CaretDown color={userRating == -1 ? "brand" : ""}></CaretDown>}
                                        pad={0}
                                        onClick={() => { rate("dislike") }}></Button>
                                </Box>
                                <Box gridArea="main" pad="medium">
                                    <h1>{currPost.title}</h1>
                                </Box>
                            </Grid>
                        </CardHeader>
                        <CardBody pad={{ horizontal: 'medium' }}>
                            <p>{currPost.content}</p>
                        </CardBody>
                        <CardFooter>
                            {commentTree.map(c => {
                                return <Comment comment={c}></Comment>
                            })}
                        </CardFooter>
                    </Card>

                </PageContent>
            </Page >
        </>
    )
}