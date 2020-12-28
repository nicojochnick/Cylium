import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TrackerEdit from './trackerEdit'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TrackerItem from "./trackerItem";
import {db} from "../../api/firebase";

let rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

let token = function() {
    return rand() + rand(); // to make it longer
};

function TrackerSettings(props) {
    const [survey, setSurvey] = React.useState(null)
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleSwitchQuestion = async(id, on) => {
        let fb_survey = {};
        let path = `survey.questions.${id}.on`;
        fb_survey[path] = on;
        const res = await db.collection('teams').doc(props.user.team).update(fb_survey)
    };

    useEffect(() => {
        db.collection("teams").doc(props.user.team)
            .onSnapshot(function (doc) {
                let survey = doc.data().survey;
                setSurvey(survey);
            });
    }, []);


    return (
        <div>
            {(survey)
              ? <Grid container justify='center' direction = 'column'>

                    <Grid container direction = 'column' style ={{padding: 10}} spacing={2}>
                        {Object.keys(survey.questions).map((id) => <TrackerEdit handleSwitchQuestion = {handleSwitchQuestion} id = {id} item={survey.questions[id]}/>)}
                    </Grid>
            </Grid>
                :null
                }
        </div>
    );
}

export default TrackerSettings;

{/*<p style = {{fontSize: 17, textAlign: 'left', fontWeight: 300, marginBottom: 10, color:"#10102F"}}>*/}
{/*    Send Date: {survey.date.toDate().toDateString()}*/}
{/*</p>*/}
{/*<Divider/>*/}
