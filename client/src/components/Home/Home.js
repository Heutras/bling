import { Container, Grid, Grow, Paper, AppBar, TextField, Button, Chip } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchPosts, fetchPostsBySearch } from '../../slices/posts';
import { setAuth } from '../../slices/auth';
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import Pagination from '../Pagination'
import useStyles from './styles.js'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Home() {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    useEffect(() => {
      dispatch(fetchPosts())
    }
    ,[]);

    useEffect(() => {
      dispatch(setAuth(JSON.parse(localStorage.getItem('profile'))))
      // İlk girişte user data'sini okuyup redux store'a atan kod parcasi
    },[])
    

    const posts = useSelector(( { posts } ) => posts.posts);  
    
    
    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch(fetchPostsBySearch({ search, tags: tags.join(',') }))
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }
      else{
        history.push('/');
      }
    }
    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        searchPost();
      }
    }

    const handleTags = (event, tag) => setTags(tag) // doesn't work without event parameter
    return (
        <Grow in>
            <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts posts={posts} setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField name="search" variant="outlined" label="Search memories" fullWidth value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyPress={handleKeyPress}/>
                    <Autocomplete
                      multiple
                      options={[]}
                      freeSolo
                      onChange={handleTags}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (<TextField {...params} variant="outlined" label="Search Tags" style={{ margin: '10px 0' }}/>)
                      }
                    />
                    <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>
                  </AppBar>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                  <Paper elevation={6}>
                    <Pagination/>
                  </Paper>
                </Grid>
            </Grid>
            </Container>
        </Grow>
  )
}

export default Home