import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import ContestCard from "../../Components/Contest/ContestCard";
import { useAuth } from "../../Global/Context";
import { ContestCards } from "../../Problem";

const ContestPage: React.FC = () => {
  const { nameId } = useAuth();
  const [contests, setContests] = useState<ContestCards[]>([]);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [newContest, setNewContest] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    hostId: nameId,
    participationType: "",
    joinCode: "",
  });

  useEffect(() => {
    if (nameId) {
      setNewContest((prev) => ({ ...prev, hostId: nameId }));
    }
  }, [nameId]);

  // Fetch contests associated with the user
  const loadContests = async () => {
    try {
      const response = await axios.get("http://localhost:5149/api/Contest/GetContestCards", {
        params: { id: nameId },
      });
      setContests(response.data);
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

  useEffect(() => {
    if (nameId) {
      loadContests();
    }
  }, [nameId]);

  const handleJoinContest = async () => {
    const nameeId = nameId; // Replace with the actual nameId value
    const joincode = joinCode; // Replace with the actual joincode value
  
    try {
      const response = await axios.post("http://localhost:5149/api/Contest/join", {
        userId: nameeId, // Map nameId to userId
        joincode: joincode, // Pass joincode directly
      });
  
      alert(response.data);
      setJoinDialogOpen(false);
      loadContests(); // Refresh contests after joining
    } catch (error) {
      console.error("Error joining contest:", error);
    }
  };

  const handleCreateContest = async () => {
    try {
      console.log(newContest)
      const response = await axios.post("http://localhost:5149/api/Contest/Create", {
        ...newContest,
      });
      console.log(response.data)
      alert(response.data)
      setCreateDialogOpen(false);
      loadContests(); // Refresh contests after creating
    } catch (error) {
      console.error("Error creating contest:", error);
    }
  };

  return (
    <>
      <Box>
        <Navbar />
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setJoinDialogOpen(true)}
            sx={{ marginRight: 2 }}
          >
            Join Contest
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCreateDialogOpen(true)}
          >
            Create Contest
          </Button>
        </Box>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Your Contests
          </Typography>
          <Grid container spacing={2}>
            {contests.map((contest) => (
              <Grid item key={contest.contestId} xs={12} sm={6} md={4}>
                <ContestCard {...contest} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Join Contest Dialog */}
        <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)}>
          <DialogTitle>Join Contest</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Join Code"
              fullWidth
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleJoinContest} color="primary">
              Join
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create Contest Dialog */}
        <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
          <DialogTitle>Create Contest</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={newContest.name}
              onChange={(e) => setNewContest({ ...newContest, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={newContest.description}
              onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Start Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newContest.startTime}
              onChange={(e) => setNewContest({ ...newContest, startTime: e.target.value })}
            />
            <TextField
              margin="dense"
              label="End Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newContest.endTime}
              onChange={(e) => setNewContest({ ...newContest, endTime: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Participation Type"
              fullWidth
              value={newContest.participationType}
              onChange={(e) => setNewContest({ ...newContest, participationType: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateContest} color="secondary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ContestPage;
