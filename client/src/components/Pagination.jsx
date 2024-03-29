import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPosts } from '../slices/posts';

const Paginate = ( {page} ) => {
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector ((state) => state.posts)
    const classes = useStyles();
    useEffect(() => {
        if(page) dispatch(fetchPosts(page));
    }, [page])
    
    return (
        <Pagination 
        classes={{ul : classes.ul}}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}
        />
    )
}

export default Paginate;