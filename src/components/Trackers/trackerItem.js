import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {BiHappy} from 'react-icons/bi'
import TrackerTitleTag from "./trackerTitleTag";
import Pulse from "../../assets/images/pulse.gif";
import UserId from "../User/userID";
import ShareBoxx from "../Old/Share/shareBoxx";
import TrackerLytics from "./trackerLytics";
import TrackerResponse from "../Responses/trackerResponse";
import TrackerResponseItem from "../Responses/trackerResponseItem";
import {db} from "../../api/firebase";
import TyperTracker from "../Typers/typerTracker";
import TyperList from "../Typers/typerList";

function mergeArrayObjects (arr1,arr2){
    return arr1.map((item,i) => {
        if(item.callID === arr2[i].callID){
            //merging two objects
            return Object.assign({},item,arr2[i])
        }
    })
};


function TrackerItem(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    let trackerTitle = 'Engagement';
    const [responses, setResponses] = React.useState([]);

    const getResponses = async() => {
        let resRef = db.collection("responses");
        let responses = [];
        if (props.user && props.user.team && props.tracker) {
            console.log('TRIGGERED')
            await resRef.where('teamID', '==', props.user.team).where("trackerID", "==", props.tracker.id).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        responses.push(doc.data())
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });

            let merged_responses = [];
            for (let i = 0; i < responses.length; i++){
                let res = mergeArrayObjects(responses[i].responseData, props.tracker.call);
                let objres = {'merged_responses': res, 'user': responses[i].senderID}
                merged_responses.push(objres)
            }
            console.log(merged_responses, responses, props.tracker.call)
            setResponses(merged_responses)
        }
    };

    useEffect(() => {
        getResponses()
    }, []);
    console.log(responses);
    return (
        <Box className={classes.box}
             boxShadow = {0}
             style ={{padding: 0, boxShadow: "0px 5px 10px #D7D7DA"}}
             borderRadius={20}>
            <TrackerTitleTag backgroundColor = {backgroundColor} trackerTitle = {props.tracker.trackerName} />
            <Grid style = {{height: 300}} container spacing={0} xs={12}>
                <Grid className = {classes.boxSticky} style = {{backgroundColor:'#2F2C37', height: 300, }} item xs={12} md={5} lg={5}>
                    <TrackerLytics responses = {responses} />
                </Grid>
                <Grid style = {{height: 300}} item xs={12} md={7} lg={7}>
                    <Box style = {{height: 300}} className={classes.inner_box}>
                {props.isTeamView
                    ? <div>
                        <TyperList tracker = {props.tracker} />
                    </div>
                    : <div>
                    </div>
                }
                {responses
                    ?
                    <Grid >
                        {Object.keys(responses).map((item) =>
                            <TrackerResponse
                                tracker={props.tracker}
                                response={responses[item]}/>)}
                    </Grid>
                    : null
                }
                    </Box>
            </Grid>
            </Grid>
        </Box>
    );
};




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
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: 'white',
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


export default TrackerItem;
