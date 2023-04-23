import { useState, useContext } from "react";
import UserContext  from "../../UserContext";
import { Accordion, AccordionPanel, Card, CardBody, CardFooter, CardHeader, Button, TextArea } from "grommet";

export default function Comment({ comment, addComment }) {
    let currUser = useContext(UserContext);

    let aComment = {
        post_id: comment.post_id,
        author: currUser,
        parent: comment.comment_id,
        content: undefined,
        rating: 0
    }

    let [newComment, setNewComment] = useState(aComment);

    const _setNewComment = (delta) => {
        setNewComment({ ...newComment, ...delta })
    }

    return (<>
        <Card margin={{bottom: "medium"}}>
            <CardHeader background={{ color: "brand" }}>
                <h4>{comment.author}</h4>
            </CardHeader>
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
            <CardFooter pad={{bottom:"small"}}>
                <Button primary pad="xsmall" margin={{left: "medium", right: "medium"}} label="Add comment" onClick={() => {addComment({ newComment })}}></Button> 
                <TextArea rows={1} margin={{right:"medium"}} onChange={(event) => _setNewComment({content: event.target.value})}></TextArea>
            </CardFooter>
            <Accordion>
                <AccordionPanel>
                    {comment.children.map(c => {
                        return <Comment pad="xsmall" comment={c} addComment={addComment}></Comment>
                    })}
                </AccordionPanel>
         </Accordion>
        </Card>
    </>)
}