import React from "react";
import { useContext, useState } from "react";
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
import { getUserByUsername, createUser } from "../../api/userApi";
import { useNavigate, NavLink, Anchor } from "react-router-dom";
const theme = deepMerge(grommet, appTheme);
const credentials = {
    username: '',
    password: '',
    confirmPassword: '',
}
export const Register = ({setCurrentUser}) => {
    let navigate = useNavigate();
    let [validCredentials, setValidCredentials] = useState(true);
    let [errorMessage, setErrorMessage] = useState("");
    const [formValues, setFormValues] = useState(credentials);
    const _setFormValue = (delta) => {
        setFormValues({ ...formValues, ...delta })
    }
    const login = () => {
        getUserByUsername(formValues.username).then(x => {
          if (!!x[0]) {
            setCurrentUser(x[0].username);
            window.localStorage.setItem('currentUser', x[0].username);
            navigate('/');
          }
        })
      }
    const registerUser = () => {
        if (formValues.password === formValues.confirmPassword) {
            setValidCredentials(true)
            getUserByUsername(formValues.username).then(x => {
                if (!!x[0]) {
                    setValidCredentials(false)
                    setErrorMessage("User Already Exists")
                }
                else {
                    createUser({
                        username: formValues.username,
                        password: formValues.password,
                        admin: false
                    }).then(login())
                }
            })
        }
        else {
            setValidCredentials(false)
            setErrorMessage("Invalid Credentials")
        }
    }
    return (<>
        <Page>
            <PageContent>
                <Box align="center">
                    <Heading>Create New Account</Heading>
                    <Form>
                        <Box align="center" pad="small" border="top">
                            <FormField label="Username" name="username" required
                                onChange={e => {
                                    _setFormValue({ username: e.target.value })
                                }}>
                                <Box
                                    width="medium"
                                    direction="row"
                                    margin="small"
                                    align="center"
                                    round="small"
                                    border>
                                    <TextInput plain name="username" />
                                </Box>
                            </FormField>
                        </Box>
                        <Box align="center" pad="small" border="top">
                            <FormField label="Password" name="password" required
                                onChange={e => {
                                    _setFormValue({ password: e.target.value })
                                }}>
                                <Box
                                    width="medium"
                                    direction="row"
                                    margin="small"
                                    align="center"
                                    round="small"
                                    >
                                    <PasswordField />
                                </Box>
                            </FormField>
                        </Box>
                        <Box align="center" pad="small" border="top">
                            <FormField label="Confirm Password" name="confirmPassword" required
                                onChange={e => {
                                    _setFormValue({ confirmPassword: e.target.value })
                                }}>
                                <Box
                                    width="medium"
                                    direction="row"
                                    margin="small"
                                    align="center"
                                    round="small"
                                    >
                                    <PasswordField />
                                </Box>
                            </FormField>
                        </Box>
                        <Box align="center">
                            <Button type="submit" label="Register" primary fill="horizontal"
                                onClick={() => registerUser()} />
                            {!validCredentials &&
                                <Text pad="small">{errorMessage}</Text>
                                ||
                                <>
                                </>
                            }
                        </Box>
                    </Form>
                </Box>
            </PageContent>
        </Page>
    </>)
}