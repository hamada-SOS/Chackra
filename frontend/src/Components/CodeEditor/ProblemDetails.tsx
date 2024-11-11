import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { ProblemDetails } from '../../Problem';
import { fetchProblemDetails } from '../../api';

interface Props {
    ProblemID: number;
}

const ProblemDetials = ({ProblemID}: Props) => {

    const theme = useTheme();
    const [problemsDetails, setProblemsDetails] = useState<ProblemDetails>();

    // const location = useLocation();
    // const { problemTitle } = location.state || { problemTitle: "Default Problem" }; // Default value in case the state is undefined


    useEffect(() => {
        const loadProblemDetails = async () => {
            if (!ProblemID) return;
    
            try {
                const problemmDetails = await fetchProblemDetails(ProblemID);
                setProblemsDetails(problemmDetails);
            } catch (error) {
                console.error('Error loading problems:', error);
            } finally {
            }
        };
    
        loadProblemDetails();
    }, [problemsDetails]);


  return (
    <>
        <Box sx={{display:'flex', flexDirection:'column', width:'550px', height:'720px', background: "#d2dff3", borderRadius:2, padding:'20px'}}>
            <Typography sx={{fontSize:'1.4rem', fontWeight:'bold', mb:'40px' }}>{problemsDetails?.title}</Typography>
            <Box sx={{display:'flex',width:'500px', height:"fir-content", mb:'20px'}}>
                <Typography sx={{fontSize:'1rem' , overflow: 'hidden', whiteSpace:'normal' , wordBreak:'break-word'}}>{problemsDetails?.description}</Typography>
            </Box>
            <Box sx={{display:'flex', mb:'20px'}}>

            <Typography sx={{fontSize:'0.85rem', opacity:0.8, pr:'4px'}}>Note:</Typography>
            <Typography sx={{fontSize:'0.85rem', opacity:0.8}}>{problemsDetails?.note}.</Typography>
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>sample Input: </Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                {problemsDetails?.sampleInput}
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>sample Output:</Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                {problemsDetails?.sampleOutput}
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>Constraints:</Typography>
            <Box sx={{width:'fit-content', height:'23px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', pr:'10px', mb:'40px'}}>
            <Typography sx={{fontSize:'0.9rem', opacity:0.8}}>{problemsDetails?.constraints}</Typography> {/* this must fixed TODO */}

            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>Input Format:</Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                    {problemsDetails?.inputFormat}
            </Box>
        </Box>
    </>
  )
}

export default ProblemDetials