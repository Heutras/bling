import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../api';
import { fetchPosts } from '../../slices/posts';
import useStyles from './styles';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';

const successCreateNotify = () => toast.success("Post Created!");
const errorCreateNotify = () => toast.error("Post Creation Failed!");
const successUpdateNotify = () => toast.success("Post Updated!");
const errorUpdateNotify = () => toast.error("Post Update Failed!");

const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const post = useSelector(( state ) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

    const [postData, setPostData] = useState({ creator:'', title:'', message:'', tags:'', selectedFile:''})
    
    useEffect(() => {
      if(post) setPostData(post);
    }, [post])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(currentId === 0) {
            createPost(postData).then((res) => {
                console.log(res);
                if(res.status === 201 ){
                    successCreateNotify();
                    dispatch(fetchPosts());
                    
                }
                else{
                    errorCreateNotify();
                }
            }).catch((e) => errorCreateNotify());
        }else{
            updatePost(currentId, postData).then((res) => {
                if(res.status === 200 ){
                    successUpdateNotify();
                    dispatch(fetchPosts());
                    
                }
                else{
                    errorUpdateNotify();
                }
            }).catch((e) => errorUpdateNotify());
        }
    }
    const clear = () => {
        setCurrentId(0);
        setPostData({ creator:'', title:'', message:'', tags:'', selectedFile:''});
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