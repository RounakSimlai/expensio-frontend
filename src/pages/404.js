import { Button, Grid } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404 () {
  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Image
            priority
            src='/not-found.svg'
            alt="404 Not Found"
            height={200}
            width={400}
          />
        </Grid>
        <Grid item xs={12}>
          <h1>OOPS!</h1>
        </Grid>
        <Grid item xs={12}>
          <h1>We cannot seem to find the page you are looking for!</h1>
        </Grid>
        <Grid item xs={12}>
          <Link href="/"><Button variant='contained'>Back to Home</Button></Link>
        </Grid>
      </Grid>
    </>
  )
}