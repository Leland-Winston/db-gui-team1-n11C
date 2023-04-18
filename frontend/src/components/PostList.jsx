import {
  Accordion,
  AccordionPanel,
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

export const PostList = ({ title, posts }) => {
  return (
    <>
          <Table>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.post_id}>
                  <TableCell>
                    <PostTemplate currPost={post}></PostTemplate>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </>
  );
};
