import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ posts, setCurrentId }) => {
    const classes = useStyles();
    return (
    !posts.length ?
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}><CircularProgress color="error" size={175}/></Grid> :
    (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((x)=> <Grid key={x._id} item xs={12} sm={6} md={6}><Post post={x} setCurrentId={setCurrentId}/></Grid>)}
        </Grid>
    )
    );
};

export default Posts;