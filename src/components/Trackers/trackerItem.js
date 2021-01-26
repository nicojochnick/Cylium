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
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';


import TrackerLytics from "./trackerLytics";
import TrackerResponse from "../Responses/trackerResponse";
import TrackerResponseItem from "../Responses/trackerResponseItem";
import {db} from "../../api/firebase";
import TyperTracker from "../Typers/typerTracker";
import TyperList from "../Typers/typerList";
import TrackerManager from "../CreateTrackers/trackerManager";

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
    const [isPosting, setPosting] = React.useState(false);
    const [isCreating, setCreating] = React.useState(false);
    const [isDatafying, setData] = React.useState(false);
    const [title, setTitle] = React.useState(props.tracker.trackerName);
    const [height, setHeight] = React.useState(600);
    const [stretch, setStretch] = React.useState(6)



    const switchPosting = async () =>{
        setPosting(!isPosting)
        props.setStretch(6);
    };

    const switchCreating = async () =>{
        isCreating ? props.setStretch(6) : props.setStretch(12);
        setCreating(!isCreating);
        setPosting(false);


    };

    const switchData = async () =>{
        setData(!isDatafying)
        props.setStretch(6);

    };

    const defaultProps = {
        m: 1,
        borderColor: 'white',
    };



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
            console.log(merged_responses, responses, props.tracker.call);
            setResponses(merged_responses)
        }
    };


    const handleTitleChange = (val) => {
        setTitle(val);

    };

    let totalHeight = height + 100;

    useEffect(() => {
        getResponses()
        if (false){
            setHeight(600);
        }

    }, []);

    return (
        <div className={classes.root}>
            <Grid container>
        <Box className={classes.box}
             boxShadow = {0}
             style ={{padding: 0, margin: 10, boxShadow: "0px 5px 10px #D7D7DA",backgroundColor:'#F7F7F7' , }}
             borderRadius={20}>
            <TrackerTitleTag
                ownerEmail = {props.tracker.ownerEmail}
                switchData = {switchData}
                switchCreating = {switchCreating}
                switchPosting = {switchPosting}
                isCreating = {isCreating}
                isPosting = {isPosting}
                backgroundColor = {backgroundColor}
                trackerTitle = {title}
                handleTitleChange = {handleTitleChange}
            />

            {isCreating
                ?
                <Grid container spacing={0} xs={12}>
                <Grid className = {classes.inner_box} style = {{ maxHeight: height,backgroundColor:'##F7F7F7' }} item xs={12} md={12} lg={12}>
                <Box style = {{height: height, backgroundColor:'white'}} className={classes.inner_box}>
                <TrackerManager
                    tracker={props.tracker}
                />
                </Box>
                </Grid>
                </Grid>
                :
                <div>
                    {!isPosting
                        ? <Grid className = {classes.box} container spacing={0} xs={12}>
                            <Grid className = {classes.inner_box} style = {{ maxHeight: height,backgroundColor:'##F7F7F7' }} item xs={12} md={12} lg={12}>
                                <TrackerLytics responses = {responses} />
                                {responses
                                    ?
                                    <Grid >
                                        <Divider/>
                                        {Object.keys(responses).map((item) =>
                                            <TrackerResponse
                                                user = {props.user}
                                                tracker={props.tracker}
                                                response={responses[item]}/>)}
                                    </Grid>
                                    : null
                                }
                            </Grid>

                        </Grid>
                        :
                        <Grid className = {classes.inner_box} style = {{ maxHeight: height,backgroundColor:'##F7F7F7' }} item xs={12} md={12} lg={12}>
                        <TyperList user={props.user} tracker={props.tracker}/>
                        </Grid>
                    }
                </div>

            }



        </Box>
            </Grid>
        </div>
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
        position: 'relative',
        // margin: 10,
        // marginBottom: 20,
        // backgroundColor: 'white',
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflowY: 'scroll',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginRight: -15
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        // backgroundColor: 'white',
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
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


{/*<Grid style = {{height: 350,}} item xs={12} md={7} lg={7}>*/}
{/*    <Box borderColor = {"#2F2C37"} borderLeft={1} style = {{height: 350, backgroundColor:'#F7F7F7',}} className={classes.inner_box}>*/}
{/*        <Grid container justify={'center'} alignItems = {'center'}>*/}
{/*            {(isPosting)*/}
{/*                ? <TyperList user={props.user} tracker={props.tracker}/>*/}
{/*                : null*/}
{/*            }*/}

{/*        </Grid>*/}


{/*        <Divider/>*/}


{/*    </Box>*/}
{/*</Grid>*/}
