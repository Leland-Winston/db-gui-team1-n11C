// create a login page using grommet components
import React from 'react';
import { Grommet } from 'grommet';
import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';

export const Login = ()=> {
    return (
        <Grommet>
            <Box align = "center" pad= "medium">
                // create a text field area for username
                <FormField label="Username" name="username" required>
                    <TextInput name="username" />
                </FormField>
    
                // create a text field area for password
                <FormField label="Password" name="password" required>
                    <TextInput name="password" type="password" />
                </FormField>
    
                // create a button for login
                <Button type="submit" label="Login" primary />
            </Box>
        </Grommet>
    );
}