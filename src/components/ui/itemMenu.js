import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'

const images = [
  {
    url: '/tea-bg.jpg',
    title: 'Tea',
    width: '40%',
    href: '/tea'
  },
  {
    url: '/food-bg.jpg',
    title: 'Food',
    width: '30%',
    href: '/food'
  },
  {
    url: '/cart-bg.jpg',
    title: 'Cart',
    width: '30%',
    href: '/cart'
  },
  {
    url: '/wl-bg.jpg',
    title: 'Wishlist',
    width: '30%',
    href: '/wishlist'
  }
]

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15
    },
    '& .MuiImageMarked-root': {
      opacity: 0
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor'
    }
  }
}))

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%'
})

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}))

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity')
}))

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity')
}))

export default function ItemMenu ({handleDrawerToggle, checkSignedIn, loggedIn}) {
  const router = useRouter()

  const changeUrl = (routePath) => {
    handleDrawerToggle()
    if (routePath === '/cart' || routePath === '/wishlist') {
      if (loggedIn) {
        router.push(routePath)
      } else {
        checkSignedIn()
      }
    } else {
      router.push(routePath)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 270, width: '100%', rowGap: 2 }}>
        {images.map((image) => (
          <>
            <ImageButton
              focusRipple
              key={image.id}
              style={{
                width: image.width
              }}
              onClick={() => { changeUrl(image.href) } }
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image alt=''>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          </>
        ))}
      </Box>
    </>
  )
}