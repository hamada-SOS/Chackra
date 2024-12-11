import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

interface Props {}

const AdminLoginForm: React.FC<Props> = (): JSX.Element => {
  const [LoginCode, setLoginCode] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5149/api/Admin/login", {
        LoginCode,
      });

      // Save access token and refresh token in local storage
      localStorage.setItem("accessToken", response.data.token);
      // Assuming you return the refresh token in the same response
      localStorage.setItem("refreshToken", response.data.refreshToken);

      alert("Login successful!");
      // Redirect or handle post-login behavior
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
        <TextField
          label="Login Code"
          variant="outlined"
          fullWidth
          value={LoginCode}
          onChange={(e) => setLoginCode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminLoginForm;
