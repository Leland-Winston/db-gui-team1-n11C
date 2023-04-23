import react, { useEffect, useState, useContext } from "react";
import { getCommentsFromPost, getPostById, createComment } from "../../api/postApi";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { Page, Box, Grid, Card, CardBody, CardHeader, CardFooter, PageContent, Button, TextArea, FormField} from "grommet";

const constructCommentTree = async (allComments, commentTree) => {
    allComments.forEach(newComment => {
        console.log(newComment.length)

        if (newComment.parent !== 0) { //comment is not a root
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
    let id = useParams().post;

    let [commentTree, setCommentTree] = useState([]);
    let [currPost, setCurrPost] = useState({});
    let [comments, setComments] = useState([]);
    let [commentsLoaded, setCommentsLoaded] = useState(false);

    let aComment = {
        post_id: id,
        author: currPost.author,
        parent: 0,
        content: undefined,
    }

    let [newComment, setNewComment] = useState(aComment);

    const _setNewComment = (delta) => {
        setNewComment({ ...newComment, ...delta })
        console.log(newComment)
    }

    useEffect(() => {
        getPostById(id).then(x => {
            setCurrPost(x[0]);
        });
    }, []);

    useEffect(() => {
        async function loadComments() {
            const response = await getCommentsFromPost(id);
            setComments(response);
            constructCommentTree(comments, commentTree)
            console.log("comments loaded:" + commentTree.length)
            if (commentTree.length > 0) setCommentsLoaded(true)
            _setNewComment({post_id: currPost.post_id})
        }
        if (!commentsLoaded) {
            console.log("loading comments")
            loadComments().then(() => console.log(commentTree));
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
        setNewComment({post_id: undefined, author: undefined, parent: 0, content: undefined})
    }

    return (
        !!currPost &&
        <>
            <Page kind="narrow">
                <PageContent>
                    <Card>
                        <CardHeader>
                            <Grid
                                rows={['xxsmall', 'xsmall']}
                                columns={['small', 'large']}
                                gap="small"
                                areas={[
                                    { name: 'rating', start: [0, 1], end: [0, 1] },
                                    { name: 'title', start: [1, 1], end: [1, 1] },
                                ]}
                            >
                                <Box gridArea="rating" background="dark-2" >
                                    <h2>{currPost.rating}</h2>
                                </Box>
                                <Box gridArea="title" background="light-2">
                                    <h3>{currPost.title}</h3>
                                </Box>
                                <h2>{currPost.author}</h2>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <p>{currPost.content}</p>
                        </CardBody>
                        <CardFooter pad={{horizontal: "small", bottom:"small"}} margin="small">
                            <Button primary label="Add Comment" pad="xsmall" onClick={() => {addComment(newComment)}}></Button>

                            <TextArea rows={2}
                                onChange={(event) => _setNewComment({content: event.target.value})}>
                            </TextArea>
                        </CardFooter>
                    </Card>
                    {commentTree.map(c => {
                        return <><Comment comment={c}></Comment></>
                    })}
                </PageContent>
            </Page>
        </>
    )
}