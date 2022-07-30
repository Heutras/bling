import React from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import bling from '../../images/bling1.webp';

import useStyles from './styles.js';


const user = null;

function Navbar() {
    const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Bling</Typography>
        <img className={classes.image} src={bling} alt="bling" height="60"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                </div>
            ) : (
                <div>
                    <Button component={Link} to="/auth" variant="contained" color="primary">SIGN IN</Button>
                </div>

            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar