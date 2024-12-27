import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Judge0 from '../../Components/CodeEditor/CodeEditor';
import { ProblemDetails, ProblemDetails as ProblemType } from '../../Problem';
import { fetchContestProblems, fetchProblemDetails } from '../../api';
import ProbleemDetails from '../../Components/CodeEditor/ProbleemDetails';

const ContestSolvingPage = () => {
    const [problems, setProblems] = useState<ProblemDetails[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const [solvedProblems, setSolvedProblems] = useState<number[]>([]);
    const theme = useTheme();
    const location = useLocation();
    const { contestIdd } = location.state || { contestId: null };

    console.log(contestIdd)
    useEffect(() => {
        const loadContestProblems = async () => {
            if (!contestIdd) return;

            try {
                const contestProblems = await fetchContestProblems(contestIdd);
                console.log(contestProblems)
                setProblems(contestProblems);
                console.log(problems)
            } catch (error) {
                console.error('Error fetching contest problems:', error);
            }
        };

        loadContestProblems();
    }, [contestIdd]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    // const markProblemAsSolved = (problemId: number) => {
    //     setSolvedProblems((prev) => [...prev, problemId]);
    // };

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', background: theme.palette.background.default }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="Contest Problems Tabs">
                    {problems.map((problem, index) => (
                        <Tab
                            key={problem.problemID}
                            label={`Problem ${index + 1}`}
                            disabled={solvedProblems.includes(problem.problemID)}
                            sx={{
                                backgroundColor: solvedProblems.includes(problem.problemID) ? 'green' : 'inherit',
                                color: solvedProblems.includes(problem.problemID) ? 'white' : 'inherit',
                            }}
                        />
                    ))}
                </Tabs>

                {problems[activeTab] && (
                    <Box sx={{ display: 'flex', marginTop: '20px' }}>
                        <ProbleemDetails ProblemDetails={problems[activeTab]} />
                        <Judge0
                            TestCases={problems[activeTab].testCases}
                            id={problems[activeTab].problemID}
                            contestId={contestIdd}
                            // onSolve={() => markProblemAsSolved(problems[activeTab].problemID)}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
};

export default ContestSolvingPage;
