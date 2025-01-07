import React from 'react'


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ButtonLoader() {
    return (
        <Box className="flex justify-center" sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
}
