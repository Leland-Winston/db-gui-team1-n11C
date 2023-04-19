import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardHeader,
  Header,
  ResponsiveContext,
  Text
} from "grommet";
import { useNavigate } from "react-router-dom";

export const GarageBrowser = ({ garages }) => {
  let navigate = useNavigate();

  return (
    <>
        <Card
          pad={{ bottom: "medium", horizontal: "medium" }}
          height="max-content"
          border="white"
          margin={{ top: "large", left: "large" }}
          round
        >
          <CardHeader>
            <Header>
              <h4>Browse Garages</h4>
            </Header>
          </CardHeader>
          {garages.map((g) => {
            return (
              <>
                <Button
                  key={g.name}
                  label={g.name}
                  margin="xsmall"
                  onClick={() => navigate("/garage/" + g.name)}
                ></Button>
              </>
            );
          })}
          <Button
            margin="medium"
            label="Create Garage"
            onClick={() => navigate("/newgarage/")}
          ></Button>
        </Card>
    </>
  );
};