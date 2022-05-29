import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { Link } from 'react-router-dom'

export default function ButtonAppBar() {


  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={'Bisection'} disablePadding>
          <ListItemButton>
            <Link to="/Bisection">Bisection</Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={'False Position'} disablePadding>
          <ListItemButton>
            <Link to="/FalsePosition">FalsePosition</Link>
          </ListItemButton>
        </ListItem>
        <ListItem key={'Newton Raphson'} disablePadding>
          <ListItemButton>
            <Link to="/Newton">Newton Raphson</Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={'List'} disablePadding>
          <ListItemButton>
            <Link to="/Equations">Example</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <React.Fragment key={'left'}>
            <IconButton onClick={toggleDrawer('left', true)} ><MenuIcon /></IconButton>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </React.Fragment>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Numerical Method
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
