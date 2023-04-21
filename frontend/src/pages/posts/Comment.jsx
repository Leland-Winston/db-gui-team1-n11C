import { Accordion, AccordionPanel, Box, Card, CardBody, CardFooter, CardHeader, Header, Button} from "grommet";

export default function Comment({ comment, onClick }) {
    return (<>

        <Card margin={{bottom: "medium"}}>
            <CardHeader background={{ color: "brand" }}>
                <h4>{comment.author}</h4>
            </CardHeader>
            <CardBody>
                <p>{comment.content}</p>
            </CardBody>
            <CardFooter background={{color: "light-3"}}>
                <Button primary label="Create Comment" pad="medium"> </Button>
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