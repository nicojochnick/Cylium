import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import AutomationList from "../components/Apps/Automation/automationList";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import UserProfile from "../components/User/userProfile";
import TeamBox from "../components/User/Team/teamBox";
import {TwitterPicker} from "react-color";
import NotificationList from "../components/Utilities/Notifications/notificationList";

function AccountView(props) {
    const classes = useStyles();


    const [backgroundColor, setBackgroundColor] = React.useState('white');
    const handleChangeComplete = (color) => {setBackgroundColor(color.hex )};




    return (
        <div className={classes.root} >
            <Container fixed maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm ={12} md={6} lg={6}>
                        <Box borderRadius={10}  flexWrap="wrap" style = {{boxShadow: "0px 5px 10px #D7D7DA",}} boxShadow = {0} className={classes.box}>
                            <Grid justify="space-between" direction = "row" container>
                                <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                    NOTIFICATIONS
                                </h2>
                            </Grid>
                            <Divider style ={{marginTop:0}}/>

                            <NotificationList user = {props.user} notifications = {props.notifications} />

                        </Box>
                    </Grid>
                    <Grid direction = 'column' container xs={12} sm={12} md={6} lg={6}>
                        <Box className={classes.box} boxShadow = {0} style = {{maxHeight: 500, boxShadow: "0px 5px 10px #D7D7DA"}} borderRadius={10} >
                            <h2 style ={{margin: 15, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                               PROFILE
                            </h2>
                            <Divider style ={{marginTop:0}}/>
                            {/*<UserProfile email = {props.email} url = {props.url} user = {props.user} />*/}
                            <Box style = {{margin: 20, }}>
                                <Grid  style = {{marginTop: 20}}  spacing={2} container direction = 'row'>
                                    <Grid  spacing={3} item xs={6} md = {6} lg = {6} >
                                        <Box style = {{marginTop: 0}} >
                                            {props.user
                                                ?<UserProfile user={props.user}/>
                                                : null
                                            }
                                            <Grid container space = {2} direction = 'row'>
                                            </Grid>
                                        </Box>
                                    </Grid>

                                    <Grid spacing={3} item xs={6} >
                                    </Grid>
                                </Grid>
                            </Box>
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


export default AccountView;


{/*<Grid*/}
{/*    alignItems='center'*/}
{/*    justify = 'center'*/}
{/*    item xs={6}*/}
{/*    md = {6}*/}
{/*    lg = {6}>*/}
{/*    <Box*/}
{/*        display = 'flex'*/}
{/*        alignItems = 'start'*/}
{/*        justifyContent="center"*/}
{/*        style = {{marginTop: -5}}>*/}
{/*        <TwitterPicker*/}
{/*            color={ backgroundColor}*/}
{/*            onChangeComplete={ handleChangeComplete }*/}
{/*        />*/}
{/*    </Box>*/}
{/*</Grid>*/}
