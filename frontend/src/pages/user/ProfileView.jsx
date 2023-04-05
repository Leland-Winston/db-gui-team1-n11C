import { Card, CardBody, CardHeader, Heading, Page, PageContent } from "grommet";
import PostTemplate from "../../components/PostTemplate";
import { Sidebar } from "grommet-icons";
import React from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi";
import { useState } from "react";
export const ProfileView = () => {
    const s = useParams().username;
    let data = {
        username: ""
    };
    const [user, setUser] = useState({});

    getUserByUsername(s).then(x => { setUser(x[0]) })
    return (
        user.username != "" && <>
            {user.username}
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