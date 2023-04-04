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
} from "grommet";

const PostTemplate = ({ title, user, date }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Card>
      <CardHeader pad="small">
        <Box pad="none" direction="column" justify="end">
          <Heading level={4} margin="none">
            {title}
          </Heading>
          <Heading level={6} margin="none">
            {user}
          </Heading>
        </Box>
      </CardHeader>
      <CardBody pad="small">
        <Paragraph maxLines={size === "small" ? 3 : undefined}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          porttitor non nulla ac vehicula. Aliquam erat volutpat. Mauris
          auctor faucibus est at mattis. Aliquam a enim ac nisi aliquam
          consectetur et ac velit. Mauris ut imperdiet libero.
        </Paragraph>
      </CardBody>
      <CardFooter pad="small" background="background-contrast">
        {date}
      </CardFooter>
    </Card>
  );
};
export default PostTemplate;