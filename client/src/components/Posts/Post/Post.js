import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useStyles from './styles';
import { formatDistanceToNow } from 'date-fns';
import * as api from '../../../api';
import { deletePost, updatePost } from '../../../slices/posts';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from '../../Form/Form';
import defaultPostImg from '../../../images/default_post.png'
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.auth);
    const [likes, setLikes] = useState(post?.likes)
    const userId = user?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);
    const handleDelete = (id) => {
        api.deletePost(id).then(res => {
            if (res.status === 200) {
                dispatch(deletePost(res.data._id))
                Notify("Delete", true)
            }
            else {
                Notify("Delete", false);
            }
        })
    }
    const handleLike = (id) => {
        api.likePost(id).then(res => {
            if (res.status === 200)  dispatch(updatePost(res.data))
        });

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
            Notify("Dislike", true)
        }
        else {
            setLikes([...post.likes, userId])
            Notify("Like", true)
        }
    }

    const openPost = () => history.push(`/posts/${post._id}`)
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><FavoriteIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><FavoriteBorderIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><FavoriteBorderIcon fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile || defaultPostImg} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{formatDistanceToNow(Date.parse(post.createdAt))} ago</Typography>
                </div>
                {(user?._id === post?.creator) && (
                    <div className={classes.overlay2} name="edit">
                        <Button
                            style={{ color: 'white' }}
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
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={(e, id) => handleLike(post._id)} disabled={!user}>
                    <Likes />
                </Button>
                {user?._id === post?.creator && (
                    <Button size="small" color="primary" onClick={(e, id) => handleDelete(post._id)}>
                        <DeleteIcon fontSize="small" /> &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;