import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input'
import Icon from './Icon';
import jwt_decode from 'jwt-decode';
import { auth, signIn, signUp } from '../../slices/auth';

const initialState = { firstName: '', lastName: '', email: '', password:'', confirmPassword:'' };
function Auth() {
    const history = useHistory();
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signUp(formData))
            history.push('/')
        }
        else{
            dispatch(signIn(formData))
            history.push('/')
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    const googleSuccess = (res) => {
        try {
            if(res?.credential){
                const { name, picture, sub } = jwt_decode(res.credential)
                const user = {
                    _id: sub,
                    _type: 'user',
                    userName: name,
                    image: picture
                }
                history.push('/');
                dispatch(auth({  token: res.credential, user}));
            }
        } catch (error) {
            console.log(error)
        }
    };
    const googleError = async(res) => {
        console.log(res)
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
                                <Input name="firstName" label="First Name" handleChange={handleChange} half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleShowPassword={handleShowPassword} handleChange={handleChange} type={showPassword ? 'text' : 'password'}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleError}
                    render={(renderProps) => (
                       <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                        Google Sign In
                       </Button> 
                    )}
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