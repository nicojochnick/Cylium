import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import UserId from '../User/userID'
import Feedback from "../Old/Feedback/feedback";
import {db} from "../../api/firebase";

function TeamBox(props) {
    const classes = useStyles();
    const [team, setTeam] = React.useState([]);

    const getTeam = async() => {
        let id = props.user.team
        const teamref = db.collection("teams").doc(id);
        const team = await teamref.get();
        const teamData = team.data();
        const members = teamData.members;
        setTeam(members);
    }

    useEffect(() => {
        if (props.user){
            getTeam()
        }
        console.log(team)


    }, []);


    return (
        <Grid direction = 'column' container>
            <p style = {{margin: 10, fontSize: 19, }}>
                {props.user.team}
            </p>
            <List>
                <Box border = {1}>
                {team.map((item) => <UserId  email = {item} />)}
                </Box>
            </List>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        flexGrow: 1,
        borderRadius: 10,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white'
    },

    rewardsImage: {
        height: 120,
        margin: 0,
        padding: 0,
        marginLeft: -10,

    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
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


export default TeamBox;
