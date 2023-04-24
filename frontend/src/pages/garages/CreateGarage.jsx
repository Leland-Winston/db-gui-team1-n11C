import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page, PageContent, Grid, Button, Box, Card, CardHeader, CardBody, CardFooter, Heading, Paragraph, Form, FormField, TextInput, TextArea, Tag } from "grommet";
import UserContext from "../../UserContext";

import { createGarage, getGarageByName, editGarage } from "../../api/garageApi";
import { Cards } from "grommet/components";
import { createCar, createNewCarModel, getModelsFromGarage } from "../../api/carApi";

const garageValues = {
    creator: "",
    name: "",
    description: "",
}


export const CreateGarage = ({ mode }) => {
    let [formValues, setformValues] = useState(garageValues);
    let currGarage = useParams().garage;
    let currUser = useContext(UserContext);
    let navigate = useNavigate();
    let [models, setModels] = useState([])
    let [carInput, setCarInput] = useState('')
    let [errors, setErrors] = useState(false)
    const addModel = (model) => {
        setModels([...models, model]);
        setCarInput('')
    }
    const removeModel = (model) => {
        setModels(models.filter(x => x !== model))
    }
    const _setFormValue = (delta) => {
        setformValues({ ...formValues, ...delta });
    }
    const sendGarage = async () => {
        if (mode == "edit") {
            editGarage(formValues).then(() => {
                models.forEach(m => {
                    createCar(formValues.name, m, 0)
                })
            })

        }
        else {
            await getGarageByName(formValues.name).then(async x => {
                if (!!x[0]) {
                    setErrors(true)
                }
                else {
                    await createGarage(formValues);
                    models.forEach(m => {
                        createCar(formValues.name, m, 0)
                    })
                }
            })
        }

        navigate("/garage/" + formValues.name);

    }
    useEffect(() => {
        _setFormValue({ creator: currUser });
        if (mode == "edit") {
            getGarageByName(currGarage).then(x => {
                _setFormValue(x[0])
            })
        }
    }, []);

    return (<>
        <Page kind="narrow">
            <PageContent>
                <Form>
                    <FormField label="Garage Name" required>
                        <TextInput
                            disabled={mode == "edit"}
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
                    {mode == "edit" || <Grid columns={['small', 'flex']}
                        rows={['small', 'flex']}
                        areas={[
                            { name: 'label', start: [0, 0], end: [1, 0] },
                            { name: 'carDisplay', start: [1, 0], end: [1, 0] }
                        ]}>
                        <Box gridArea="label">
                            <h5>Add Car to Garage</h5>
                            <TextInput value={carInput}
                                onChange={(x) => setCarInput(x.target.value)}>
                            </TextInput>
                            <Button label="Add Model"
                                onClick={() => {
                                    if (carInput != '' && !models.includes(carInput)) addModel(carInput)
                                }}></Button>
                        </Box>
                        <Box gridArea="carDisplay" pad={'small'} style={{ display: 'flex' }}>
                            {
                                models.map(x => {
                                    return <Card width={'max-Content'} pad={'small'}>
                                        <CardHeader>{x}
                                            <Button label="X"
                                                onClick={() => { removeModel(x) }}></Button></CardHeader>
                                    </Card>
                                })
                            }
                        </Box>
                    </Grid>}
                    {errors && <p>A Garage with this name already exists</p>}
                    <Button
                        primary
                        disabled={mode != "edit" && (models.length < 1 && !errors)}
                        label={mode == "edit" ? "Update Garage" : "Create Garage"}
                        onClick={() => {
                            sendGarage();
                        }}
                    ></Button>

                </Form>
            </PageContent>
        </Page>
    </>);
}