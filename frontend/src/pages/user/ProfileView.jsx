import { Card, CardBody, CardHeader, Heading, Page, PageContent } from "grommet";
import PostTemplate from "../../components/PostTemplate";
import { Sidebar } from "grommet-icons";
import React from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi";
export const ProfileView = ({ user }) => {
    const s = useParams().username;
    let data = {
        username: ""
    };

    getUserByUsername(s).then(x => { data = x[0] })
    return (
        data.username != "" && <>
            {data.username}
            <Page>
                <PageContent>
                    <Card>
                        <CardHeader>
                            <Heading>My Posts</Heading>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                    <Sidebar>

                    </Sidebar>
                </PageContent>
            </Page>

        </>)
}