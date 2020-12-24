import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EditSurveyQuestion from './editSurveyQuestion'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SurveyQuestion from "./surveyQuestion";
import {db} from "../../api/firebase";

let rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

let token = function() {
    return rand() + rand(); // to make it longer
};

function SurveySettings(props) {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleSwitchQuestion = async(key, on) => {
        console.log(key)
        let survey = {};
        let path = `survey.questions.${key}.on`;
        survey[path] = !on;
        const res = await db.collection('teams').doc(props.user.team).update(survey)
    };
    console.log(props.survey);
    return (
        <div>
            <Grid style = {{padding: 10}} container justify='center' direction = 'column'>
                <p style = {{fontSize: 17, textAlign: 'left', fontWeight: 300, marginBottom: 10, color:"#10102F"}}>
                    Send Date: {props.survey.date.toDate().toDateString()}
                </p>
                <Divider/>
                {
                    <Grid container direction = 'column' style ={{padding: 10}} spacing={2}>
                        {Object.keys(props.survey.questions).map((key) => <EditSurveyQuestion handleSwitchQuestion = {handleSwitchQuestion} id = {key} item={props.survey.questions[key]}/>)}
                    </Grid>
                }

            </Grid>

        </div>
    );
}

export default SurveySettings;
