import axios from "axios";
import React, { useState, useContext } from "react";
import { Login } from "../pages/user/login.jsx";
import { deepMerge } from "grommet/utils";
import { Moon, Sun, Close, Send, User, Menu as MenuIcon } from "grommet-icons";
import appTheme from "../appTheme.json";
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  Grommet,
  grommet,
  Header,
  Heading,
  Menu,
  Nav,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Text,
  ThumbsRating,
} from "grommet";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import { deletePost } from "../api/postApi.js";

const PostTemplate = ({ currPost }) => {
  let navigate = useNavigate();
  let user = useContext(UserContext);
  const size = React.useContext(ResponsiveContext);
  let [isHover, setIsHover] = useState(false);
  let [visible, setVisible] = useState(true);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <Card onClick={()=>{}}>
        <CardHeader pad="small">
          <Box pad="none" direction="column" justify="end">
            <Heading
              level={3}
              margin="none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={
                isHover
                  ? { textDecoration: "underline" }
                  : { textDecoration: "none" }
              }
            >
              {currPost.title}
            </Heading>
            <Box direction="row">
            <Anchor
              size="xsmall"
              onClick={() => navigate("/profile/" + currPost.author)}
            >
              {currPost.author}
            </Anchor>
            <Text size="small">•</Text>
            <Anchor
              size="xsmall"
              
              onClick={() => navigate("/garage/" + currPost.garage)}
            >
              {currPost.garage}
            </Anchor>
          </Box>
          </Box>
          {user === currPost.author && (
            <Box direction="row" justify="end">
              <Button
                label="X"
                onClick={() => {
                  deletePost(currPost.post_id);
                  setVisible(false);
                }}
              ></Button>
            </Box>
          )}
        </CardHeader>
        <CardBody
          pad="small"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/garage/" + currPost.garage + "/post/" + currPost.post_id)
          }
        >
          <Paragraph
            maxLines={size === "small" ? 1 : 5}
            margin={{ top: "none" }}
          >
            {currPost.content}
          </Paragraph>
        </CardBody>
        <CardFooter pad="small" background="background-contrast">
          {"Score: " + currPost.rating}
        </CardFooter>
      </Card>
    </div>
  );
};
export default PostTemplate;
