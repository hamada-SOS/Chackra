// SolvingPage.tsx

import React from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, useTheme } from '@mui/material';
import MonacoEditor from "@monaco-editor/react";
import { useState } from 'react';
import ProblemDetails from '../../Components/CodeEditor/ProblemDetails';
import Navbar from '../../Components/Navbar/Navbar';

// Define props for the SolvingPage component
// type SolvingPageProps = {
//     problemID: number
// };

// const SolvingPage: React.FC<SolvingPageProps> = ({ problemID }) => {
const SolvingPage = () => {

    const theme = useTheme();

    // const [code, setCode] = useState('// Write your solution here...');
    // const [activeTab, setActiveTab] = useState(0);

    // const handleEditorChange = (value: string | undefined) => { 
    //     setCode(value || '');
    // };

    // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        //     setActiveTab(newValue);
        return (
            <>  
                <Navbar/>
                <Box sx={{display:'flex', width:'9.rem', height:'720px', background:theme.palette.background.default, padding:'10px'}}>
                    <ProblemDetails/>
                </Box>
            </>
    
        )
    };



    export default SolvingPage;
    //         <Box display="flex" height="100vh">
    //             {/* Problem Details Section */}
    //             <Paper elevation={3} sx={{ width: '30%', p: 2, overflowY: 'auto' }}>
    //                 <Typography variant="h5" gutterBottom>problemTitle</Typography>
    //                 <Typography variant="body1">problemDescription</Typography>
    //             </Paper>
    
    //             {/* Code Editor and Output Sections */}
    //             <Box display="flex" flexDirection="column" width="40%" p={2}>
    //                 {/* Code Editor */}
    //                 <Paper elevation={3} sx={{ flex: 1, mb: 2, p: 1 }}>
    //                     <Typography variant="h6" gutterBottom>Code Editor</Typography>
    //                     <MonacoEditor
    //                         height="300px"
    //                         defaultLanguage="python"
    //                         theme="vs-dark"
    //                         value={code}
    //                         onChange={handleEditorChange}
    //                     />
    //                 </Paper>
    
    //                 {/* Output and Test Cases Section */}
    //                 <Paper elevation={3} sx={{ flex: 1, p: 1 }}>
    //                     <Typography variant="h6" gutterBottom>Test Results</Typography>
    //                     <Tabs value={activeTab} onChange={handleTabChange} aria-label="test cases tabs">
    //                         <Tab label="Case 1" />
    //                         <Tab label="Case 2" />
    //                         <Tab label="Case 3" />
    //                     </Tabs>
    
    //                     {/* Test Case Results */}
    //                     <Box p={2}>
    //                         {activeTab === 0 && <Typography>Test Case 1: Result output here...</Typography>}
    //                         {activeTab === 1 && <Typography>Test Case 2: Result output here...</Typography>}
    //                         {activeTab === 2 && <Typography>Test Case 3: Result output here...</Typography>}
    //                     </Box>
    //                 </Paper>
    //             </Box>
    //         </Box>
    //     );
    // };
