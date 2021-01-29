import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BiQuestionMark, BiPlus } from "react-icons/bi"
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";



function EditQuestionItem(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl_team, setAnchorEl_team] = React.useState(null);
    const [anchorEl_schedule, setAnchorEl_schedule] = React.useState(null);
    const [value, setValue] = React.useState('Unlimited');


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick_team = (event) => {
        setAnchorEl_team(event.currentTarget);
    };

    const handleClose_team = () => {
        setAnchorEl_team(null);
    };

    const handleClick_schedule = (event) => {
        setAnchorEl_schedule(event.currentTarget);
    };

    const handleClose_schedule = (event) => {
        setValue(event.target.value);
        setAnchorEl_schedule(null);
    };



    return (

        <Box flexDirection="row" borderRadius ={10} style ={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA", }} >
            <Grid container justify={'space-between'} alignItems={'center'} direction = 'row'>
                <Grid direction={'row'} item xs ={12} md={6} lg = {6}>
                    <Box alignItems="center" display="flex" flexDirection="row" >
                        <Box style = {{height: 25, width: 25, margin: 10}} borderRadius = {100} border = {2} borderColor = "lightgrey">
                            <BiQuestionMark size = {20} style = {{color: 'lightgrey'}} />
                        </Box>
                        <TextField
                            placeholder="add a questions"
                            multiline
                            value =  {props.tracker.call[props.item].label}
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            rowsMax={4}
                        />
                    </Box>
                </Grid>

                <Grid item direction={'row'}>
                    <Box style = {{padding: 0}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>
                        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Type:
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Text</MenuItem>
                            <MenuItem onClick={handleClose}>Number</MenuItem>
                        </Menu>
                        <p style = {{margin: 10}}>
                            Text
                        </p>
                    </Box>
                </Grid>



                <Grid item direction={'row'}>

                    <Box style = {{padding: 0}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>
                        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_team}>
                            Type:
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl_team}
                            keepMounted
                            open={Boolean(anchorEl_team)}
                            onClose={handleClose_team}
                        >
                            <MenuItem onClick={handleClose_team}>Text</MenuItem>
                            <MenuItem onClick={handleClose_team}>Number</MenuItem>
                        </Menu>
                        <p style = {{margin: 10}}>
                            Text
                        </p>
                    </Box>

                </Grid>



                <Grid item direction={'row'}>

                    <Box style = {{padding: 0}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>
                        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_schedule}>
                            Schedule:
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl_schedule}
                            keepMounted
                            open={Boolean(anchorEl_schedule)}
                            onClose={handleClose_schedule}
                        >
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleClick_schedule}>
                                    <FormControlLabel value="female" control={<Radio />} label="Unlimited" />
                                    <FormControlLabel value="male" control={<Radio />} label="Once a Week" />
                                    <FormControlLabel value="other" control={<Radio />} label="Once a Month" />
                                </RadioGroup>
                            </FormControl>
                        </Menu>
                        <p style = {{margin: 10}}>
                            Text
                        </p>
                    </Box>

                </Grid>


            </Grid>
        </Box>
    );
}

export default EditQuestionItem;
