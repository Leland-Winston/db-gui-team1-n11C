import react, { useEffect, useState, useContext } from "react";
import { addNewRating, createComment, getCommentsFromPost, getPostById, getUserScore, setUserScore, updatePostRating } from "../../api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import { CaretDown, CaretUp, LinkPrevious } from "grommet-icons";
import { TextArea, Button, Page, Box, Grid, Card, CardBody, CardHeader, CardFooter, Heading, PageContent, Text } from "grommet";
import UserContext from "../../UserContext";
import { getUserByUsername } from "../../api/userApi";
const constructCommentTree = async (allComments, commentTree) => {
    allComments.forEach(newComment => {
        if (newComment.parent !== null) { //comment is not a root
            commentTree.forEach(root => {
                //recursively insert into each root
                recursiveInsert(newComment, root)
            })
        }
        else { //add new root
            commentTree.push({ ...newComment, ...{ children: [] } })
        }
    })
}
const recursiveInsert = (newComment, root) => {
    if (newComment.parent == root.comment_id) {
        root.children.push({ ...newComment, ...{ children: [] } })
    }
    else {
        if (root.children.length > 0) {
            root.children.forEach(c => {
                recursiveInsert(newComment, c)
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
    let aComment = {
        post_id: id,
        author: currPost.author,
        parent: null,
        content: undefined,
    }
    let [newComment, setNewComment] = useState(aComment);

    const _setNewComment = (delta) => {
        setNewComment({ ...newComment, ...delta })
        console.log(newComment)
    }
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
            _setNewComment({ post_id: currPost.post_id })
            _setNewComment({ author: currUser })
        }
        if (!commentsLoaded) {
            loadComments();
        }
    }, [currPost]);

    const addComment = async (comment) => {
        aComment = {
            post_id: id,
            author: comment.author,
            parent: comment.parent,
            content: comment.content,
        }

        console.log(aComment)

        await createComment(aComment)
        setNewComment({ post_id: undefined, author: undefined, parent: 0, content: undefined })
    }

    return (
        !!currPost &&
        <>
            <Page kind="narrow">
                <PageContent>
                    <Box pad="small" justify="start" width={"small"} flex responsive>
                    <Button label="Back"
                        onClick={() => navigate('/garage/' + currPost.garage)}
                        icon={<LinkPrevious></LinkPrevious>}></Button>
                    </Box>
                    <Card>
                        <CardHeader background={"brand"}>
                            <Box pad={{start: "medium"}}>
                        <Heading level={3} margin={"small"} color={"text-strong"}>{currPost.title}</Heading>
                        </Box>
                        </CardHeader>
                        <CardBody pad={{ horizontal: 'medium' }} overflow={"auto"} responsive>
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

                                    <Heading level="6" margin={"none"}>{currPost.rating + score}</Heading>
                                    <Button icon={<CaretDown color={userRating == -1 ? "brand" : ""}></CaretDown>}
                                        pad={0}
                                        onClick={() => { rate("dislike") }}></Button>
                                </Box>
                                <Box margin="small">
                                <Box gridArea="main" pad="small" width={"40rem"}>
                                    <Text>{currPost.content}</Text>
                                </Box>
                                </Box>
                            </Grid>
                        </CardBody>
                        <CardFooter pad={{ horizontal: "small", bottom: "small" }} margin="small">
                            <Box direction="column" fill>
                            <TextArea rows={3}
                                onChange={(event) => _setNewComment({ content: event.target.value })}>
                            </TextArea>
                            <Box margin={{top: "small"}} width={"small"}>
                            <Button primary label="Add Comment" pad="xsmall" onClick={() => { addComment(newComment) }}></Button>
                            </Box>
                            </Box>
                        </CardFooter>
                    </Card>
                    {commentTree.map(c => {
                        return <><Comment comment={c}></Comment></>
                    })}
                </PageContent>
            </Page >
        </>
    )
}