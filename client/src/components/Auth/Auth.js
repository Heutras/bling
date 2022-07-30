import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input'
import { useDispatch } from "react-redux";

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            // dispatch(authAction);
        } catch (error) {
            
        }
    };
    const googleError = async(res) => {

    };
    return (

        <Container component="main" maxWidth="xs">
        
            <Paper className={classes.paper} elevation={3}>
            
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                {console.log("buraya giriyo")}
                                <Input name="firstName" label="First Name" handleChange={handleChange} half/>
                                <Input name="LastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleError}
                    useOneTap
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "'Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
  )
}

export default Auth