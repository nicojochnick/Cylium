import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import UserProfile from "../components/User/userProfile";
import {makeStyles} from "@material-ui/core/styles";
import QuestionSettings from "../components/Questions/questionSettings";
import TeamOverallStats from "../components/Analytics/teamOverallStats";

function TeamHome(props) {
    const classes = useStyles();

    return (
        <div>
            <Container fixed maxWidth="lg" className={classes.container}>
                <Grid container spacing={2}>
                    <Grid direction = 'column' container xs={12} sm={12} md={4} lg={4}>
                        <Box className={classes.box} boxShadow = {0} style = {{maxHeight: 500, boxShadow: "0px 5px 10px #D7D7DA"}} borderRadius={10} >
                            <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                SURVEY
                            </h2>
                            <Divider style ={{marginTop:0}}/>
                            {(props.survey['date'])
                                ?<QuestionSettings user = {props.user} survey={props.survey}/>
                                : null //TODO add loader
                            }
                        </Box>
                        <Box className={classes.box} boxShadow = {0} style = {{maxHeight: 500, boxShadow: "0px 5px 10px #D7D7DA"}} borderRadius={10} >
                            <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                TRENDS
                            </h2>
                            <Divider style ={{marginTop:0}}/>
                            <TeamOverallStats user = {props.user} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm ={12} md={8} lg={8}>
                        <Box borderRadius={10}  flexWrap="wrap" style = {{boxShadow: "0px 5px 10px #D7D7DA",}} boxShadow = {0} className={classes.box}>
                            <Grid justify="space-between" direction = "row" container>
                                <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                    TEAM
                                </h2>
                            </Grid>
                            <Divider style ={{marginTop:0}}/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        minHeight: 300,
    },

    boxSticky:{
        padding: 0,
        top: "5rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        minHeight: 300,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    paper: {
        justify: 'center',
        padding: theme.spacing(2),
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    fixedHeight: {
        height: 350,
    },
}));


export default TeamHome;
