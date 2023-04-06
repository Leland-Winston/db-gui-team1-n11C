import { Box, Card, CardBody, CardFooter, CardHeader, Header } from "grommet";
import react from "react";

export default function Comment({ comment, onClick }) {
    return (<>
        <Box>
            <Card>
                <CardHeader background={{ color: "brand" }}>
                    <h3>{comment.author}</h3>
                </CardHeader>
                <CardBody>
                    <p>{comment.content}</p>
                </CardBody>
                <CardFooter>
                    {comment.children.map(c => {
                        <Comment comment={c}></Comment>
                    })}
                </CardFooter>
            </Card>


        </Box>
    </>)
}