import { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './api';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import bling from './images/bling1.webp';

import useStyles from './styles';
import { setPosts, createPost } from './slices/posts';

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const a = useSelector(( { posts } ) => posts.posts);
  // console.log(a,"bu a'nin degeri");
  // // let b = dispatch(setPosts(res.data));
  // useEffect(() => {
  //   console.log("buradki fetchpost calisiyo")
  //   fetchPosts().then(res => console.log("bu resin degeri",res))
  // }, [])
  
  
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
            Bling
            <img className={classes.image} src={bling} alt="bling" height="60"/>
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
