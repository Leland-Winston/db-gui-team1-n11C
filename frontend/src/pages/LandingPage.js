import React from "react";
import {
    Grid,
    Page,
    PageContent,
    PageHeader
  } from "grommet";
  import PostTemplate from "../components/PostTemplate";
function LandingPage(){
    
    return(<>
        <Page>
        <PageContent>
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