import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import * as api from '../../api/index.js';
import { createPost, updatePost } from '../../slices/posts';
import useStyles from './styles';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Notify = (type, result) => {
    if(type === "Create" ){
        result ? toast.success("Post Created!") : toast.error("Post Creation Failed!");
    }
    else if( type === "Update"){
        result ? toast.success("Post Updated!") : toast.error("Post Update Failed!");
    }
    else if(type === "Dislike"){
        result ? toast.success("Post Disliked!") : toast.error("Post Could Not Be Disliked!");
    }
    else if(type === "Like"){
        result ? toast.success("Post Liked!") : toast.error("Post Could Not Be Liked!");
    }
    else if(type === "Comment"){
        result ? toast.success("Thank you for sharing your opinion!") : toast.error("You can't comment right know!");
    }
    else{
        result ? toast.success("Post Deleted!") : toast.error("Post Could Not Be Deleted!");
    }
};

const Form = ({ currentId, setCurrentId }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const post = useSelector(( state ) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const [postData, setPostData] = useState({title:'', message:'', tags:'', selectedFile:''})
    const user = useSelector( (state) => state.auth.user);
    useEffect(() => {
      if(post) setPostData(post);
    }, [post])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentId === 0) {
            api.createPost({...postData, name: user?.name}).then((res) => {
                if(res.status === 201 ){
                    Notify("Create", true);
                    dispatch(createPost(res.data));
                    history.push(`/posts/${res.data._id}`)          
                }
                else{
                    Notify("Create", false);
                }
            });
        }else{
            api.updatePost(currentId, postData).then((res) => {
                if(res.status === 200 ){
                    dispatch(updatePost({...postData, name: user?.userName}));
                    Notify("Update", true)
                }
                else{
                    Notify("Update", false)
                }
            });
        }
    }
    const clear = () => {
        setCurrentId(0);
        setPostData({title:'', message:'', tags:'', selectedFile:''});
    }

    if(!user){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Please Sign In to create your own memories and like other's memories</Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper} elevation={6}>
            <Toaster/>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >Creating a Post</Typography>
                <TextField name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
            </form>
        </Paper>
    )
}

export default Form;