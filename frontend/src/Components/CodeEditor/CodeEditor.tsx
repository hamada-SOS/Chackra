import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { Paper, Box, Button, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material"; // Note SelectChangeEvent import
import { defaultCodeSnippets } from "../../defaultCodeSnippets";

interface SubmissionResult {
  standardOutput: string;
  standardError: string;
  time: string;
}

interface StyledEditorProps {
  themee?: string;
}

const Judge0: React.FC<StyledEditorProps> = ({ themee = 'myCustomTheme' }) => {
  const [sourceCode, setSourceCode] = useState<string>(defaultCodeSnippets.python);
  const [language, setLanguage] = useState<string>("python");
  const [languageId, setLanguageId] = useState<number>(71); // Default to Python 3
  const [stdin, setStdin] = useState<string>("");
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

    <Paper elevation={3} sx={{ background: "#d2dff3", height: '500px', ml: '30px' , padding:'10px'}}>
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
          width="700px"
          language={language}
          value={sourceCode}
          onChange={(value) => setSourceCode(value || "")}
          theme="myCustomTheme"
          beforeMount={beforeMount}
        />
      </Box>
    </Paper>
    <Paper elevation={3} sx={{ background: "#d2dff3", height: '500px', ml: '30px' , padding:'10px'}}>
      <Box>
        d
      </Box>
    </Paper>
    </Box>
  );
};

export default Judge0;
