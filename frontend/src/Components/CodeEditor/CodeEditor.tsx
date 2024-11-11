import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { TextField, Button, Container, Typography, CircularProgress, Paper, useTheme, Box } from "@mui/material";

interface SubmissionResult {
  standardOutput: string;
  standardError: string;
  time:string;
}

const Judge0: React.FC = (): JSX.Element => {

  const theme = useTheme(); // You can also access the theme directly if needed
  const [sourceCode, setSourceCode] = useState<string>("print('Hello, World!')");
  const [languageId, setLanguageId] = useState<number>(71); // Default to Python 3
  const [stdin, setStdin] = useState<string>("");
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Step 1: Submit code to Judge0
      const { data: submission } = await axios.post("http://localhost:5149/api/Judge/submit",
        {
          sourceCode: sourceCode,
          LanguageId: languageId,
          StandardInput: stdin,
        });


      const token = submission.token;

      // Step 2: Poll the result after 3 seconds
      setTimeout(async () => {
        const { data: resultData } = await axios.get(
            `http://localhost:5149/api/Judge/result/${token}`
        );
        setResult(resultData);
        console.log(resultData);
        setLoading(false);
      }, 3000); // Add delay for result processing
    } catch (error) {
      console.error("Error during submission:", error);
      setLoading(false);
    }
  };

  return (
      <Paper elevation={3} sx={{background:"#d2dff3"}}>
        <Box sx={{padding: "20px", marginTop: "20px" }}>
            {/* Monaco Editor */}
            <MonacoEditor
              height="400px"
              width="300px"
              language="python"
              value={sourceCode}
              onChange={(value) => setSourceCode(value || "")}
              theme="paper"
              options={{
                selectOnLineNumbers: true,
              }}
            />
        </Box>
      </Paper>
  );
};
export default Judge0;
