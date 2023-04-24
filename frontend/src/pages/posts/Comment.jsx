import { useState, useContext } from "react";
import UserContext from "../../UserContext";
import { createComment, deleteComment } from "../../api/postApi";
import { Accordion, AccordionPanel, Card, CardBody, CardFooter, CardHeader, Button, TextArea, Grid, Box } from "grommet";

export default function Comment({ comment }) {
    let currUser = useContext(UserContext);

    let aComment = {
        post_id: comment.post_id,
        author: currUser,
        parent: comment.comment_id,
        content: '',
    }

    let [newComment, setNewComment] = useState(aComment);
    let [visible, setVisible] = useState(true)
    const _setNewComment = (delta) => {
        setNewComment({ ...newComment, ...delta })
        console.log(newComment)
    }
    const _deleteComment = async () => {
        await deleteComment(comment.comment_id)
            .then(() => setVisible(false))
    }
    const addReply = async (reply) => {
        aComment = {
            post_id: reply.post_id,
            author: reply.author,
            parent: comment.comment_id,
            content: reply.content,
        }

        console.log(aComment)

        await createComment(aComment)
        setNewComment({ post_id: undefined, author: undefined, parent: null, content: '' })
    }

    return (visible && <>
        <Card margin={{ bottom: "medium" }}>
            <CardHeader background={{ color: "brand" }}>
                <h4>{comment.author}</h4>
                {currUser == comment.author && <Button label="Delete" onClick={() => _deleteComment()}></Button>}
            </CardHeader>
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
            <CardFooter pad={{ bottom: "small" }}>
                <Button primary pad="xsmall" margin={{ left: "medium", right: "medium" }} label="Add comment" onClick={() => { addReply(newComment) }}></Button>
                <TextArea rows={1} margin={{ right: "medium" }} value={newComment.content} onChange={(event) => _setNewComment({ content: event.target.value })}></TextArea>
            </CardFooter>

            <Accordion>
                <AccordionPanel>
                    {comment.children.map(c => {
                        return (<>
                            <Comment comment={c}></Comment>
                        </>)
                    })}
                </AccordionPanel>
            </Accordion>
        </Card>
    </>)
}