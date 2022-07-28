import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../api';
import useStyles from './styles';
import toast, { Toaster } from "react-hot-toast";
import { fetchPosts } from '../../slices/posts';

const successNotify = () => toast.success("Post Created!");
const errorNotify = () => toast.error("Post Creation Failed!");

const Form = () => {
    
    const classes = useStyles();
    const posts = useSelector(state => state.posts);
    const [postData, setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:'' 
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postData).then((res) => {
            try {
                successNotify(res);
            } catch (error) {
                errorNotify(error.code);
            }
        });
    }
    const clear = () => {

    }
    return (
        <Paper className={classes.paper}>
            <Toaster/>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >Creating a Post</Typography>
                <TextField name="creator" variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
                <TextField name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
            </form>
        </Paper>
    )
}

export default Form;