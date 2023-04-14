import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeader,
  } from "grommet";
import PostTemplate from "./PostTemplate";

export const PostList = ({title, posts}) => {
    return (<>
    <Card margin="small">
              <Table>
                <TableHeader>
                  <Box margin="small">
                    <Heading>{title}</Heading>
                  </Box>
                </TableHeader>
                <TableBody>
                  {
                    posts.map(post => <TableRow key={post.post_id}>
                      <TableCell><PostTemplate currPost={post}></PostTemplate></TableCell>
                    </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </Card>
    </>)
}