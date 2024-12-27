import React, { useEffect, useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import {
  Paper,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {SubmissionResult, TestCase} from "../../Problem";
import { fetchProblemDetails } from "../../api";
import { useAuth } from "../../Global/Context";
import { useLocation } from "react-router";
import { useResultContext } from "../../Global/resultContext";

interface Props {
  TestCases?: TestCase[];
  id?: number;
  contestId:number;
  // onSolve: (problemId: string) => Promise<boolean>;
}


const Judge0: React.FC<Props> = ({ TestCases = [], id, contestId }) => {
  const [sourceCode, setSourceCode] = useState("");
  const [language, setLanguage] = useState<string>("python");
  const [languageId, setLanguageId] = useState<number>(71); // Default to Python 3
  const [selectedTab, setSelectedTab] = useState("1");
  const {result, setResult} = useResultContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState<number>(0);
  const location = useLocation();
  const isContestProblem = location.state?.isContestProblem || false;
  const theme = useTheme();
  const { nameId } = useAuth();
  

  function formatPythonCode(state: string): string {
    try {
        // Parse the string to get the Python code
        const code = JSON.parse(state);
        // Split the code into lines
        const lines = code.split("\n");
        // Remove trailing spaces and ensure consistent indentation
        const formattedLines = lines.map((line:string) => line.trimEnd());
        // Reformat using basic indentation rules
        const indentedLines: string[] = [];
        let indentLevel = 0;
        const indentSize = 4; // Number of spaces per indent
        for (const line of formattedLines) {
            if (line.endsWith(":") && !line.startsWith("#")) {
                // Increase indent level after a colon (e.g., function or loop definitions)
                indentedLines.push(" ".repeat(indentLevel * indentSize) + line);
                indentLevel++;
            } else if (line.trim() === "" || line.startsWith("#")) {
                // Handle empty lines or comments
                indentedLines.push(line);
            } else if (line.startsWith("return") || line.startsWith("print") || line.startsWith("pass")) {
                // Handle dedentation for certain keywords
                indentLevel = Math.max(0, indentLevel - 1);
                indentedLines.push(" ".repeat(indentLevel * indentSize) + line);
            } else {
                // Apply current indent level
                indentedLines.push(" ".repeat(indentLevel * indentSize) + line);
            }
        }
        // Join the lines back into a single formatted string
        return indentedLines.join("\n");
    } catch (error) {
        console.error("Error formatting Python code:", error);
        return state; // Return the original state in case of an error
    }
  }

  useEffect(() => {
    const loadProblemDetails = async () => {
      if (!id) return;

      try {
        const problemDetails = await fetchProblemDetails(id);
        var formated = problemDetails.defualtCode
        setSourceCode(formatPythonCode(formated))
      } catch (error) {
        console.error("Error loading problem details:", error);
      }
    };
    loadProblemDetails();
  }, [id]);


  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log(contestId, nameId)
      const { data: submission } = await axios.post(
        "http://localhost:5149/api/Submission/submit",
        {
          problemID: id,
          contestId:contestId,
          userId: nameId,
          isContestProblem: isContestProblem,
          sourceCode,
          LanguageId: languageId,
        }
      );

      const resultData = submission;

      setTimeout(async () => {
        setResult(resultData);
        setSelectedTab('2')
        
        
      }, 3000);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const beforeMount = (monaco: typeof import("monaco-editor")) => {
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "5a5a7a", fontStyle: "italic" },
        { token: "keyword", foreground: "6c63ff", fontStyle: "bold" },
        { token: "string", foreground: "b2b0ff" },
        { token: "number", foreground: "3a3a5c" },
      ],
      colors: {
        "editor.background": "#eae9fc",
        "editor.foreground": "#3a3a5c",
        "editorCursor.foreground": "#6c63ff",
        "editorLineNumber.foreground": "#5a5a7a",
        "editor.selectionBackground": "#c4c3f4",
        "editor.findMatchHighlightBackground": "#ffb84d44",
        "editor.errorForeground": "#ff6b6b",
        "editor.warningForeground": "#ffb84d",
      },
    });
  };

  const handleTestCaseClick = (index: number) => {
    setSelectedTestCaseIndex(index);
  };
  

  return (
    // TODO handle Drag
    <Box  sx={{ display: "flex", flexDirection: "column" }}>
      <Paper elevation={3} sx={{ background: "#d2dff3", height: "500px", ml: "15px", padding: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "150px", height: "60px", borderRadius: 3 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              sx={{ width: "150px", height: "50px" }}
            >
              <MenuItem value="python">Python</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            disableElevation
            sx={{ width: "110px", height: "50px" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </Button>
        </Box>
        <Box>
          <MonacoEditor
            height="400px"
            width="660px"
            language={language}
            value={sourceCode}
            onChange={(value) => setSourceCode(value || "")}
            theme="myCustomTheme"
            beforeMount={beforeMount}
          />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ background: "#d2dff3", height: "500px", ml: "15px", mt: "20px", padding: "10px" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="Tabs Example" onChange={handleTabChange}>
              <Tab label="Test Cases" value="1" />
              <Tab label="Test Results" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            {TestCases.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {TestCases.map((_, index) => (
                    <Button
                      key={index}
                      variant={selectedTestCaseIndex === index ? "contained" : "outlined"}
                      onClick={() => handleTestCaseClick(index)}
                    >
                      {`Case ${index + 1}`}
                    </Button>
                  ))}
                </Box>
                <Box>
                  <Typography sx={{fontSize:'0.9rem', opacity:0.7, mb:1}}>Input:</Typography>
                  <Box sx={{ background: theme.palette.background.default, padding: 2, borderRadius: 2 }}>
                    {TestCases[selectedTestCaseIndex].input}
                  </Box>
                  <Typography sx={{fontSize:'0.9rem', opacity:0.7, mb:1}}>Expected Output:</Typography>
                  <Box sx={{ background: theme.palette.background.default, padding: 2, borderRadius: 2 }}>
                    {TestCases[selectedTestCaseIndex].expectedOutput}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography>No test cases available.</Typography>
            )}
          </TabPanel>

          <TabPanel value="2">
            {result ? (
              result.error ? (
                <Box
                  sx={{
                    backgroundColor: "gray",
                    color: "red",
                    padding: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">
                    <strong>Error:</strong> {result.error}
                  </Typography>
                </Box>
              ) : result.testCaseResults && result.testCaseResults.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {result.testCaseResults.map((_, index) => (
                      <Button
                        key={index}
                        variant={selectedTestCaseIndex === index ? "contained" : "outlined"}
                        onClick={() => handleTestCaseClick(index)}
                        //Todo Deynamic coloring for buttns
                      >
                        {`Case ${index + 1}`}
                      </Button>
                    ))}
                  </Box>
                  {result.testCaseResults[selectedTestCaseIndex] && (
                    <Box>
                      <Typography sx={{fontSize:'0.9rem', opacity:0.7, mb:1}}>Input:</Typography>
                      <Box
                        sx={{
                          background: theme.palette.background.default,
                          padding: 2,
                          borderRadius: 2,
                          overflowX: "auto",
                          mb: 1

                        }}
                      >
                        {result.testCaseResults[selectedTestCaseIndex].input}
                      </Box>
                      <Typography sx={{fontSize:'0.9rem', opacity:0.7, mb:1}}>Expected Output:</Typography>
                      <Box
                        sx={{
                          background: theme.palette.background.default,
                          padding: 2,
                          borderRadius: 2,
                          overflowX: "auto",
                          mb: 1

                        }}
                      >
                        {result.testCaseResults[selectedTestCaseIndex].expectedOutput}
                      </Box>
                      <Typography sx={{fontSize:'0.9rem', opacity:0.7, mb:1}}>Actual Output:</Typography>
                      <Box
                        sx={{
                          background: theme.palette.background.default,
                          padding: 2,
                          borderRadius: 2,
                          overflowX: "auto",
                          mb: 1
                        }}
                      >
                        {result.testCaseResults[selectedTestCaseIndex].output}
                      </Box>
                      <Typography variant="body1">
                        Status:{" "}
                        <span style={{ color: result.testCaseResults[selectedTestCaseIndex].passed ? "green" : "red" }}>
                          {result.testCaseResults[selectedTestCaseIndex].passed ? "Passed" : "Failed"}
                        </span>
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography>No test results available</Typography>
              )
            ) : (
              <Typography>Run Your Code to View Result</Typography>
            )}
          </TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
};

export default Judge0;
