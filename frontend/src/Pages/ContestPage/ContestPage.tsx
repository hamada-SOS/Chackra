import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import ContestCard from "../../Components/Contest/ContestCard";
import { useAuth } from "../../Global/Context";
import { ContestCards } from "../../Problem";
import { fetchUserContests, joinContest } from "../../api";

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
      const response = await fetchUserContests(nameId)
      setContests(response);
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
      const response = await joinContest(nameeId, joincode)
  
      alert(response);
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
      <Box sx={{backgroundColor:'background.default', height:'fit'}}>
        <Navbar />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#d2dff3', padding: '20px 100px' }}>
                <Typography variant='h6' sx={{ opacity: 0.6 }}>Contest</Typography>
                <Typography variant='h4' color='#010104' sx={{ fontWeight: 600 }}>Compete to showcase your skills</Typography>
              </Box>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
        <Box sx={{display:'flex', justifyContent:'space-between', width:'1100px' }}>
          <Typography variant="h6" gutterBottom sx={{mt:6, fontSize:'2.3rem'}}>
            Your Contests
          </Typography>

        <Box sx={{ marginTop: 7.3, display:'flex', gap:5}}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setJoinDialogOpen(true)}
            sx={{ height:'42px'}}
          >
            Join Contest
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{height:'42px'}}

            onClick={() => setCreateDialogOpen(true)}
          >
            Create Contest
          </Button>
        </Box>
        </Box>
        <Box sx={{ padding: 3 , background:'#d2dff3', width:'1100px', height:'520px', overflow:'auto', borderRadius:4}}>
          <Grid container spacing={1}>
            {contests.map((contest) => (
              <Grid item key={contest.contestId} xs={12} sm={6} md={4}>
                <ContestCard {...contest} />
              </Grid>
            ))}
          </Grid>
        </Box>
            </Box>

        {/* Join Contest Dialog */}
        <Dialog  open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)}>
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
