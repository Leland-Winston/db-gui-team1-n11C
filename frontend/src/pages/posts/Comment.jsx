import { Box, Card, CardBody, CardFooter, CardHeader, Header } from "grommet";
import react from "react";

export default function Comment({ comment, onClick }) {
    return (<>

        <Card>
            <CardHeader background={{ color: "brand" }}
                pad={'xxsmall'}>
                <h4>{comment.author}</h4>
            </CardHeader>
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
            <CardFooter>
                {comment.children.map(c => {
                    return <Comment comment={c}></Comment>
                })}
            </CardFooter>
        </Card>

    </>)
}