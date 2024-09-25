'use client'
import { useLoading } from '@/hooks/useLoading'
import { Backdrop } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

export const Loader = () => {
  const { value } = useLoading()

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={value !== 100}
    >
      <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999999 }}>
        <LinearProgress color='success' variant="determinate" value={value} />
      </Box>
    </Backdrop>
  )
}
