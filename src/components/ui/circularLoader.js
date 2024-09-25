import { Box, CircularProgress } from '@mui/material'

export default function CircularLoader () {
  return (
    <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
      <CircularProgress thickness={5} size={60}/>
    </Box>
  )
}