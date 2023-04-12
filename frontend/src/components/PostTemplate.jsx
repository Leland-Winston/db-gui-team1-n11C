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
  ThumbsRating
} from "grommet";
import { useNavigate } from "react-router-dom";

const PostTemplate = ({ currPost }) => {
  let navigate = useNavigate();
  const size = React.useContext(ResponsiveContext);
  let [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Card>
      <div style={{ cursor: 'pointer' }} onClick={() => navigate('/garage/' + currPost.garage + '/post/' + currPost.post_id)}>

        <CardHeader pad="small">
          <Box pad="none" direction="column" justify="end">
            <Heading level={4} margin="none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={isHover ? { textDecoration: 'underline' } : { textDecoration: 'none' }}>
              {currPost.title}
            </Heading>
            <Heading level={6} margin="none">
              {currPost.user}
            </Heading>
          </Box>
        </CardHeader>
        <CardBody pad="small">
          <Paragraph maxLines={size === "small" ? 1 : 5} margin={{ top: 'none' }}>
            {currPost.content}
          </Paragraph>
        </CardBody>
      </div>

      <CardFooter pad="small" background="background-contrast">
        <ThumbsRating></ThumbsRating>
      </CardFooter>
    </Card>
  );
};
export default PostTemplate;