import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/posts';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ currentId ,setCurrentId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    const posts = useSelector(( { posts } ) => posts.posts);
    const classes = useStyles();
    return (
    !posts.length ?
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}><CircularProgress color="error" size={175}/></Grid> :
    (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((x)=> <Grid key={x._id} item xs={12} sm={6} md={6}><Post post={x} currentId={currentId} setCurrentId={setCurrentId}/></Grid>)}
        </Grid>
    )
    );
};

export default Posts;