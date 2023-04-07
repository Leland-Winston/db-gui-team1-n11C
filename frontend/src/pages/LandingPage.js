import React from "react";
import {
    Grid,
    Grommet,
    grommet,
    Page,
    PageContent,
    PageHeader
  } from "grommet";
  import AppBar from "../components/AppBar";
  import { useState } from "react";
  import PostTemplate from "../components/PostTemplate";
import PostView from "./posts/PostView";
function LandingPage(){
    
    return(<>
        <Page>
        <PageContent>
        <PostView id={1}></PostView>
          <PageHeader title="Popular Posts" />
          <Grid rows="small" gap="large" pad={{ bottom: "large" }}>
            <PostTemplate title={"I Love Cars"} user={"user1"} date={"Jan 1"} text={"Cars are my favorite"}/>
            <PostTemplate title={"I Love Cars"} user={"user1"} date={"Jan 1"} text={"Cars are my favorite"}/>
            <PostTemplate title={"I Love Cars"} user={"user1"} date={"Jan 1"} text={"Cars are my favorite"}/>
          </Grid>
        </PageContent>
        
      </Page>
    </>)
}
export default LandingPage;