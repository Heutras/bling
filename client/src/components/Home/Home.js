import { Container, Grid, Grow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/posts';
import { setAuth } from '../../slices/auth';
import Form from '../Form/Form'
import Posts from '../Posts/Posts'


function Home() {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchPosts())
    }
    ,[dispatch]);



    dispatch(setAuth(JSON.parse(localStorage.getItem('profile'))))
    
    // İlk girişte user data'sini okuyup redux store'a atan kod parcasi

    const posts = useSelector(( { posts } ) => posts.posts);  
    
    return (
        <Grow in>
            <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                <Posts posts={posts} setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
            </Container>
        </Grow>
  )
}

export default Home