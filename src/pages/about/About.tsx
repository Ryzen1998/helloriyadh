import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import agent from "../../Api/agent"
import { useState } from 'react';

const About = () => {
  const [validationError,setValidationError]=useState<string[]>([]);

  const getValidationError=()=>{
    agent.serverDebugger.getValidationError().
    then(()=>console.log('never seeing this')).catch(error=>setValidationError(error))
  }
  return (
    <>
   <Container>
    
    <Typography gutterBottom variant="h2">Server Errors test</Typography>
    <ButtonGroup fullWidth>
<Button variant="contained" onClick={()=>agent.serverDebugger.get400Error().catch(error=>console.log(error))}>Test Error 400</Button>
<Button variant="contained" onClick={()=>agent.serverDebugger.get401Error().catch(error=>console.log(error))}>Test Error 401</Button>
<Button variant="contained" onClick={()=>agent.serverDebugger.get404Error().catch(error=>console.log(error))}>Test Error 404</Button>
<Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
<Button variant="contained" onClick={()=>agent.serverDebugger.getApiError().catch(error=>console.log(error))}>Test Api Error</Button>
    </ButtonGroup>
    {validationError.length>0 &&(
      <Alert severity="error">
        <AlertTitle>Validation Title</AlertTitle>
        <List>
          {validationError.map((item,key)=>(
            <ListItem key={key}>
              <ListItemText>{item}</ListItemText>
            </ListItem>

          ))}
        </List>
      </Alert>
    )}
   </Container>
    </>
  )
}

export default About