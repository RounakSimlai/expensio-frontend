import { Grid, Card, Typography, CardContent, CardHeader, Avatar } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { Paid } from '@mui/icons-material'

export default function Dashboard () {
  // States

  return (
    <>
      <Grid container justifyContent='center' alignItems='center' spacing={10} px={5} pb={10} >
        <Grid item xs={4}>
          <Card raised >
            <CardContent>
              <Grid container justifyContent='center' alignItems='center' spacing={10}>
                <Grid item xs={2}>
                  <Avatar variant='rounded'><Paid /></Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h6'>Total Amount Spent</Typography>
                  <Typography variant='h5'>$0.00</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card raised >
            <CardContent>
              <Grid container justifyContent='center' alignItems='center' spacing={10}>
                <Grid item xs={2}>
                  <Avatar variant='rounded'><Paid /></Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h6'>Total Amount Spent</Typography>
                  <Typography variant='h5'>$0.00</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card raised >
            <CardContent>
              <Grid container justifyContent='center' alignItems='center' spacing={10}>
                <Grid item xs={2}>
                  <Avatar variant='rounded'><Paid /></Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h6'>Total Amount Spent</Typography>
                  <Typography variant='h5'>$0.00</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' spacing={10} px={5} >
        <Grid item xs={6}>
          <Card raised >
            <CardHeader title="Categorised Spendings" sx={{borderBottom: '1px solid #757575'}}/>
            <CardContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' }
                    ]
                  }
                ]}
                width={500}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card raised >
            <CardHeader title="Categorised Spendings" sx={{borderBottom: '1px solid #757575'}}/>
            <CardContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}