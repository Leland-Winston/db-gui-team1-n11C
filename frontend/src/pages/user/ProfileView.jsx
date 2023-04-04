import { Card, CardBody, CardHeader, Heading, Page, PageContent } from "grommet";
import PostTemplate from "../../components/PostTemplate";
import { Sidebar } from "grommet-icons";
import React from "react";

export const ProfileView = ({user}) => {
    


    return (<>
    <Page>
        <PageContent>
        <Heading>{user.name}</Heading>
        <Heading>Is admin: {user.admin ? "True" : "False"}</Heading>
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