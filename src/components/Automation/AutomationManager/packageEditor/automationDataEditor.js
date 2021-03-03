import React from 'react';
import EditQuestionItem from "../editQuestionItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {fade, makeStyles} from "@material-ui/core/styles";

import { BiSend, BiPlus,BiMessageSquareDetail,BiMessageSquareDots,BiMessageSquareError,BiMessageSquareCheck } from "react-icons/bi";
import nextId from "react-id-generator";
import {db} from "../../../../api/firebase";
import firebase from "firebase/app";


function AutomationDataEditor(props) {
    const classes = useStyles();
    const addQuestion = async() => {
        let id =  nextId();
        let newCall = {
            callID: id,
            label: 'type your question here...',
            order: id,
            type: 'text',
            responseData: null,
            structuredMessage: true,
            timeStamp: new Date(),
        };
        const trackRef = await db.collection('trackers').doc(props.tracker.id);
        const addCall = await trackRef.update({
            call: firebase.firestore.FieldValue.arrayUnion(newCall)
        })
    };

    return (
        <div>

            <Button
                style = {{margin: 10}}
                variant="contained"
                color = 'primary'
                className={classes.button}
                startIcon={<BiPlus/>}
                onClick={()=>addQuestion()}
            >
                Add Question
            </Button>

            <Button
                style = {{margin: 10}}
                variant="contained"
                color = 'primary'
                className={classes.button}
                startIcon={<BiPlus/>}
                onClick={()=>addQuestion()}
            >
                Add Task
            </Button>

            <Button
                style = {{margin: 10}}
                variant="contained"
                color = 'primary'
                className={classes.button}
                startIcon={<BiPlus />}
                onClick={()=>addQuestion()}
            >
                Add Rating
            </Button>

            {(props.tracker.call)
                ?
                <div>
                    {Object.keys(props.tracker.call).map((item) =>
                        <EditQuestionItem
                            item = {item}
                            user = {props.user}
                            tracker = {props.tracker}
                        />
                    )}
                </div>
                : null
            }

        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
        // minHeight: 200,
        // maxWidth: 540,
        // backgroundColor: 'white',
    },
}));

export default AutomationDataEditor;
