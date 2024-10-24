import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button, Typography, Paper } from "@mui/material";

// Light Theme Colors
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3a31d8", // Main color
      contrastText: "#eae9fc", // Light text color
    },
    secondary: {
      main: "#0600c2", // Secondary accent color
    },
    background: {
      default: "#eae9fc", // Light background
      paper: "#ffffff", // Paper background color (white)
    },
    text: {
      primary: "#010104", // Main text color (dark)
      secondary: "#020024", // Secondary text color (darker shade)
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","), // Font from your link
    h1: {
      fontSize: "2.5rem", // Font size for h1
      fontWeight: 600, // Font weight for h1
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem", // Regular body text size
      fontWeight: 400, // Normal weight for body text
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "none", // Disable uppercase transformation for buttons
    },
  },
});

// Dark Theme Colors
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3a31d8", // Same primary color
      contrastText: "#eae9fc", // Text color on primary
    },
    secondary: {
      main: "#0600c2", // Secondary accent color
    },
    background: {
      default: "#010104", // Dark background color
      paper: "#020024", // Paper background color
    },
    text: {
      primary: "#eae9fc", // Main text color (light)
      secondary: "#cfcfe3", // Slightly lighter text for secondary use
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","), // Font from your link
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "none", // Disable uppercase transformation for buttons
    },
  },
});
