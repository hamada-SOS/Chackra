import React from "react";
import { Link } from "react-router-dom";
import AdminLoginForm from "../../Components/AdminLoginForm/AdminLoginForm";
import { Box, Typography, Paper, Button } from "@mui/material";

interface Props {}

const AdminLogin: React.FC<Props> = (): JSX.Element => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #4A90E2, #FFFFFF)",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            mb: 3,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="primary">
              Student
            </Button>
          </Link>
          <Link to="/AdminLogin" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary">
              Admin
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%" }}>
          <AdminLoginForm />
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
