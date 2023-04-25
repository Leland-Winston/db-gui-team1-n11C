import {
  Accordion,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Data,
  DataTable,
  Heading,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "grommet";
import { Search } from "grommet-icons";
import PostTemplate from "./PostTemplate";
import { DataSearch, TextInput } from "grommet/components";
import { useEffect, useState } from "react";

export const PostList = ({ title, posts }) => {
  const getFilteredPosts = () => {
    let _filteredPosts = posts.filter(
      (post) =>
        post.title.includes(searchText) ||
        post.content.includes(searchText) ||
        post.author.includes(searchText)
    );
    setFilteredPosts(_filteredPosts);
  };
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  useEffect(() => {
    getFilteredPosts();
  }, [filteredPosts]);

  return (
    <>
      <Box width={"medium"} margin={"small"}>
        <TextInput
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          icon={<Search />}
          placeholder="search for user or keyword"
        ></TextInput>
      </Box>
      <Box>
        <Table>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.post_id}>
                <TableCell>
                  <PostTemplate currPost={post}></PostTemplate>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
