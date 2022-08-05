import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import * as api from '../../api/index.js';
import useStyles from './styles';
import { updatePost } from '../../slices/posts.js';
import { Notify } from '../Form/Form.js';
import { Toaster } from 'react-hot-toast';

const CommentSection = ({ post}) => {
    // const { post: { comments } } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState("")
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('gelen com',comments)
    const handleClick = () => {
        const finalComment = `${user.userName}: ${comment}`
        api.comment(finalComment, post._id).then((res) => {
            if (res.status === 200) {
                dispatch(updatePost(res.data));
                Notify("Comment", true)
            }
            else {
                Notify("Comment", false)
            }
        });
    }

    return (
        <div>
            <Toaster/>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                </div>
                {user?.userName && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="subtitle1">
                            <TextField
                                fullWidth
                                rows={4}
                                variant="outlined"
                                label="Comment"
                                multiline
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
                                submit coment
                            </Button>
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection