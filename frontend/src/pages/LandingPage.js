import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
    Card,
    CardHeader,
    Grid,
    Header,
    Page,
    PageContent,
    PageHeader,
    Sidebar
  } from "grommet";
  import PostTemplate from "../components/PostTemplate";
import PostView from "./posts/PostView";
import { getAllGarages } from "../api/garageApi";
import { useNavigate } from "react-router-dom";
function LandingPage(){
  let navigate = useNavigate();
  let [garages, setGarages] = useState([]);
    let [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
      getAllGarages().then(x=>setGarages(x))
    }, [])
    return(<>
    <Grid
    fill
    areas={[
      { name: 'nav', start: [0, 0], end: [0, 0] },
      { name: 'main', start: [1, 0], end: [1, 0] },
    ]}
    columns={['medium', 'flex']}
    rows={['flex']}
    gap="small"
  >
      <Box gridArea="nav" >
        <Card pad={{bottom:"medium", horizontal:"medium"}} height="max-content"
      border="white"
      margin={{top:"large",
    left:"large"}}
      round>
        <CardHeader>
        <Header><h4>Browse  Garages</h4></Header>
        </CardHeader>
          {garages.map(g=>{
            return(<>
            <Button key={g.name} label={g.name}
            margin="xsmall"
            onClick={()=>navigate('/garage/' + g.name)}></Button>
            </>)
          })}
        </Card>
        
      </Box>
      <Box gridArea="main">
      <Page>
        <PageContent>
          <PageHeader title="Popular Posts" />
          <Grid rows="small" gap="large" pad={{ bottom: "large" }}>
          </Grid>
        </PageContent>
        
      </Page>
      </Box>
      
    </Grid>
        
    </>)
}
export default LandingPage;