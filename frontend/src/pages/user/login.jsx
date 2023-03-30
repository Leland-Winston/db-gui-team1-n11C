// create a login page using grommet components
import React, { useContext, useState } from "react";
import { Grommet, PageContent, SelectMultiple, Text } from "grommet";
import {
  Box,
  Button,
  Form,
  FormField,
  grommet,
  Heading,
  Page,
  Select,
  TextInput,
} from "grommet";
import { PasswordField } from "../../components/PasswordField";
import { deepMerge } from "grommet/utils";
import appTheme from "../../appTheme.json";
import UserContext from "../../UserContext";
import { getUserByUsername } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
const theme = deepMerge(grommet, appTheme);
const options = ["Ford", "Toyota", "Subaru", "Kia", "Honda", "Hyundai"];
const credentials = {
  username: '',
  password: ''
}
export const Login = ({ setCurrentUser }) => {
  let navigate = useNavigate();
  let [validCredentials, setValidCredentials] = useState(true);
  const [formValues, setFormValues] = useState(credentials);
  const _setFormValue = (delta) => {
    setFormValues({ ...formValues, ...delta })
  }
  const login = () => {
    console.log(formValues);
    getUserByUsername(formValues.username).then(x => {
      if (x[0]) {
        setCurrentUser({
          username: x[0].username,
          id: x[0].user_id
        });
        navigate('/', { replace: true })
      }
      else {
        setValidCredentials(false)
      }
    })
  }

  return (
    <Page>
      <PageContent>
        <Box align="center">
          <Form>
            <Box align="center" pad="small" border="top">
              <FormField label="Username" name="username" required
                onChange={e => {
                  _setFormValue({ username: e.target.value })
                }}>
                <Box
                  width="medium"
                  direction="row"
                  margin="large"
                  align="center"
                  round="small"
                  border
                >
                  <TextInput plain name="username" />
                </Box>
              </FormField>
            </Box>
            <Box align="center" pad="small">
              <FormField label="Password" name="password" required
                onChange={e => {
                  _setFormValue({ password: e.target.value })
                }}>
                <PasswordField ></PasswordField>
              </FormField>
            </Box>
            <Box align="center">
              <Button type="submit" label="Login" primary fill="horizontal"
                onClick={() => login()} />
              {!validCredentials &&
                <Text>Invalid Credentials</Text>
                ||
                <></>
              }
            </Box>
          </Form>
        </Box>
      </PageContent>
    </Page>
  );
};
