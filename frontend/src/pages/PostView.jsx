import React from "react";
import { Card, CardBody, CardHeader, Heading, Page, PageContent } from "grommet";
import PostTemplate from "../components/PostTemplate";
import { Sidebar } from "grommet-icons";

export const PostView = ({post}) => {
    return (<>
    <Page>
        <PageContent>
            <PostTemplate title={post.title} user={post.username} date={post.date} text={post.text} comments = {post.comments} />
        </PageContent>
    </Page>
    </>)
}