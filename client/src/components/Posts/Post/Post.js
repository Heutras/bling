import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from './styles';
import { formatDistanceToNow } from 'date-fns';
import { deletePost, likePost } from '../../../api';
import { fetchPosts } from '../../../slices/posts';
import { useDispatch } from 'react-redux';
import { Notify } from '../../Form/Form';


const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        deletePost(id).then(res => {
            
            if(res.status === 200){
                dispatch(fetchPosts())
                Notify("Delete", true)
            }
        }).catch(Notify("Delete", false))
    }
    const handleLike = (id) => {
        likePost(id).then( res => {
            console.log(res.status);
            if(res.status === 200){
                dispatch(fetchPosts())
            }
        })
    }
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{formatDistanceToNow(Date.parse(post.createdAt))} ago</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size="small" 
                    onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={(e, id) => {handleLike(post._id)}}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={(e, id) => {handleDelete(post._id)}}>
                    <DeleteIcon fontSize="small"/>
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;