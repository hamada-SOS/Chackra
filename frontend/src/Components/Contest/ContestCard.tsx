import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define the props for the contest card
interface ContestCardProps {
  name: string;
  description: string;
  startTime: string; // ISO string for date
  endTime: string; // ISO string for date
  isActive: boolean;
  hostId: string;
  participationType: string;
  contestId: string; // To navigate to contest details
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

  const handleNavigate = () => {
    navigate('/ContestDetails');
  };

  return (
    <Box
      onClick={handleNavigate}
      sx={{
        maxWidth: 400,
        margin: "16px",
        boxShadow: 3,
        cursor: "pointer",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Box sx={{ marginY: 2 }}>
            <Typography variant="body2">
              <strong>Start Time:</strong> {new Date(startTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>End Time:</strong> {new Date(endTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2">
              <strong>Participation:</strong> {participationType}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContestCard;
