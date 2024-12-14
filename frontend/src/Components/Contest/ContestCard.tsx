import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
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
    navigate(`/contestDetails/${contestId}`);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "16px", boxShadow: 3 }}>
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleNavigate}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContestCard;
