import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

type Props = {}

const ProblemtopicsPage = (props: Props) => {
  return (
    <>
        <Box sx={{width:'9.rem', height:'720px', display:'flex', flexDirection:'column', }}>
            <Navbar/>
            <Box sx={{display:'flex', flexDirection:'column', jusheight:'80px', background:'#d2dff3', paddingLeft:'100px', paddingY:'20px'}}>
                <Typography variant='h6' sx={{ opacity:0.6}}>Problme</Typography>
                <Typography variant='h4' color='#010104' sx={{fontWeight:600}} >Solve problems to enahnce you skills</Typography>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Typography variant='h4' sx={{color:'text.main', padding:'10px',}}>Prepare By Topics</Typography>
            <Box>
                
            </Box>

            </Box>




        </Box>
    </>
  )
}

export default ProblemtopicsPage

function UseTheme() {
    throw new Error('Function not implemented.')
}
