import { useState } from "react";
import { CreateComment } from "../../api/postApi";
import { Accordion, AccordionPanel, Card, CardBody, CardFooter, CardHeader, Button } from "grommet";

export default function Comment({ comment, onClick }) {
    return (<>
        <Card margin={{bottom: "medium"}}>
            <CardHeader background={{ color: "brand" }}>
                <h4>{comment.author}</h4>
            </CardHeader>
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
            <CardFooter>
                <Button primary label="Create Comment" pad="small" 
                    > </Button>
            </CardFooter>
            <Accordion>
                <AccordionPanel>
                    {comment.children.map(c => {
                        return <Comment margin={{right: "large", left: "large"}} comment={c}></Comment>
                    })}
                </AccordionPanel>
         </Accordion>
        </Card>
    </>)
}