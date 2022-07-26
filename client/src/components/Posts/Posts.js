import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress} from "@material-ui/core";
import Post from './Post/Post'
import useStyles from './styles';


const Posts = () => {

    const classes = useStyles();
    //const posts = useSelector( (x)=> x.posts);
    const posts = {
        creator:"alper",
        postCreatedAt: new Date(),
        tags: ["cok","fena"],
        message:"mesah1",
        likeCount: 25,

    };
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((x) => (
                    <Grid key={x._id} item xs={12} sm={6}>
                        <Post post={Post}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;