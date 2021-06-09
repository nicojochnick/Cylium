import React, {Component} from 'react';
import LanderHeader from '../../components/Headers/Header';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";
import {FaBoxOpen} from "react-icons/fa";
import Lander from "./lander"
// import KanbanNode from "../../components/Nodes/NodeList/List/kanbanNode"
import mmlogo from "../../assets/images/mmlogo.png"
import Button from "@material-ui/core/Button";


class home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container style = {{backgroundColor: "white", height: '100vh', width: '100vw'}}>


                <Box  style = {{backgroundColor: "white", height: '100vh', width: '100vw'}} display = 'flex' flexDirection = 'column' alignItems = 'center' justifyContent = 'center'>
                    <img style ={{height: 80}}src = {mmlogo} />
                    <Link to={`/signup`} style={{ textDecoration: 'none' }}>
                        <Button  variant="contained" noWrap style={{
                            borderRadius: 5,
                            margin: 10,
                            backgroundColor: '#4D6DF1',
                        }}>
                            <p style = {{color: 'white', margin: 2, marginRight: 20, marginLeft: 20,fontWeight: 500}}>
                                signup
                            </p>
                        </Button>
                    </Link>
                    <Link to={`/login`} style={{ textDecoration: 'none' }}>
                    <Button  variant="contained" noWrap style={{
                            borderRadius: 5,
                            margin: 10,
                            backgroundColor: '#3B3C50',
                        }}>
                            <p style = {{color: 'white', margin: 2, marginRight: 20, marginLeft: 20,fontWeight: 500}}>
                                Login
                            </p>
                        </Button>
                    </Link>



                </Box>

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
