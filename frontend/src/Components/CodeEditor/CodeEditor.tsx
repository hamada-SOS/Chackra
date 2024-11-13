import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { Paper, Box, Button, FormControl, Select, MenuItem, SelectChangeEvent, Tabs, Typography } from "@mui/material"; // Note SelectChangeEvent import
import { defaultCodeSnippets } from "../../defaultCodeSnippets";
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ProblemDetails } from "../../Problem";

interface SubmissionResult {
  standardOutput: string;
  standardError: string;
  time: string;
}

interface StyledEditorProps {
  themee?: string;
    TetsCases:ProblemDetails[]


}

interface Props{
  TetsCases:string[] | undefined;
}



const Judge0: React.FC<Props> = (TestCases:Props ) => {
  const [sourceCode, setSourceCode] = useState<string>(defaultCodeSnippets.python);
  const [language, setLanguage] = useState<string>("python");
  const [languageId, setLanguageId] = useState<number>(71); // Default to Python 3
  const [stdin, setStdin] = useState<string>("");
  const [selected, setSelected] = useState('1');
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Adjust the type of event to SelectChangeEvent
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

  // tabs satat

  const handleTabChange = (event: React.SyntheticEvent, newValue:string) => {
        setSelected(newValue);
  }

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const { data: submission } = await axios.post("http://localhost:5149/api/Judge/submit", {
        sourceCode: sourceCode,
        LanguageId: languageId,
        StandardInput: stdin,
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









  return (
    <Box sx={{display:'flex', flexDirection:"column"}}>

    <Paper elevation={3} sx={{ background: "#d2dff3", height: '500px', ml: '15px' , padding:'10px'}}>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <FormControl sx={{ width: '150px', height: '60px', borderRadius: 3 }}>
          <Select
            value={language}
            onChange={handleLanguageChange} // Correctly typed here
            sx={{ width: '150px', height: '50px' }}
          >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          disableElevation
          sx={{ width: '110px', height: '50px' }}
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
    <Paper elevation={3} sx={{ background: "#d2dff3", height: '500px', ml: '15px', mt:'20px' , padding:'10px'}}>
      <TabContext value={selected}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList aria-label="Tabs Example" onChange={handleTabChange}>
          <Tab label='Test Cases' value={'1'}/>
          <Tab label='Test Results' value={'2'}/>
        </TabList>
      </Box>



      <TabPanel value={'1'}>
        <Box>
          <Button variant="outlined" sx={{mr:'6px'}}>case 1</Button>
          <Box sx={{margin:'20px', display:'flex', flexDirection:'column'}}>
            <Typography>Input: </Typography>
            <Box sx={{background:'grey', width:'fit', height:'30px', mt:'20px', display:'flex', alignItems:'center', padding:'10px', borderRadius:2}}>
              2347289
            </Box>
            <Typography>Expected Output: </Typography>
            <Box sx={{background:'grey', width:'fit', height:'30px', mt:'20px', display:'flex', alignItems:'center', padding:'10px', borderRadius:2}}>
              2347289
            </Box>
          </Box>
        </Box>
      </TabPanel>



      </TabContext>
    </Paper>
    </Box>
  );
};

export default Judge0;
