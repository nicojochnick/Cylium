import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function SurveySettings(props) {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    return (
        <div>
            <Grid style = {{padding: 10}} container justify='center' direction = 'column'>
            <FormControlLabel
                control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="Secondary"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Primary"
            />

            </Grid>

        </div>
    );
}

export default SurveySettings;
