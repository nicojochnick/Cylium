import React from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";


function SurveyQuestion(props) {
    console.log(props.question);
    return (
        <div>
            <Grid item>
                <p> {props.question.label} </p>
                { (props.question.type === 'text')
                    ? <TextField
                        variant="outlined"
                        fullWidth
                        rows={10}
                        multiline
                        required
                        label= 'start typing....'
                        placeholder=""
                        onChange={()=>console.log('submit')}
                        rowsMax={5}
                        value={''}
                    />
                    :
                    <div style = {{marginTop: 35}}>
                    <Slider
                        defaultValue={5}
                        getAriaValueText={''}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        valueLabelDisplay="on"
                        step={0.5}
                        marks
                        min={1}
                        max={10}
                    />
                    </div>
                }
            </Grid>

        </div>
    );
}

export default SurveyQuestion;
