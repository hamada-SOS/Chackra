import { Box, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { ProblemDetails } from '../../Problem';
import { fetchProblemDetails } from '../../api';

interface Props {
    // ProblemID: number;
    ProblemDetails:ProblemDetails | undefined;
}


const ProblemDetials = ({ProblemDetails}: Props) => {

    const theme = useTheme();
    // const [problemsDetails, setProblemsDetails] = useState<ProblemDetails>();

    // useEffect(() => {
    //     const loadProblemDetails = async () => {
    //         if (!ProblemID) return;
    
    //         try {
    //             const problemmDetails = await fetchProblemDetails(ProblemID);
    //             setProblemsDetails(problemmDetails);
                
    //         } catch (error) {
    //             console.error('Error loading problems:', error);
    //         } finally {
    //         }
    //     };
    
    //     loadProblemDetails();
    // }, []);

    // console.log(problemsDetails)



  return (
    <>
    <Paper elevation={3} sx={{borderRadius:2, background:"#d2dff3", ml:'10px'}}>
        <Box sx={{display:'flex', flexDirection:'column', width:'590px', height:'720px', background: "#d2dff3", borderRadius:2, padding:'20px'}}>
            <Typography sx={{fontSize:'1.4rem', fontWeight:'bold', mb:'40px' }}>{ProblemDetails?.title}</Typography>
            <Box sx={{display:'flex',width:'500px', height:"fir-content", mb:'20px'}}>
                <Typography sx={{fontSize:'1rem' , overflow: 'hidden', whiteSpace:'normal' , wordBreak:'break-word'}}>{ProblemDetails?.description}</Typography>
            </Box>
            <Box sx={{display:'flex', mb:'20px'}}>

            <Typography sx={{fontSize:'0.85rem', opacity:0.8, pr:'4px'}}>Note:</Typography>
            <Typography sx={{fontSize:'0.85rem', opacity:0.8}}>{ProblemDetails?.note}.</Typography>
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>sample Input: </Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                {ProblemDetails?.sampleInput}
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>sample Output:</Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                {ProblemDetails?.sampleOutput}
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>Constraints:</Typography>
            <Box sx={{width:'fit-content', height:'23px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', pr:'10px', mb:'40px'}}>
            <Typography sx={{fontSize:'0.9rem', opacity:0.8}}>{ProblemDetails?.constraints}</Typography> {/* this must fixed TODO */}

            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>Input Format:</Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                    {ProblemDetails?.inputFormat}
            </Box>
        </Box>
    </Paper>
    </>
  )
}

export default ProblemDetials