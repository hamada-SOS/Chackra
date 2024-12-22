import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Navbar from "../../Components/Navbar/Navbar";
import { ContesttDetails, Problem } from "../../Problem";
import { fetchProblemsByCategory } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

type DifficultyLevels = "VeryEasy" | "Easy" | "Medium" | "Hard" | "VeryHard";

const ContestDetails: React.FC = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [contestDetails, setContestDetails] = useState<ContesttDetails | null>(null);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [problemIds, setProblemIds] = useState<number[]>([]);
  const [tabValue, setTabValue] = useState("1");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState<{
    difficulty: Record<DifficultyLevels, boolean>;
  }>({
    difficulty: {
      VeryEasy: false,
      Easy: false,
      Medium: false,
      Hard: false,
      VeryHard: false,
    },
  });

  const location = useLocation();
  const { contestIdd } = location.state || { contestIdd: null };

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const problemsList = await fetchProblemsByCategory("python");
        setProblems(problemsList);
        setFilteredProblems(problemsList); // Initially show all problems
      } catch (error) {
        console.error("Error loading problems:", error);
      }
    };

    loadProblems();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const activeDifficulties = Object.keys(filters.difficulty).filter(
        (key) => filters.difficulty[key as DifficultyLevels]
      );

      const filtered = problems.filter((problem) =>
        activeDifficulties.includes(problem.diffculty)
      );

      setFilteredProblems(filtered.length > 0 ? filtered : problems);
    };

    applyFilters();
  }, [filters, problems]);

    const loadContestDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5149/api/Contest/contestDetails", {
            params: { id: contestIdd },
          });
        setContestDetails(response.data);
        console.log(contestDetails)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to fetch contest details:", error.response?.data || error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      };
    };

   useEffect(() => {
      if (contestIdd) {
        loadContestDetails();      
}}, [contestIdd]);



  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const toggleProblemSelection = (problemId: number) => {
    setProblemIds((prev) =>
      prev.includes(problemId) ? prev.filter((id) => id !== problemId) : [...prev, problemId]
    );
  };

  const handleDeleteP = async (
    e: React.MouseEvent,
    contestId: number,
    problemId: number,
  ) => {
    e.stopPropagation(); // Prevent triggering the card navigation

    try {
      console.log(contestId, problemId)
      const response = await axios.delete("http://localhost:5149/api/Contest/deletecP", {
        data: {
          contestId,
          problemId,
        },
      });

      if (response.status === 200) {
        console.log(`ProblemContest ${problemId} deleted successfully`);
        // Handle UI update, e.g., remove the card
        
      } else {
        console.error(`Failed to delete problem ${problemId}:`, response.data);
      }
    } catch (error) {
      console.error("Error deleting contest:", error);
    }
  };


  const handleFinish = async () => {
    if (!contestIdd) {
      console.error("Contest ID is undefined");
      return;
    }

    const requestData = {
      contestId: contestIdd,
      problemIds: problemIds,
    };
    try {
      const response = await axios.post("http://localhost:5149/api/Contest/add-problems", requestData);
      console.log("Problems successfully assigned to the contest:", response.data);
      setDialogOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to assign problems:", error.response?.data || error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };


  const handleSolveClick = (id: number) => {
    navigate(`/SolvingPage`, { state: { id } });
  };
  return (
    <Box>
      <Navbar />
      <Box p={3} sx={{ backgroundColor: "background.default" }}>
        <Paper elevation={3} sx={{ p: 2, background: "#d2dff3", height: "720px" }}>
          <TabContext value={tabValue}>
            <Box borderBottom={1} borderColor="divider">
              <TabList onChange={handleTabChange} aria-label="contest details tabs">
                <Tab label="Add Problems" value="1" />
                <Tab label="Participants" value="2" />
                <Tab label ="Start Contest" value="3"/>
              </TabList>
            </Box>

      <TabPanel value="1" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          {/* Button to open dialog */}
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Assign
          </Button>

          {/* Display fetched problems */}
          {contestDetails?.problems.length ? (
          <Box sx={{ mb: 3, width: '80%' }}>
            <Typography variant="h4" gutterBottom>
              Contest Problems
            </Typography>
            <Box
              sx={{
                maxHeight: '500px', // Adjust height as needed
                overflowY: 'auto', // Enable vertical scrolling
                border: '1px solid #ddd', // Optional: Add a border for better visibility
                borderRadius: '8px', // Optional: Rounded corners
                padding: '8px', // Optional: Padding inside the scrollable area
              }}
            >
              <List>
                {contestDetails?.problems.map((problem) => (
                  <React.Fragment key={problem.id}>
                    <ListItem
                      component="button"
                      onClick={() => handleSolveClick(problem.id)}
                      sx={{
                        cursor: "pointer",
                        padding: "16px",
                        mb: 1,
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <ListItemText
                        primary={problem.title}
                        secondary={`Difficulty: ${problem.diffculty}`}
                      />
                      {/* Delete Button */}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => handleDeleteP(e, contestIdd, problem.id)}
                        sx={{ marginLeft: "auto" }} // Align to the right
                      >
                        Delete
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No problems assigned yet.
          </Typography>
        )}

      </TabPanel>

            <TabPanel value="2" sx={{display:'flex', justifyContent:'center'}}>
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
          </TabContext>
        </Paper>
      </Box>

      {/* Dialog for Assigning Problems */}
      <Dialog
        sx={{ background: "#d2dff3" }}
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Assign Problems</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flex: 1 }}>
            {/* Left Side - Problems List */}
            <Box sx={{ flex: 2, overflowY: "scroll", padding: "20px", backgroundColor: "#f3f4fa" }}>
              {filteredProblems.map((problem) => (
                <Box
                  key={problem.id}
                  sx={{
                    marginBottom: "20px",
                    padding: "20px",
                    backgroundColor: "#d6e4f0",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h6">{problem.title}</Typography>
                  <Typography variant="body2">Difficulty: {problem.diffculty}</Typography>
                  <Button
                    onClick={() => toggleProblemSelection(problem.id)}
                    variant="contained"
                    sx={{
                      marginTop: "10px",
                      backgroundColor: problemIds.includes(problem.id) ? "green" : "blue",
                    }}
                  >
                    {problemIds.includes(problem.id) ? "Assigned" : "Assign"}
                  </Button>
                </Box>
              ))}
            </Box>

            {/* Right Side - Filters */}
            <Box sx={{ flex: 1, padding: "20px", backgroundColor: "#e6e9f2" }}>
              <Typography variant="h6" gutterBottom>
                Difficulty
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {(["VeryEasy", "Easy", "Medium", "Hard", "VeryHard"] as DifficultyLevels[]).map(
                  (level) => (
                    <FormControlLabel
                      key={level}
                      control={
                        <Checkbox
                          checked={filters.difficulty[level]}
                          onChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              difficulty: {
                                ...prev.difficulty,
                                [level]: !prev.difficulty[level],
                              },
                            }))
                          }
                        />
                      }
                      label={level}
                    />
                  )
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFinish} variant="contained" color="primary">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContestDetails;
