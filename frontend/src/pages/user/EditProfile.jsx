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
import {
  getUserByUsername,
  updatePassword,
  updateUsername,
} from "../../api/userApi";
import { useState } from "react";
import UserContext from "../../UserContext";
import { PasswordField } from "../../components/PasswordField";

export const EditProfile = () => {
  const params = useParams();
  const username = params.username;
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({
    currPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [validCredentials, setValidCredentials] = useState(true);
  const _setFormValue = (delta) => {
    setFormValues({ ...formValues, ...delta });
  };
  useEffect(() => {
    getUserByUsername(username).then((x) => setUser(x[0]));
  }, []);

  const verify = () => {
    console.log(formValues);
    if (user.password != formValues.currPass) {
      setValidCredentials(false);
      alert("current password is wrong");
    } else if (formValues.newPass !== formValues.confirmPass) {
      setValidCredentials(false);
      alert("new passwords must match");
    } else {
      setValidCredentials(true);
      updateUser();
    }
  };
  const updateUser = () => {
    if (!validCredentials) {
      return;
    }
    updatePassword({ name: username, newPass: formValues.newPass }).then(
      navigate("/profile/" + username)
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
                  {/* <Button label="Change Avatar"></Button> */}
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
                  <FormField label="Enter your current password">
                    <Box border round="small">
                      <TextInput
                        plain
                        name="current password"
                        onChange={(e) => {
                          _setFormValue({ currPass: e.target.value });
                        }}
                      />
                    </Box>
                  </FormField>
                  <FormField label="New Password">
                    <TextInput
                      onChange={(e) => {
                        _setFormValue({ newPass: e.target.value });
                      }}
                    ></TextInput>
                  </FormField>
                  <FormField label="Confirm Password">
                    <TextInput
                      onChange={(e) => {
                        _setFormValue({ confirmPass: e.target.value });
                      }}
                    ></TextInput>
                  </FormField>
                  <Box direction="row">
                    <Box pad="small">
                      <Button
                        primary
                        label="Make Changes"
                        onClick={() => verify()}
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
