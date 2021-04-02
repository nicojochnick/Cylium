import React, {Component} from 'react';
import Header from '../../components/Utilities/Header';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";
import {FaBoxOpen} from "react-icons/fa";
import Lander from "../../views/lander"

class home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid style = {{backgroundColor: "white",height: '100vh',}}>
                <Header/>
                <Lander/>
            </Grid>
        )
    }
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default withStyles(styles, { withTheme: true })(home);

{/*<Paper className={classes.paper}>*/}
{/*    <section>*/}
{/*        <div className="jumbotron jumbotron-fluid py-5">*/}
{/*            <div className="container text-center py-5">*/}
{/*                <FaBoxOpen size = {50}/>*/}
{/*                <h1 className="display-4">FeedBoxx</h1>*/}
{/*                <p className="lead">Your virtual feedback box*/}
{/*                </p>*/}
{/*                <div className="mt-4">*/}
{/*                    <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account </Link>*/}
{/*                    <hr/>*/}
{/*                    <Link className="btn px-5" to="/login">Login to Your Account</Link>*/}
{/*                </div>*/}
{/*            </div>*/}
{/*        </div>*/}
{/*    </section>*/}
{/*</Paper>*/}

{/*<Grid item xs={4}>*/}


{/*</Grid>*/}
//
// <Grid
//     direction="column"
//     alignItems="center"
//     justify="center"
//     maxWidth="lg"
//     container spacing={1}>
//
// </Grid>
