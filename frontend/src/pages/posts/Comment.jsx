import { Accordion, AccordionPanel, Box, Card, CardBody, CardFooter, CardHeader, Header } from "grommet";
import react from "react";

export default function Comment({ comment, onClick }) {
    return (<>

        <Card>
            <CardHeader background={{ color: "brand" }}
                pad={'xsmall'}>
                <h4>{comment.author}</h4>
            </CardHeader>
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
            <CardFooter>
                <Accordion multiple={true}>
                    <AccordionPanel>
                        {comment.children.map(c => {
                            return <Comment comment={c}></Comment>
                        })}
                    </AccordionPanel>

                </Accordion>

            </CardFooter>
        </Card>

    </>)
}