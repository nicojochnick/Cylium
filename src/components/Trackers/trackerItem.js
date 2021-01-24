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


    const switchPosting = async () =>{
        setPosting(!isPosting)
    };

    const switchCreating = async () =>{
        setCreating(!isCreating);
        setPosting(false);

    };

    const switchData = async () =>{
        setData(!isDatafying)

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

    useEffect(() => {
        getResponses()
    }, []);
    console.log(responses);
    return (
        <Box className={classes.box}
             boxShadow = {0}
             style ={{padding: 0, margin: 10, boxShadow: "0px 5px 10px #D7D7DA",backgroundColor:'#F7F7F7' , }}
             borderRadius={20}>
            <TrackerTitleTag
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
                <Box  style = {{height: 550, backgroundColor:'white'}} className={classes.inner_box}>
                <TrackerManager
                    tracker={props.tracker}
                />
                </Box>
                :
                <div>
                    {!isPosting
                        ? <Grid container spacing={0} xs={12}>
                            <Grid className = {classes.boxSticky} style = {{ maxHeight: 400,backgroundColor:'##F7F7F7' }} item xs={12} md={12} lg={12}>
                                {/*<Box border = {1} borderColor = {"white"}>*/}
                                <TrackerLytics responses = {responses} />
                                {responses
                                    ?
                                    <Grid >
                                        {Object.keys(responses).map((item) =>
                                            <TrackerResponse
                                                user = {props.user}
                                                tracker={props.tracker}
                                                response={responses[item]}/>)}
                                    </Grid>
                                    : null
                                }
                                {/*</Box>*/}
                            </Grid>

                        </Grid>
                        : <TyperList user={props.user} tracker={props.tracker}/>
                    }
                </div>

            }



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
        // margin: 10,
        // marginBottom: 20,
        // backgroundColor: 'white',
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
        // backgroundColor: 'white',
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
