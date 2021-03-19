import React from 'react';
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import AppsIcon from '@material-ui/icons/Apps';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Head, { siteTitle } from 'src/components/head';

export const menuItems = [
  {
    name: 'Articles',
    icon: <DescriptionIcon />,
    href: '/articles'
  },
  {
    name: 'Works',
    icon: <AppsIcon />,
    href: '/works'
  },
  {
    name: 'Profile',
    icon: <AccountCircleIcon />,
    href: '/profile'
  },
  {
    name: 'Contact',
    icon: <MailIcon />,
    href: '/contact'
  }
];

const Header = styled(AppBar)`
  flex-grow: 1;
  margin-bottom: 1rem;
`
const Bland = styled(Typography)`
  flex-grow: 1;
`
const SiteLogo = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
`
const Footer = styled.footer`
  text-align: center;
`
const Main = styled.main`
  margin-bottom: 1rem;
`
const NoContainer = styled.div`
  margin-top: -1rem;
`
const MenuButton = styled(Button)`
  margin-right: 0.5rem;
`
const ListItemTextStyled = styled(ListItemText)`
  margin-right: 0.5rem;
`

export default function Layout({
  children,
  isNoContainer
}: {
  children: any,
  isNoContainer?: any
}) {
  const [state, setState] = React.useState({
    isDrawerOpen: false,
  });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, isDrawerOpen: open });
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map(item => (
          <Link key={item.name} href={item.href} passHref>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemTextStyled primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Header position="static">
        <Toolbar>
          <Bland variant="h6">
            <Link href='/' passHref>
              <SiteLogo>{siteTitle}</SiteLogo>
            </Link>
          </Bland>
          <Hidden smDown>
            {menuItems.map(item => (
              <Link key={item.name} href={item.href} passHref>
                <MenuButton color="inherit">{item.name}</MenuButton>
              </Link>
            ))}
          </Hidden>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={state.isDrawerOpen} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </Hidden>
        </Toolbar>
      </Header>
      <Main>
        {isNoContainer ? (
          <NoContainer>
            {children}
          </NoContainer>
        ) : (
          <Container>
            {children}
          </Container>
        )}
      </Main>
      <Footer>
        <p>© 2020 PrismCube</p>
      </Footer>
    </>
  )
}
