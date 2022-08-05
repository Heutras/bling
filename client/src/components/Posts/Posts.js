import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ posts, setCurrentId }) => {
    const { loading } = useSelector((state) => state.posts);
    const classes = useStyles();
    if(!posts?.length && !loading) return 'No posts';
    return (
    loading ?
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}><CircularProgress color="error" size={175}/></Grid> :
    (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((x)=> <Grid key={x._id} item xs={12} sm={12} md={6} lg={3}><Post post={x} setCurrentId={setCurrentId}/></Grid>)}
        </Grid>
    )
    );
};

export default Posts;