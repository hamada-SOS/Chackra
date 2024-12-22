import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Global/Context";

// Define the props for the contest card
interface ContestCardProps {
  name: string;
  description: string;
  startTime: string; // ISO string for date
  endTime: string; // ISO string for date
  isActive: boolean;
  hostId: string;
  participationType: string;
  contestId: number; // To navigate to contest details
}

const ContestCard: React.FC<ContestCardProps> = ({
  name,
  description,
  startTime,
  endTime,
  isActive,
  hostId,
  participationType,
  contestId,
}) => {
  const navigate = useNavigate();
  const { nameId } = useAuth(); // Assuming `nameId` is the user ID

  // Function to navigate to contest details
  const handleNavigate = (contestIdd: number) => {
    navigate("/ContestDetails", { state: { contestIdd } });
  };

  const handleDelete = async (
    e: React.MouseEvent,
    contestId: number,
    userId: string | null
  ) => {
    e.stopPropagation(); // Prevent triggering the card navigation

    try {
      const response = await axios.delete("http://localhost:5149/api/Contest/delete", {
        data: {
          contestId,
          userId,
        },
      });

      if (response.status === 200) {
        console.log(`Contest ${contestId} deleted successfully`);
        // Handle UI update, e.g., remove the card
        
      } else {
        console.error(`Failed to delete contest ${contestId}:`, response.data);
      }
    } catch (error) {
      console.error("Error deleting contest:", error);
    }
  };

  return (
    <Box
      onClick={() => handleNavigate(contestId)}
      sx={{
        width: 300,
        borderRadius: 2,
        margin: "16px",
        // boxShadow: 4,
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
        position: "relative",
      }}
    >
      <Card>
        {/* Top Section with Gradient Background */}
        <Box
          sx={{
            height: 100,
            background: "linear-gradient(135deg, #2196F3, #E3F2FD)",
            position: "relative",
          }}
        >
          {/* Title at the Bottom Left */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              bottom: 8,
              left: 16,
              fontWeight: "bold",
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            {name}
          </Typography>
        </Box>
        {/* Bottom Section with Details */}
        <CardContent sx={{ padding: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Box sx={{ marginY: 1 }}>
            <Typography variant="body2">
              <strong>Start:</strong> {new Date(startTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>End:</strong> {new Date(endTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Participation:</strong> {participationType}
          </Typography>
        </CardContent>
        {/* Delete Icon */}
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
          onClick={(e) => handleDelete(e, contestId, nameId)}
        >
          <DeleteIcon sx={{ color: "#FF4D4D" }} />
        </IconButton>
      </Card>
    </Box>
  );
};

export default ContestCard;
