import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/posts';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
    const posts = useSelector(( { posts } ) => posts.posts);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchPosts())
    }, [dispatch])
    const classes = useStyles();
    return (
    !posts.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((x)=> <Grid key={x._id} item xs={12} sm={6} md={6}><Post post={x}/></Grid>)}
        </Grid>
    )
    );
};

export default Posts;