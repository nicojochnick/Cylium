import React, {useEffect} from 'react';
import {db} from "../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import TyperTracker from "./typerTracker";
import TrackerResponseItem from "../Responses/trackerResponseItem";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

function TyperList(props) {
    const [successSubmit, setSuccess] = React.useState(false);
    const [error, setError] = React.useState('');
    const [responseCollection, setResponseCollection]  = React.useState([]);
    const classes = useStyles();

    useEffect(() => {
    }, []);
    const handleSubmit = async (event) => {
        try {
            const res = await db.collection('responses').add({
                responseData: responseCollection,
                senderID: props.user.email,
                teamID: props.user.team,
                timeStamp: new Date(),
                trackerID: props.tracker.id
            });
            // db.collection('responses').doc(res.id).update({
            //     trackerID: res.id
            // });
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError({error: error.message});
        }
    };

    const pushResponse = async (response, callID, type, order) => {
        responseCollection[order] = {
            callID: callID,
            type: type,
            response: response,
        };
        setResponseCollection(responseCollection);
    };

    return (
        <div className={classes.root}>
            <Grid container>
            <Grid item xs = {12} md = {12} lg = {12}>
            <Box className={classes.box}
                 boxShadow={0}
                 flexGrow = {1}
                 display="flex"
                // border = {2}
                // borderColor = {'#8B8FA0'}
                 style={{minHeight: 100}}
                 borderRadius={2}>
            <Grid direction = 'column' container alignItems="center" justify = "center">
                    {(props.tracker.call)
                        ?
                        <div>
                            {Object.keys(props.tracker.call).map((item) =>
                                <TyperTracker
                                    question={props.tracker.call[item]}
                                    pushResponse = {pushResponse}
                                />)}
                        </div>
                        : null
                    }
                        <Grid container justify='center'>
                            <Button
                                onClick={()=> handleSubmit()}
                                style = {{width: 200,marginTop: 10, margin: 20}}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        padding: 0,
        flexGrow: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',

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


{/*<Grid item xs={1.5} md={1.5} lg={1.5}>*/}
{/*    <Box style={{margin: 10}} border={2} borderColor={'#4D6DF1'} borderRadius={50}>*/}
{/*        <Avatar src={props.user.img_url_Profile.imgUrl} className={classes.large}/>*/}
{/*    </Box>*/}
{/*</Grid>*/}


{/*<Grid justify='center' alignItems='center' direction="row" container style={{margin: 0,}}>*/}

{/*    /!*<Grid item xs={10} md={10} lg={10}>*!/*/}
{/*        <p style={{*/}
{/*            margin: 8,*/}
{/*            marginTop: 2,*/}
{/*            marginBottom: 0,*/}
{/*            fontSize: 15,*/}
{/*            fontWeight: 500,*/}
{/*        }}>{props.user.name} </p>*/}

{/*    /!*</Grid>*!/*/}
{/*</Grid>*/}

export default TyperList;
