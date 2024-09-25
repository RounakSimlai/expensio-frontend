import { useState } from 'react'
import { Modal, Tabs, Tab, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import LoginTab from './login'
import RegisterTab from './register'

export default function AuthModal ({isOpen}) {

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: 'background.paper',
    borderRadius: '2%',
    boxShadow: 24,
    p: 4
  }

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(1)
  const [open] = useState(isOpen)
  const handleClose = () => {
    dispatch({type: 'authModal/close'})
  }

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <IconButton sx={{position: 'relative', left: '90%'}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Tabs value={activeTab} onChange={(event, newValue) => { changeTab(newValue) }} centered>
          <Tab value={1} label="Login" />
          <Tab value={2} label="Register" />
        </Tabs>
        {activeTab === 1 && <LoginTab /> }
        {activeTab === 2 && <RegisterTab /> }
      </Box>
    </Modal>
  )
}