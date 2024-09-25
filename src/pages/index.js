'use client'

import { AttachMoney, CurrencyRupee, Description, Euro, ImportExport, Savings } from '@mui/icons-material'
import { Avatar, Grid, Typography } from '@mui/material'
import Image from 'next/image'

export default function Home () {

  return (
    <>
      <Grid container direction={{xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row'}} justifyContent='space-around' alignItems='center' px={{xl: 40, lg: 10, md: 10, sm: 0, xs: 0}}>
        <Grid xs={8} item>
          <Image alt='' src='/front-page.svg' width='500' height='500' />
        </Grid>
        <Grid xs={4} item>
          <Typography variant='h3' textAlign='center' paddingBottom={2}>Your Personal Expenses Tracker & Budget Planner</Typography>
          <Typography variant='h5' textAlign='center'>Because managing your finances should not feel like a game of Tetris.</Typography>
        </Grid>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center' pt={{xl: 5, lg: 5, md: 10, sm: 5, xs: 5}} spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} container direction='column' justifyContent='center' alignItems='center' spacing={2} pb={2}>
          <Grid item container direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><AttachMoney /></Avatar>
            </Grid>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><Savings /></Avatar>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='body2'>Tracking Incomes and Expenses</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} container direction='column' justifyContent='center' alignItems='center' spacing={2} pb={2}>
          <Grid item container direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><ImportExport /></Avatar>
            </Grid>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><Description /></Avatar>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='body2'>Import & Export Data in CSV, XLSX Formats </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} container direction='column' justifyContent='center' alignItems='center' spacing={2} pb={2}>
          <Grid item container direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><Euro /></Avatar>
            </Grid>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><AttachMoney /></Avatar>
            </Grid>
            <Grid item>
              <Avatar sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}><CurrencyRupee /></Avatar>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='body2'>Multi-currency Support</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}