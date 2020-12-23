import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

    return (
        <div>
            <Grid style = {{padding: 10}} container justify='center' direction = 'column'>
                <p style = {{fontSize: 17, textAlign: 'left', fontWeight: 300, marginBottom: 10, color:"#10102F"}}>
                    Send Date:
                </p>

                <Divider/>

                <FormControlLabel
                control={<Checkbox checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                              label='Form Question 1'
                />
                <FormControlLabel control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary"/>}
                              label="Form Question 2"
                />
                <FormControlLabel control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" color="primary"/>}
                              label="Form Question 2"
                />
                <FormControlLabel control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" color="primary"/>}
                              label="Form Question 2"/>

            </Grid>

        </div>
    );
}

export default SurveySettings;
