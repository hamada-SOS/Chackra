import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Tab,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Navbar from "../../Components/Navbar/Navbar";
import { ContesttDetails } from "../../Problem";
import { useLocation, useNavigate } from "react-router-dom";

const ContestDetails: React.FC = () => {
  const navigate = useNavigate();
  const [contestDetails, setContestDetails] = useState<ContesttDetails | null>();
  const [tabValue, setTabValue] = useState("1");
  const location = useLocation();
  const { contestIdd } = location.state || { contestIdd: null };



  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const handleSolveClick = (contestIdd: number) => {
    navigate(`/ContestSolvingPage`, { state: {contestIdd, isContestProblem: true } });
  };

  return (
    <Box>
      <Navbar />
      <Box p={3} sx={{ backgroundColor: "background.default" }}>
        <Paper elevation={3} sx={{ p: 2, background: "#d2dff3", height: "720px" }}>
          <TabContext value={tabValue}>
            <Box borderBottom={1} borderColor="divider">
              <TabList onChange={handleTabChange} aria-label="contest details tabs">
                <Tab label="Participants" value="1" />
                <Tab label ="Start Contest" value="2"/>
              </TabList>
            </Box>

            <TabPanel value="1" sx={{display:'flex', justifyContent:'center'}}>
                          <Box sx={{width:"60%"}}>
                          <Typography variant="h2" gutterBottom>
                            Host
                          </Typography>
                          <List sx={{ mb: 5 }}>
                            {contestDetails?.participants
                              .filter((participant) => participant.userId === contestDetails.hostId)
                              .map((host) => (
                                <ListItem key={host.userId} divider>
                                  <ListItemText primary={host.username} />
                                </ListItem>
                              ))}
                          </List>
            
                          <Typography variant="h4" gutterBottom>
                            Participants
                          </Typography>
                          <List>
                            {contestDetails?.participants
                              .filter((participant) => participant.userId !== contestDetails.hostId)
                              .map((participant) => (
                                <ListItem key={participant.userId} divider>
                                  <ListItemText primary={participant.username} />
                                </ListItem>
                              ))}
                          </List>
            
                          </Box>
                          </TabPanel>
            <TabPanel value='2'>
                <Button variant="outlined" onClick={() => handleSolveClick(contestIdd)}>start sovle</Button>
            </TabPanel>
           
          </TabContext>
        </Paper>
      </Box>
     </Box>
  );
};

export default ContestDetails;
