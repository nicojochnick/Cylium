import React from 'react';
import Url from "../components/URL";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

function EditFeedbox(props) {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Url/>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },

}));
export default EditFeedbox;
