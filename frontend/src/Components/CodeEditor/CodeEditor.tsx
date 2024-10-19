import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { TextField, Button, Container, Typography, CircularProgress, Paper } from "@mui/material";

interface SubmissionResult {
  stdout: string;
  stderr: string;
  status: {
    description: string;
  };
}

const Judge0: React.FC = (): JSX.Element => {

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
      const { data: submission } = await axios.post("http://localhost:5149/api/judge/submit",
        {
          source_code: sourceCode,
          language_id: languageId,
          stdin: stdin,
        });


      const token = submission.token;

      // Step 2: Poll the result after 3 seconds
      setTimeout(async () => {
        const { data: resultData } = await axios.get(
            `http://localhost:5149/api/judge/result/${token}`
        );
        setResult(resultData);
        setLoading(false);
      }, 3000); // Add delay for result processing
    } catch (error) {
      console.error("Error during submission:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Submit Code to Judge0 API
        </Typography>

        {/* Monaco Editor */}
        <MonacoEditor
          height="400px"
          language="python"
          value={sourceCode}
          onChange={(value) => setSourceCode(value || "")}
          theme="vs-dark"
          options={{
            selectOnLineNumbers: true,
          }}
        />
        <TextField
          label="Standard Input (Optional)"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit Code"}
        </Button>

        {loading && <CircularProgress style={{ marginTop: "20px" }} />}

        {result && (
          <Paper style={{ padding: "20px", marginTop: "20px" }}>

            <Typography variant="h6">Result:</Typography>
            <Typography>Status: {result.status.description}</Typography>
            {result.stdout && (
              <div>
                <Typography variant="subtitle1">Output:</Typography>
                <pre>{result.stdout}</pre>
              </div>
            )}
            {result.stderr && (
              <div>
                <Typography variant="subtitle1">Error:</Typography>
                <pre>{result.stderr}</pre>
              </div>
            )}
          </Paper>
        )}
      </Paper>
      {}
    </Container>
  );
};

export default Judge0;
