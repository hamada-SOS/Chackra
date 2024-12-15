import React, { useState } from "react";
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider, TextField, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const ContestDetails: React.FC = () => {
  // Dummy Data
  const participants = [
    { id: 1, name: "Abdirahman Mohamed Osman" },
    { id: 2, name: "Abdirisak Hassan" },
    { id: 3, name: "Ismail Ali Salad" },
  ];

  const problems = [
    { id: 1, title: "Problem 1: Sum of Two Numbers" },
    { id: 2, title: "Problem 2: Reverse a String" },
  ];

  // State for Tab Switching
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Contest Details
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TabContext value={tabValue}>
          {/* Tabs Navigation */}
          <Box borderBottom={1} borderColor="divider">
            <TabList onChange={handleTabChange} aria-label="contest details tabs">
              <Tab label="Add Problems" value="1" />
              <Tab label="Participants" value="2" />
            </TabList>
          </Box>

          {/* Tab Panels */}
          <TabPanel value="1">
            {/* Add Problems Panel */}
            <Typography variant="h6" gutterBottom>
              Add Problems
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={2}>
              <TextField label="Problem Title" variant="outlined" fullWidth />
              <TextField label="Problem Description" variant="outlined" multiline rows={3} fullWidth />
              <Button variant="contained" color="primary">
                Add Problem
              </Button>
            </Box>
            <Divider />
            <Typography variant="subtitle1" mt={2} mb={1}>
              Added Problems
            </Typography>
            <List>
              {problems.map((problem) => (
                <ListItem key={problem.id} divider>
                  <ListItemText primary={problem.title} />
                </ListItem>
              ))}
            </List>
          </TabPanel>

          <TabPanel value="2">
            {/* Participants Panel */}
            <Typography variant="h6" gutterBottom>
              Participants
            </Typography>
            <List>
              {participants.map((participant) => (
                <ListItem key={participant.id} divider>
                  <ListItemText primary={participant.name} />
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
};

export default ContestDetails;
