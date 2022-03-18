import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const [currentId, setCurrentId] = useState(null);
    // const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState(['Europe', 'Spain']);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const searchPost = () => {
        if (search.trim()) {
            // dispatch fetch search post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        } else {
            history('/')
        }
    }

    return (
        <Grow in>
            <Container maxwidth="xl">
                <Grid container flexDirection="column-reverse" justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* <TextField
                                style={{margin: '10px 0'}}
                                variant="outlined"
                                label="Search Tags"
                                fullWidth
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            /> */}
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Paginate />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home