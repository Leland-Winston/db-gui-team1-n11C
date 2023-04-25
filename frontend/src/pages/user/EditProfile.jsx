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
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername, updateUsername } from "../../api/userApi";
import { useState } from "react";
import UserContext from "../../UserContext";
import { PasswordField } from "../../components/PasswordField";

export const EditProfile = () => {
  const params = useParams();
  const username = params.username;
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({ newName: "" });
  const _setFormValue = (delta) => {
    setFormValues({ ...formValues, ...delta });
  };
  useEffect(() => {
    getUserByUsername(username).then((x) => setUser(x[0]));
  }, []);
  let currUser = useContext(UserContext);

  const updateUser = () => {
    getUserByUsername(formValues.newName).then(
      (x) => {
        if (!!x[0]) {
          alert("Username Already Exists");
        } else {
          updateUsername({
            username: username,
            newName: formValues.newName,
          }).then(navigate("/profile/" + formValues.newName));
        }
      }
      // if (formValues.password === formValues.confirmPassword) {
      //     setValidCredentials(true)
      //     getUserByUsername(formValues.username).then(x => {

      //     })
      // }
      // else {
      //     setValidCredentials(false)
      //     setErrorMessage("Invalid Credentials")
      // }
    );
  };

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
                      <TextInput
                        plain
                        name="username"
                        onChange={(e) => {
                          _setFormValue({ newName: e.target.value });
                        }}
                      />
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
                      <Button
                        primary
                        label="Make Changes"
                        onClick={() => updateUser()}
                      ></Button>
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
