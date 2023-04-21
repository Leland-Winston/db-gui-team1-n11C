import {
  Box,
  Button,
  Page,
  PageContent,
  Form,
  FormField,
  TextInput,
  TextArea,
  Select
} from "grommet";
import { createPost } from "../../api/postApi";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../UserContext";
import { Navigate } from "grommet-icons";
import { createCar, getCarFromGarage, getModelsFromGarage } from "../../api/carApi";


export const NewPost = () => {
  let currUser = useContext(UserContext)
  let params = useParams();
  let navigate = useNavigate();
  let [models, setModels] = useState([])
  let [modelList, setModelList] = useState([])
  let [model, setModel] = useState('');
  const post = {
    author: '',
    title: '',
    content: '',
    garage: '',
    car_id: null,
    model: '',
    year: null
  }

  const [formValues, setFormValues] = useState(post);
  const _setFormValue = (delta) => {
    setFormValues({ ...formValues, ...delta })
  }
  useEffect(() => {
    console.log(currUser)
    console.log(params.garage)
    _setFormValue({ author: currUser, garage: params.garage })
    const loadModels = async () => getModelsFromGarage(params.garage).then(x => {
      if (!!x[0]) {
        x.forEach(m => {
          if (!models.includes(m)) {
            models.push(m.model)
          }
        })
      }
    })
    loadModels().then(() => {
      models = models.filter((m, index) => {
        return models.indexOf(m) === index;
      })
      setModelList(models);
    })
  }, [])
  const verifyCar = async () => {
    await getCarFromGarage(params.garage, formValues.model, formValues.year)
      .then(x => {
        if (!!x[0]) _setFormValue({ car_id: x[0].car_id })
        else {
          createCar(params.garage, formValues.model, formValues.year);
        }
      })
  }
  const _createPost = async () => {
    await verifyCar();
    getCarFromGarage(params.garage, formValues.model, formValues.year)
      .then(x => {
        createPost({
          author: currUser,
          title: formValues.title,
          content: formValues.content,
          garage: params.garage,
          car_id: x[0].car_id
        });
        setFormValues({ title: "", content: "" });
        navigate('/garage/' + params.garage)
      })
  }
  return (
    <>
      <Page>
        <PageContent>
          <Form>
            <FormField label="Post Title" required>
              <TextInput
                value={formValues.title}
                onChange={(event) => _setFormValue({ title: event.target.value })}
              ></TextInput>
            </FormField>
            <FormField label="Content" required>
              <TextArea
                value={formValues.content}
                rows={6}
                onChange={(event) => _setFormValue({ content: event.target.value })}
              ></TextArea>
            </FormField>

            <Select
              options={modelList}
              onChange={option => _setFormValue({ model: option.value })}>
            </Select>
            <Select
              options={Array.from({ length: 100 }, (v, k) => 123 - k + 1900)}
              onChange={option => _setFormValue({ year: option.value })}>
            </Select>
            <Button
              label="submit"
              onClick={async () => {
                await _createPost()
              }}
            />

          </Form>


        </PageContent>
      </Page>
    </>
  );
};
