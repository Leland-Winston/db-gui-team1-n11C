import {
  Button,
  Page,
  PageContent,
  Form,
  FormField,
  TextInput,
  TextArea,
} from "grommet";
import { createPost } from "../../api/postApi";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../UserContext";


export const NewPost = () => {
  let currUser = useContext(UserContext)
  let params = useParams();
  const post = {
    author: '',
    title: '',
    content: '',
    garage_id: '',
  }

  const [formValues, setFormValues] = useState(post);
  const _setFormValue = (delta) => {
    setFormValues({ ...formValues, ...delta })
  }

  useEffect(() => {
    console.log(currUser)
    console.log(params.garage)
    _setFormValue({ author: currUser, garage: params.garage })
  }, [])
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
            <Button
              label="submit"
              onClick={() => {
                createPost({
                  author: params.username,
                  title: formValues.title,
                  content: formValues.content,
                  parent: null,
                  garage_id: params.garage
                });
                setFormValues({ title: "", content: "" })
              }}
            />
          </Form>
        </PageContent>
      </Page>
    </>
  );
};
