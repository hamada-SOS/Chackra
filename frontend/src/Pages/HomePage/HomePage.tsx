import React from 'react'
import TheFuckinD from '../../Components/Drawer/TheFuckinD'
import Navbar from '../../Components/Navbar/Navbar'
import { Box } from '@mui/material'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
    <Box sx={{width:"9.rem", height:'720px', backgroundColor:'background.default'}}>
      <Navbar/>
    </Box>
    </>
  )
}

export default HomePage