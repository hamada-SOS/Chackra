import React, { useEffect, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useResultContext } from "../../Global/resultContext";
import { fetchContestDetails } from "../../api";
import axios from "axios";

const ContestDetailsP: React.FC = () => {

  const navigate = useNavigate();
  const {contestDetails, setContestDetails, isActive, setIsActive} = useResultContext()
  const [tabValue, setTabValue] = useState("1");
  const location = useLocation();
  const { contestIdd, nameId } = location.state || { contestIdd: null , nameId:null};
  const [alertOpen, setAlertOpen] = useState(false); // State to control the Snackbar visibility




  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSolveClick = (contestIdd: number, isActive: boolean) => {
    if (isActive) {
      navigate(`/ContestSolvingPage`, {
        state: { contestIdd, isContestProblem: true },
      });
    } else {
      setAlertOpen(true);
      setIsActive(false); // Ensure state reflects the inactive contest
    }
  };
  
  const handleCloseAlert = () => {
    setAlertOpen(false); // Close the alert
  }

  useEffect(() => {
    console.log('isActive state:', isActive);
  }, [isActive]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (contestIdd) {
          const response = await fetchContestDetails(contestIdd);
          setContestDetails(response);
        }
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };
  
    fetchDetails();
  }, [contestIdd, setContestDetails]);
  


  return (
    <Box>
      <Navbar />
      <Box p={3} sx={{ backgroundColor: "background.default" }}>
        <Paper elevation={3} sx={{ p: 2, background: "#d2dff3", height: "720px" }}>
          <TabContext value={tabValue}>
            <Box borderBottom={1} borderColor="divider">
              <TabList onChange={handleTabChange} aria-label="contest details tabs">
                <Tab label="Participants" value="1" />
                <Tab label="Start Contest" value="2" />
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
  
            <TabPanel value="2">
              <Button variant="outlined" onClick={() => handleSolveClick(contestIdd, isActive)}>
                Start Solve
              </Button>
              <Snackbar
                  open={alertOpen}
                  autoHideDuration={3000}
                  onClose={handleCloseAlert}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert onClose={handleCloseAlert} severity="warning">
                    Contest is not active yet.
                  </Alert>
                </Snackbar>
            </TabPanel>
          </TabContext>
        </Paper>
      </Box>
    </Box>
  );
}
  
export default ContestDetailsP;
