import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AutomationHeader from "./automationHeader";
import EditableUserID from "../../components/Profile/User/editableUserID";
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AutomationAnalytics from "./automationAnalytics";
import Message from "../../components/Messages/Chat/message";
import StructuredMessageItem from "../../components/Messages/Chat/structuredMessageItem";
import {db} from "../../api/firebase";
import TyperTracker from "../Typers/typerTracker";
import TyperList from "../Typers/typerList";
import AutomationRecipients from "./AutomationManager/automationRecipients";
import PackageManger from "./AutomationManager/packageManger/packageManger";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AutomationRecurrenceEditor from "./AutomationManager/automationRecurrence/automationRecurrenceEditor";
import AutomationRecurrenceContainer from "./AutomationManager/automationRecurrence/automationRecurrenceContainer";
import buildingbackground from "../../assets/images/buildingbackground.png"


function mergeArrayObjects (arr1,arr2){
    console.log(arr1,arr2);
    return arr1.map((item,i) => {
        if(arr2[i] && item.callID === arr2[i].callID){
            //merging two objects
            return Object.assign({},item,arr2[i])
        }
    })
}
function AutomationItem(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    let trackerTitle = 'Engagement';
    const [responses, setResponses] = React.useState([]);
    const [isPosting, setPosting] = React.useState(false);
    const [isCreating, setCreating] = React.useState(false);
    const [isDatafying, setData] = React.useState(false);
    const [title, setTitle] = React.useState(props.tracker.name);
    const [height, setHeight] = React.useState(300);
    const [stretch, setStretch] = React.useState(6);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const switchPosting = async () =>{
        setPosting(!isPosting)
    };

    const switchCreating = async () =>{
        setCreating(true);
        setPosting(false);
    };

    const switchData = async () =>{
        setCreating(false)
    };

    const getResponses = async() => {
        let resRef = db.collection("responses");
        let responses = [];
        if (props.user && props.user.trackers && props.tracker) {
            await resRef.where("trackerID", "==", props.tracker.id).get()
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
                if (props.tracker.call) {
                    let res = mergeArrayObjects(responses[i].responseData, props.tracker.call);
                    let objres = {'merged_responses': res, 'user': responses[i].senderID};
                    merged_responses.push(objres)
                }
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
        if (props.tracker.call && props.tracker.call.length > 0) {
            getResponses()
        }
        if (false){
            setHeight(600);
        }

    }, []);

    return (
        <div className={classes.root}>
        <Box className={classes.box}
             boxShadow = {0}
             border = {1}
             borderColor = {'#AFADBC'}
             style ={{padding: 0, boxShadow: "0px 0px 0px #D7D7DA",backgroundColor:'#F7F7F7', margin: 10}}
             borderRadius={10}
            >
            <AutomationHeader
                id = {props.tracker.id}
                tracker = {props.tracker}
                user = {props.user}
                switchData = {switchData}
                switchCreating = {switchCreating}
                switchPosting = {switchPosting}
                isCreating = {isCreating}
                isPosting = {isPosting}
                backgroundColor = {backgroundColor}
                name= {title}
                handleTitleChange = {handleTitleChange}
            />
                <Grid style = {{backgroundColor: 'white'}} container xs={12} md={12} lg={12}>
                    <Grid className={classes.box} style = {{backgroundColor: 'white',}} item xs={12} md={12} lg={12}>
                        <Box className={classes.root} display = 'flex' style = {{height: 400,backgroundSize: 'cover', padding: 5, }}>
                         <PackageManger user = {props.user} tracker = {props.tracker} />
                        </Box>
                    </Grid>
                {/*    <Grid className = {classes.inner_box} item xs={4} sm = {4} md={4} lg={4}>*/}
                {/*        <Box borderRadius = {10} border = {1} borderColor = {'#AFADBC'} style = {{margin: 10, marginBottom: 0, background: 'white', boxShadow: "0px 0px 0px 0px #DDDAEA"}} className={classes.boxSticky}>*/}
                {/*            <Tabs*/}
                {/*                value={value}*/}
                {/*                onChange={handleChange}*/}
                {/*                indicatorColor="primary"*/}
                {/*                textColor="primary"*/}
                {/*                variant="fullWidth"*/}
                {/*                centered*/}
                {/*            >*/}
                {/*                <Tab style={{maxWidth:50}}  label="Feed" />*/}
                {/*                <Tab style={{maxWidth:50}}  label="Recipients" />*/}
                {/*            </Tabs>*/}
                {/*        </Box>*/}

                {/*        <Grid style = {{margin:5 }} container xs={12}>*/}
                {/*            <Grid className={classes.inner_box} item xs={12} md={12} lg={12}>*/}
                {/*                {(value == 0)*/}
                {/*                    ?*/}
                {/*                    <Box style={{height: height}}>*/}
                {/*                        {Object.keys(responses).map((item) =>*/}
                {/*                            <Message*/}
                {/*                                user={props.user}*/}
                {/*                                tracker={props.tracker}*/}
                {/*                                response={responses[item]}/>)}*/}
                {/*                    </Box>*/}
                {/*                    : null*/}
                {/*                }*/}
                {/*                {(value == 1)*/}
                {/*                    ?*/}

                {/*                    <Box style={{height: height, margin: 3}}>*/}
                {/*                        <AutomationRecipients*/}
                {/*                            user={props.user}*/}
                {/*                            tracker={props.tracker}*/}
                {/*                        />*/}
                {/*                    </Box>*/}

                {/*                    : null*/}
                {/*                }*/}
                {/*                {(value == 2)*/}
                {/*                    ?*/}
                {/*                    <Box style={{height: height}}>*/}
                {/*                        <AutomationRecurrenceContainer/>*/}
                {/*                    </Box>*/}

                {/*                    : null*/}
                {/*                }*/}

                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*</Grid>*/}
                </Grid>
            <Divider/>

        </Box>

        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
        display: 'flex',
    },

    tabs: {
        maxWidth: 50,

    },
    box:{
        flexGrow: 1,
        padding: 0,

        display: 'start',
        overflow: 'hidden',
        flexDirection: 'column',
        position: 'relative',
        overflowY: 'hidden',
        backgroundColor: 'white',

        // overflowY: 'scroll',
        // margin: 10,
        // marginBottom: 20,
        // backgroundColor: 'white',
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        margin:0,
        display: 'flex',
        overflowY: 'scroll',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginRight: -20,
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'flex',
        // overflow: 'auto',
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
    },
}));


export default AutomationItem;


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



// <div>
//     {!isPosting
//         ? <Grid className = {classes.box} container spacing={0} xs={12}>
//             <Grid className = {classes.inner_box} style = {{ maxHeight: height,backgroundColor:'##F7F7F7' }} item xs={12} md={12} lg={12}>
//                 {/*<TrackerLytics responses = {responses} />333*/}
//                 {responses
//                     ?
//                     <Grid >
//                         <Divider/>
//                         {Object.keys(responses).map((item) =>
//                             <ResponseList
//                                 user = {props.user}
//                                 tracker={props.tracker}
//                                 response={responses[item]}/>)}
//                     </Grid>
//                     : null
//                 }
//             </Grid>
//
//         </Grid>
//         :
//         <Grid className = {classes.inner_box} style = {{ maxHeight: height,backgroundColor:'##F7F7F7' }} item xs={12} md={12} lg={12}>
//         <TyperList user={props.user} tracker={props.tracker}/>
//         </Grid>
//     }
// </div>
