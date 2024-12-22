import { Box, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { text } from 'stream/consumers'

interface Props {}

const Navbar = (props: Props) => {
  const theme = useTheme();
  return (
    <>
        <Box sx={{width:'9.rem', height:'50px', background: theme.palette.background.default, display:'flex', justifyContent:'space-between', alignItems:'center', pr:'20px', pl:'20px'}}>
            <Box> 
                <Typography sx={{ fontWeight:'bold', fontSize:'25px'}}>FOCSA eLab</Typography> {/* add the logo */}
            </Box>
            <Box sx={{display: 'flex', justifyContent:'sp', alignItems:'center'}}>
                <Link to={'/'} style={{ marginRight: '50px', textDecoration: 'none' }}><Typography sx={{color:'text.primary', '&:hover':{color:'primary.main'}, fontWeight:''}}>Home</Typography></Link>
                <Link to={'/ProblemtopicsPage'} style={{ marginRight: '50px', textDecoration: 'none' }}><Typography sx={{color:'text.primary', '&:hover':{color:'primary.main'}}}>Problems</Typography></Link>
                <Link to={'/ContestPage'} style={{ marginRight: '50px',textDecoration: 'none' }}><Typography sx={{color:'text.primary', '&:hover':{color:'primary.main'}}}>Contest</Typography></Link>
                <Link to={'/'} style={{marginRight: '50px', textDecoration: 'none'}}><Typography sx={{color:'text.primary', '&:hover':{color:'primary.main'}}}>LeaderBoard</Typography></Link>
            </Box>
            <Box><Typography>Profile</Typography></Box>
            
        </Box>
        <Box sx={{width:'9.rem', height:'0.5px', background:'black'}}></Box>
    </>
  )
}

export default Navbar