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
  InfiniteScroll
} from "grommet";

const PostTemplate = ({title, user, date, text, comments }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Card>
      <CardHeader pad="small">
        <Box pad="large" direction="column" justify="end" >
          <Heading level={4} margin="none" align = "center">
            {title}
          </Heading>
          <Heading level={6} margin="none">
            {user}
          </Heading>
          <Heading level={6} margin="none">
            {date}
          </Heading>
        </Box>

      </CardHeader>
      <CardBody pad="large">
        <Paragraph maxLines={size === "small" ? 1 : 10} margin = {{ top: 'none'}}>
          {text}
        </Paragraph>

        <InfiniteScroll comments = {comments} />
          {comments.map((comment) => (
            <Card>
              <CardHeader pad="small">
                <Box pad="large" direction="column" justify="end">
                  <Heading level={4} margin="none" align = "center">
                    {comment.username}
                  </Heading>
                  <Heading level={6} margin="none">
                    {comment.date}
                  </Heading>
                </Box>
              </CardHeader>

              <CardBody pad = "large">
                  <Paragraph maxLines={size === "small" ? 1 : 10} margin = {{ top: 'none'}}>
                    {comment.text}
                  </Paragraph>
              </CardBody>
            </Card>
          ))}
      </CardBody>
    </Card>
  );
};

export default PostTemplate;