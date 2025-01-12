import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
function TableSkeleton() {
  return (

    <Box sx={{ width: window.innerWidth - 50 }}>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
      <Typography variant="h4" ><Skeleton /> </Typography>
    </Box>
  )
}

export default TableSkeleton