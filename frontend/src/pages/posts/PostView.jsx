import react, { useEffect, useState, useContext } from "react";
import { getCommentsFromPost, getPostById } from "../../api/postApi";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { Page, Box, Grid, Card, CardBody, CardHeader, CardFooter, PageContent, Button } from "grommet";
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
    useEffect(() => {
        getPostById(id).then(x => {
            setCurrPost(x[0]);
        });
    }, [])
    useEffect(() => {
        async function loadComments() {
            const response = await getCommentsFromPost(id);
            setComments(response);
            constructCommentTree(comments, commentTree)
            console.log("comments loaded:" + commentTree.length)
            if (commentTree.length > 0) setCommentsLoaded(true)
        }
        if (!commentsLoaded) {
            console.log("loading comments")
            loadComments().then(() => console.log(commentTree));
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
                                <h6>{currPost.author}</h6>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <p>{currPost.content}</p>
                        </CardBody>
                        <CardFooter pad={{horizontal: "small", bottom:"small"}} margin="small">
                            <Button primary label="Create Comment" pad="medium"> </Button>
                        </CardFooter>
                    </Card>
                    {commentTree.map(c => {
                        return <Comment comment={c}></Comment>
                    })}
                </PageContent>
            </Page>
        </>
    )
}