import { useState } from 'react'
import { useRouter } from 'next/router'
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List, Divider, Tooltip, tooltipClasses } from '@mui/material'
import { Dashboard as DashboardIcon, People as PeopleIcon, Category as CategoryIcon, Person as PersonIcon, FeaturedVideo as FeaturedVideoIcon, LocalOffer as LocalOfferIcon, Security as SecurityIcon, Inventory as InventoryIcon, BarChart as BarChartIcon, ExpandLess, ExpandMore, ListAlt, LocalShipping, Payments, Receipt, Book, DeliveryDining, LocalAtm, AccountTree, PlaceRounded } from '@mui/icons-material'
import styled from '@emotion/styled'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 14
  }
}))

export default function MainListItems ({handleDrawerToggle, openDrawer}) {

  const router = useRouter()

  const [openMenu, setOpenMenu] = useState(false)

  const handleClick = () => {
    setOpenMenu(!openMenu)
  }
  const redirectTo = (link = null) => {
    if (link) {
      router.push(link)
    }
    if (handleDrawerToggle) {
      handleDrawerToggle()
    }
  }
  return (
    <>
      {openDrawer && (
        <List component="nav">
          <ListItemButton onClick={() => redirectTo('/admin')} sx={{pl: 3}}>
            <ListItemIcon>
              <DashboardIcon sx={{color: 'text.secondary'}} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => redirectTo('/admin/customer-master')} sx={{pl: 3}}>
            <ListItemIcon>
              <PeopleIcon sx={{color: 'text.secondary'}}/>
            </ListItemIcon>
            <ListItemText primary="Customer Master" />
          </ListItemButton>
          <ListItemButton onClick={() => redirectTo('/admin/item-master')} sx={{pl: 3}}>
            <ListItemIcon>
              <InventoryIcon sx={{color: 'text.secondary'}} />
            </ListItemIcon>
            <ListItemText primary="Item Master" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => redirectTo('/admin/category-header-master')} sx={{pl: 3}}>
            <ListItemIcon>
              <AccountTree sx={{color: 'text.secondary'}}/>
            </ListItemIcon>
            <ListItemText primary="Category Header Master"  primaryTypographyProps={{ noWrap: true }}/>
          </ListItemButton>
          <ListItemButton onClick={() => redirectTo('/admin/category-master')} sx={{pl: 3}}>
            <ListItemIcon>
              <CategoryIcon sx={{color: 'text.secondary'}}/>
            </ListItemIcon>
            <ListItemText primary="Category Master" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => redirectTo('/admin/user-master')} sx={{pl: 3}}>
            <ListItemIcon>
              <PersonIcon sx={{color: 'text.secondary'}}/>
            </ListItemIcon>
            <ListItemText primary="User Master" />
          </ListItemButton>
          <ListItemButton onClick={() => redirectTo()} sx={{pl: 3}}>
            <ListItemIcon>
              <SecurityIcon sx={{color: 'text.secondary'}}/>
            </ListItemIcon>
            <ListItemText primary="Authorisation" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => redirectTo()} sx={{pl: 3}}>
            <ListItemIcon>
              <LocalOfferIcon sx={{color: 'text.secondary'}}/>
            </ListItemIcon>
            <ListItemText primary="Offers" />
          </ListItemButton>
          <ListItemButton onClick={handleClick} sx={{pl: 3}}>
            <ListItemIcon>
              <BarChartIcon sx={{color: 'text.secondary'}} />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {openMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAlt sx={{color: 'text.secondary'}} />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalShipping sx={{color: 'text.secondary'}} />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Payments sx={{color: 'text.secondary'}} />
                </ListItemIcon>
                <ListItemText primary="Payments" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Receipt sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="Invoices" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Book sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="Ledger" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <DeliveryDining sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="Transportation" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalAtm sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="MIS" />
              </ListItemButton>
              <Divider />
            </List>
          </Collapse>
        </List>
      )}
      {!openDrawer && (
        <List component="nav">
          <LightTooltip title="Dashboard" placement="right">
            <ListItemButton onClick={() => redirectTo('/admin')} sx={{pl: 3}}>
              <ListItemIcon>
                <DashboardIcon sx={{color: 'text.secondary'}} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </LightTooltip>
          <Divider />
          <LightTooltip title="Customer Master" placement="right">
            <ListItemButton onClick={() => redirectTo('/admin/customer-master')} sx={{pl: 3}}>
              <ListItemIcon>
                <PeopleIcon sx={{color: 'text.secondary'}}/>
              </ListItemIcon>
              <ListItemText primary="Customer Master" />
            </ListItemButton>
          </LightTooltip>
          <LightTooltip title="Item Master" placement="right">
            <ListItemButton onClick={() => redirectTo('/admin/item-master')} sx={{pl: 3}}>
              <ListItemIcon>
                <InventoryIcon sx={{color: 'text.secondary'}} />
              </ListItemIcon>
              <ListItemText primary="Item Master" />
            </ListItemButton>
          </LightTooltip>
          <Divider />
          <LightTooltip title="Category Head Master" placement="right">
            <ListItemButton onClick={() => redirectTo('/admin/category-header-master')} sx={{pl: 3}}>
              <ListItemIcon>
                <AccountTree sx={{color: 'text.secondary'}}/>
              </ListItemIcon>
              <ListItemText primary="Category Header Master"  primaryTypographyProps={{ noWrap: true }}/>
            </ListItemButton>
          </LightTooltip>
          <LightTooltip title="Category Master" placement="right">
            <ListItemButton onClick={() => redirectTo('/admin/category-master')} sx={{pl: 3}}>
              <ListItemIcon>
                <CategoryIcon sx={{color: 'text.secondary'}}/>
              </ListItemIcon>
              <ListItemText primary="Category Master" />
            </ListItemButton>
          </LightTooltip>
          <Divider />
          <LightTooltip title="User Master" placement="right">
            <ListItemButton onClick={() => redirectTo('/admin/user-master')} sx={{pl: 3}}>
              <ListItemIcon>
                <PersonIcon sx={{color: 'text.secondary'}}/>
              </ListItemIcon>
              <ListItemText primary="User Master" />
            </ListItemButton>
          </LightTooltip>
          <LightTooltip title="Authorisation" placement="right">
            <ListItemButton onClick={() => redirectTo()} sx={{pl: 3}}>
              <ListItemIcon>
                <SecurityIcon sx={{color: 'text.secondary'}}/>
              </ListItemIcon>
              <ListItemText primary="Authorisation" />
            </ListItemButton>
          </LightTooltip>
          <Divider />
          <LightTooltip title="Offers" placement="right">
            <ListItemButton onClick={() => redirectTo()} sx={{pl: 3}}>
              <ListItemIcon>
                <LocalOfferIcon sx={{color: 'text.secondary'}}/>
              </ListItemIcon>
              <ListItemText primary="Offers" />
            </ListItemButton>
          </LightTooltip>
          <LightTooltip title="Reports" placement="right">
            <ListItemButton onClick={handleClick} sx={{pl: 3}}>
              <ListItemIcon>
                <BarChartIcon sx={{color: 'text.secondary'}} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {openMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </LightTooltip>
          <Divider />
          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAlt sx={{color: 'text.secondary'}} />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalShipping sx={{color: 'text.secondary'}} />
                </ListItemIcon>
                <ListItemText primary="Dispatch" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Payments sx={{color: 'text.secondary'}} />
                </ListItemIcon>
                <ListItemText primary="Payments" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Receipt sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="Invoices" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Book sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="Ledger" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <DeliveryDining sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="Transportation" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalAtm sx={{color: 'text.secondary'}}/>
                </ListItemIcon>
                <ListItemText primary="MIS" />
              </ListItemButton>
              <Divider />
            </List>
          </Collapse>
        </List>
      )}
    </>
  )
}
