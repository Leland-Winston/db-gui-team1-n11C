// create a login page using grommet components
import React from "react";
import { Grommet, SelectMultiple } from "grommet";
import {
  Box,
  Button,
  Form,
  FormField,
  grommet,
  Heading,
  Select,
  TextInput,
} from "grommet";
import { PasswordField } from "../components/PasswordField";
import { deepMerge } from "grommet/utils";
import appTheme from "../appTheme.json";

const theme = deepMerge(grommet, appTheme);
const options = ["Ford", "Toyota", "Subaru", "Kia", "Honda", "Hyundai"];

export const Login = () => {
  return (
    <Grommet theme={theme}>
      <Box align="center">
        <Form>
          <Box align="center" pad="small" border="top">
            <FormField label="Username" name="username" required>
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
            <FormField label="Password" name="password" required>
              <PasswordField></PasswordField>
            </FormField>
          </Box>
          <Box align="center" pad="small">
            <FormField label="Interests" name="interests">
            <Box
                width="medium"
                direction="row"
                margin="large"
                align="center"
                alignContent="stretch"
                round="small"
                border
              >
              <SelectMultiple
                name="select"
                placeholder="Brands"
                options={options}
                labelKey="label"
                valueKey="value"
                alignSelf="stretch"
                plain
              />
              </Box>
            </FormField>
          </Box>

          <Box align="center">
            <Button type="submit" label="Login" primary fill="horizontal" />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
};
