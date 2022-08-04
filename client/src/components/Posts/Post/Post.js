import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useStyles from './styles';
import { formatDistanceToNow } from 'date-fns';
import * as api from '../../../api';
import { deletePost, updatePost} from '../../../slices/posts';
import { useDispatch, useSelector} from 'react-redux';
import { Notify } from '../../Form/Form';
import defaultPostImg from '../../../images/default_post.png'


const Post = ( {post, setCurrentId} ) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [likes, setLikes] = useState(post?.likes)
    
    const userId = user?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);
    const handleDelete = (id) => {
        api.deletePost(id).then(res => {
            if(res.status === 200){
                dispatch(deletePost(res.data._id))
                Notify("Delete", true)
            }
            else{
                Notify("Delete", false);
            }
        })
    }
    const handleLike = (id) => {
        api.likePost(id).then( res => {
            if(res.status === 200){
                dispatch(updatePost(res.data))
                Notify("Like", true)
            }
            else{
                Notify("Like", false)
            }
        });

        if(hasLikedPost){
            setLikes(post.likes.filter((id) => id !== userId));
        }
        else {
            setLikes([...post.likes, userId])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><FavoriteIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><FavoriteBorderIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FavoriteBorderIcon fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.card}>
            {post.selectedFile ? (
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            ) : (
                <CardMedia className={classes.media} image={defaultPostImg} title={post.title}/>
            )}
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{formatDistanceToNow(Date.parse(post.createdAt))} ago</Typography>
            </div>
            {(user?._id === post?.creator) && (
                <div className={classes.overlay2} name="edit">
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={(e, id) => handleLike(post._id)} disabled={!user}>
                    <Likes />
                </Button>
                {user?._id === post?.creator && (
                    <Button size="small" color="primary" onClick={(e, id) => handleDelete(post._id)}>
                        <DeleteIcon fontSize="small"/> &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;