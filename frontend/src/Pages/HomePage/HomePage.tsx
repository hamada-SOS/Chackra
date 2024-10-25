import React from 'react'
import TheFuckinD from '../../Components/Drawer/TheFuckinD'
import Navbar from '../../Components/Navbar/Navbar'
import { Box, Button, colors, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router'

interface Props {}

const HomePage = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const theme = useTheme()
  return (
    <>
    <Box sx={{width:"9.rem", height:'720px', backgroundColor:'background.default'}}>
      <Navbar/>
      <Box sx={{ width:'1.rem',display:'flex',justifyContent:'center', alignItems:'center'}}>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <Typography sx={{fontSize:'3.5rem', fontWeight:'h1.fontWeight', marginTop:'120px'}}>Welcome to <span style={{color:'#3a31d8'}}>FOCSA eLab</span> </Typography>
          <Typography sx={{fontSize:'h2.fontSize', fontWeight:'h2.fontWeight', marginTop:'10px', marginBottom:'10px'}}>A Hub for Competitive Programmers</Typography>
          <Typography sx={{fontSize:'h4.fontSize', fontWeight:'h6.fontWeight', whiteSpace:'pre-line'}}>Solve problems, participate in contests</Typography>
          <Typography sx={{fontSize:'h4.fontSize', fontWeight:'h6.fontWeight'}}>and climb the <span style={{color:'#3a31d8'}}>leaderboard!!</span></Typography>

          <Box sx={{marginTop:'30px', display:'flex', justifyContent:'space-between'}}>
            <Button variant='outlined' color='secondary' size='large' sx={{marginRight:'70px'} }>Join a Contset</Button>
            <Button variant='outlined' onClick={() => handleNavigation('/ProblemtopicsPage')} color='secondary' size='large'>See problems</Button>

          </Box>
        </Box>



      </Box>

    </Box>
    </>
  )
}

export default HomePage