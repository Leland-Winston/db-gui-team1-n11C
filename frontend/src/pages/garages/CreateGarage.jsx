import React from "react";
import { useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Page, PageContent, Grid, Button, Box, Card, CardHeader, CardBody, CardFooter, Heading, Paragraph, Form, FormField, TextInput, TextArea} from "grommet";
import UserContext from "../../UserContext";

import {createGarage} from "../../api/garageApi";

const garageValues = {
    creator: "",
    name: "",
    description: "",
}

export const CreateGarage = () => {
    let [formValues, setformValues] = useState(garageValues);
    let currUser = useContext(UserContext);
    let navigate = useNavigate();
    
    const _setFormValue = (delta) => {
        setformValues({ ...formValues, ...delta });
    }

    const sendGarage = () => {
        createGarage(formValues);
        navigate("/garage/" + formValues.name);
    }

    useEffect (() => {
        _setFormValue({ creator: currUser });
    }, []);

    return (<>
        <Page kind="narrow">
            <PageContent>
                <Form>
                    <FormField label="Garage Name" required>
                        <TextInput
                            value={formValues.name}
                            onChange={(event) => _setFormValue({ name: event.target.value })}
                        ></TextInput>
                    </FormField>

                    <FormField label="Description" required>
                        <TextArea
                            value={formValues.description}
                            rows={6}
                            onChange={(event) => _setFormValue({ description: event.target.value })}
                        ></TextArea>
                    </FormField>
                    
                    <Button
                        label="submit"
                        onClick={() => {
                            sendGarage();
                        }}
                    ></Button>
                </Form>
            </PageContent>
        </Page>
    </>);
}