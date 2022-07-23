import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import useStyles from './styles';


const Posts = () => {

    const classes = useStyles();
    const posts = useSelector( (x)=> x.posts);
    return (
        <>
            <h1>posts</h1>
            <Post/>
            <Post/>
        </>
    )
}

export default Posts;