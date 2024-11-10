import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

type Props = {}

const ProblemDetails = (props: Props) => {

    const theme = useTheme();

  return (
    <>
        <Box sx={{display:'flex', flexDirection:'column', width:'550px', height:'720px', background: "#d2dff3", borderRadius:2, padding:'20px'}}>
            <Typography sx={{fontSize:'1.4rem', fontWeight:'bold', mb:'40px' }}>Sum Or Even Number</Typography>
            <Box sx={{display:'flex',width:'500px', height:"fir-content", mb:'20px'}}>
                <Typography sx={{fontSize:'1rem' , overflow: 'hidden', whiteSpace:'normal' , wordBreak:'break-word'}}>Check if a given integer is even or odd.</Typography>
            </Box>
            <Box sx={{display:'flex', mb:'20px'}}>

            <Typography sx={{fontSize:'0.85rem', opacity:0.8, pr:'4px'}}>Note:</Typography>
            <Typography sx={{fontSize:'0.85rem', opacity:0.8}}>An even number is divisible by 2, while an odd number is not.</Typography>
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>sample Input: </Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                4
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>sample Output:</Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
                even
            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>Constraints:</Typography>
            <Box sx={{width:'fit-content', height:'23px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', pr:'10px', mb:'40px'}}>
            <Typography sx={{fontSize:'0.9rem', opacity:0.8}}>-10<sup>6</sup> ≤ n ≤ 10<sup>6</sup></Typography> {/* this must fixed TODO */}

            </Box>
            <Typography sx={{fontSize:'0.9rem'}}>Input Format:</Typography>
            <Box sx={{width:'200px', height:'40px', background:theme.palette.background.default, mt:'10px', borderRadius:1.3, alignItems:'center', display:'flex', pl:'10px', mb:'40px'}}>
            One integer n.
            </Box>

            {/* {-10^6 <= n <= 10^6} */}





        </Box>
    </>
  )
}

export default ProblemDetails