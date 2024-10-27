import { Box, Button, Icon, Typography, useTheme } from '@mui/material'
import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

type Props = {}

const ProblemtopicsPage = (props: Props) => {

  const theme = useTheme();
  return (
    <>
        <Box sx={{width:'9.rem', height:'720px', display:'flex', flexDirection:'column', background: theme.palette.background.default}}>
            <Navbar/>
            <Box sx={{display:'flex', flexDirection:'column', jusheight:'80px', background:'#d2dff3', paddingLeft:'100px', paddingY:'20px'}}>
                <Typography variant='h6' sx={{ opacity:0.6}}>Problme</Typography>
                <Typography variant='h4' color='#010104' sx={{fontWeight:600}} >Solve problems to enahnce you skills</Typography>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Typography variant='h5' sx={{color:'text.main', padding:'10px', opacity:'0.8', paddingY:'20px'}}>Solve By Topics</Typography>
            <Box sx={{width:'1000px', height:'300px', background:'white', padding:'30px'}}>
                <Button variant='contained' sx={{width: '200px',height: '40px',color:theme.palette.primary.main, display:'flex'}}><Typography sx={{color:theme.palette.primary.contrastText, display:'flex', alignItems:'center', background:'white'}}><Icon></Icon>Python</Typography></Button>
            </Box>

            </Box>




        </Box>
    </>
  )
}

export default ProblemtopicsPage
