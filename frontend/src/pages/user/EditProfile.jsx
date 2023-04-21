import {
  Avatar,
  Button,
  Box,
  Card,
  CardBody,
  CardHeader,
  FormField,
  Heading,
  Page,
  PageContent,
  TextInput,
} from "grommet";
import { Car } from "grommet-icons";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi";
import { useState } from "react";
import UserContext from "../../UserContext";
import { PasswordField } from "../../components/PasswordField";

export const EditProfile = () => {
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserByUsername(username).then((x) => setUser(x[0]));
  }, []);
  let currUser = useContext(UserContext);

  return (
    user.username != "" && (
      <>
        <Page>
          <PageContent>
            <Card margin="small">
              <CardHeader>
                <Box>
                  <Avatar background="brand" size="xlarge">
                    <Car size="large"></Car>
                  </Avatar>
                  <Button label="Change Avatar"></Button>
                <Heading level={2}>{user.username}</Heading>
                </Box>
              </CardHeader>
              <CardBody>
                <Box
                  pad="small"
                  direction="column"
                  align="start"
                  gap="medium"
                  fill="horizontal"
                >
                    <FormField label="New Username">
                    <Box border round="small">
                      <TextInput plain name="username" />
                      </Box>
                    </FormField>
                  <FormField label="New Password">
                    <PasswordField></PasswordField>
                  </FormField>
                  <FormField label="Confirm Password">
                    <PasswordField></PasswordField>
                  </FormField>
                  <Box direction="row">
                  <Box pad="small">
                  <Button primary label="Make Changes"></Button>
                  </Box>
                  <Box pad="small">
                  <Button label="Cancel" secondary></Button>
                  </Box>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </PageContent>
        </Page>
      </>
    )
  );
};
