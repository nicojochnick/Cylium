import React, {useEffect} from 'react';
import {db} from "../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import TyperTracker from "./typerTracker";
import TrackerResponseItem from "../Responses/trackerResponseItem";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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
            console.log('Added document with ID: ', res.id);
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
        console.log(responseCollection)

    };

    return (
        <div className={classes.root}>
            <Box className={classes.box}
                 boxShadow={0}
                // border = {2}
                // borderColor = {'#8B8FA0'}
                 style={{padding: 10, minHeight: 100}}
                 borderRadius={2}>
            <Grid direction = 'column' container alignItems='center' justify = 'center'>
            {(props.tracker.call)
                ?
                <div>
                    {Object.keys(props.tracker.call).map((item) =>
                        <TyperTracker
                            question={props.tracker.call[item]}
                            pushResponse = {pushResponse}
                        />
                        )}
                </div>
                : null
            }
            <Grid container justify='center'>
            <Button

                onClick={()=> handleSubmit()}
                style = {{width: 200, margin: 10}} variant="contained" color="primary">
                Submit
            </Button>
            </Grid>
            </Grid>
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        padding: 0,
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

export default TyperList;
