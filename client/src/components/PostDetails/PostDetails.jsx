import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPost, fetchPostsBySearch } from '../../slices/posts';
import useStyles from './styles';
import defaultPostImg from '../../images/default_post.png'
const PostDetails = () => {
  const { post, posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id])

  useEffect(() => {
    dispatch(fetchPostsBySearch( {search: 'none', tags: post?.tags?.join(',')} ));
  }, [post])
  
  if (loading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
  }

  const recommendedPosts = posts.filter( ({_id}) => _id !== post?._id)
  
  const openPost = (_id) =>{
    history.push(`/posts/${_id}`)

  }
  return (
    <div className={classes.card}>
      {post ? (<>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post?.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">zaman</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post?.selectedFile || defaultPostImg} alt={post.title} />
        </div>
      </>) : (<>
        <div className={classes.section}>
          <Typography variant="h2">No Post!</Typography>
        </div>
      </>)}
        {recommendedPosts?.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">You might also like:</Typography>
            <Divider/>
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map( ({ title, message, name, likes, selectedFile, _id }) => (
                <div style={ {margin: '20px', cursor: "pointer"}} onClick={() => openPost(_id)} key={_id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                  <img src={selectedFile} width="200px"/>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default PostDetails