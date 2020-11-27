import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Topic from "./topic";


function MyTopics(props) {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">What is your feedback most about?</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="Comm" control={<Topic />} label="Communication" />
                <FormControlLabel value="SWE" control={<Radio />} label="Software Engineering" />
                <FormControlLabel value="Exec" control={<Radio />} label="Execution" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
}
export default MyTopics;
