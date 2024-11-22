import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import {
  Paper,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Tabs,
  Typography,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { defaultCodeSnippets } from "../../defaultCodeSnippets";
import { ProblemDetails, TestCase } from "../../Problem";

interface SubmissionResult {
  standardOutput: string;
  standardError: string;
  time: string;
}

interface Props {
  TestCases?: TestCase[];
}

const Judge0: React.FC<Props> = ({ TestCases }) => {
  const [sourceCode, setSourceCode] = useState<string>(defaultCodeSnippets.python);
  const [language, setLanguage] = useState<string>("python");
  const [languageId, setLanguageId] = useState<number>(71); // Default to Python 3
  const [stdin, setStdin] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState("1");
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTestCaseIndex, setCurrentTestCaseIndex] = useState(0)
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState<number>(0);

  const theme = useTheme();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value as string;
    setLanguage(selectedLanguage);
    setSourceCode(defaultCodeSnippets[selectedLanguage]);
    // Set languageId based on selected language
    const languageIds: { [key: string]: number } = {
      python: 71,
      java: 62,
      cpp: 54,
    };
    setLanguageId(languageIds[selectedLanguage]);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const { data: submission } = await axios.post("http://localhost:5149/api/Judge/submit", {
        sourceCode:sourceCode,
        LanguageId: languageId,
      });

      const token = submission.token;

      setTimeout(async () => {
        const { data: resultData } = await axios.get(
          `http://localhost:5149/api/Judge/result/${token}`
        );
        setResult(resultData);
        console.log(resultData);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error during submission:", error);
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

  // const handleNextClick = () => {
  //   if (TestCases && TestCases.length > 0) {
  //     setCurrentTestCaseIndex((prevIndex) => (prevIndex + 1) % TestCases.length);
      
  //   }
  // };

  const handleTestCaseClick = (index: number) => {
    setSelectedTestCaseIndex(index);
  };
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Paper elevation={3} sx={{ background: "#d2dff3", height: "500px", ml: "15px", padding: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "150px", height: "60px", borderRadius: 3 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              sx={{ width: "150px", height: "50px" }}
            >
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            disableElevation
            sx={{ width: "110px", height: "50px" }}
            onClick={handleSubmit}
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

          {/* // Mapping buttons for each test case to allow switching between them. */}
          <TabPanel value={'1'}>

              {TestCases && TestCases.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {TestCases.map((_, index) => (
                    <Button
                      key={index}
                      variant={selectedTestCaseIndex === index ? 'contained' : 'outlined'}
                      onClick={() => handleTestCaseClick(index)}
                    >
                      {`Case ${index + 1}`}
                    </Button>
                  ))}
                </Box>
              )}

              {/* // Displaying the information of the selected test case */}
              {TestCases && TestCases.length > 0 ? (
                
                <Box sx={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
                  <Typography>Input:</Typography>
                  <Box
                    sx={{
                      background:theme.palette.background.default,
                      width: 'fit',
                      height: '30px',
                      mt: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      borderRadius: 2,
                    }}
                  >
                    {TestCases[selectedTestCaseIndex].input}
                  </Box>

                  <Typography>Expected Output:</Typography>
                  <Box
                    sx={{
                      background:theme.palette.background.default,
                      width: 'fit',
                      height: '30px',
                      mt: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      borderRadius: 2,
                    }}
                    >
                    {TestCases[selectedTestCaseIndex].expectedOutput}

                  </Box>
                  <Box
                    sx={{
                      background:theme.palette.background.default,
                      width: 'fit',
                      height: '30px',
                      mt: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      borderRadius: 2,
                    }}
                    >
                    {result?.standardOutput}
                    
                  </Box>
                </Box>
              ) : (
                <Typography>No test cases available.</Typography>
              )}

              </TabPanel>
              <TabPanel value={'2'}> the test panel</TabPanel>

        </TabContext>
      </Paper>
    </Box>
  );
};

export default Judge0;
