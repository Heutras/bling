import React, { useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom';
import bling from '../../images/bling1.webp';
import { signOut } from "../../slices/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles.js';

function Navbar() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector( (state) => state.auth.user )
    const classes = useStyles();

    const logout = () => {
        dispatch(signOut());
        history.push('/auth');
    };
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const decodedToken = decode(token);
            console.log(decodedToken)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    }, [location]); 
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Bling</Typography>
            <img className={classes.image} src={bling} alt="bling" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.userName} src={user?.image}>{user?.userName?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.userName}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
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