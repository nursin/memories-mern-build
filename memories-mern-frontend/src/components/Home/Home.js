import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

function Home() {
    const [currentId, setCurrentId] = useState(null);
    // const classes = useStyles();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container flexDirection="column-reverse" justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home