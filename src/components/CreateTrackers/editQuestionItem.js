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
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import EditTeamMemberItem from "./editTeamMemberItem";



function EditQuestionItem(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl_team, setAnchorEl_team] = React.useState(null);
    const [anchorEl_schedule, setAnchorEl_schedule] = React.useState(null);
    const [value, setValue] = React.useState('Unlimited');
    const [checked, setChecked] = React.useState([1]);



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

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
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
                        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_team}>
                            Recipients:
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl_team}
                            keepMounted
                            open={Boolean(anchorEl_team)}
                            onClose={handleClose_team}
                        >
                            {[0, 1, 2, 3].map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <EditTeamMemberItem
                                        withSelect = {true}
                                        value = {value}
                                        handleToggle = {handleToggle}
                                        labelID = {labelId}
                                        checked = {checked} />
                                );
                            })}
                        </Menu>
                        <AvatarGroup max={4}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
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


{/*<Grid item direction={'row'}>*/}
{/*    <Box style = {{padding: 0}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>*/}
{/*        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
{/*            Type:*/}
{/*        </Button>*/}
{/*        <Menu*/}
{/*            id="simple-menu"*/}
{/*            anchorEl={anchorEl}*/}
{/*            keepMounted*/}
{/*            open={Boolean(anchorEl)}*/}
{/*            onClose={handleClose}*/}
{/*        >*/}
{/*            <MenuItem onClick={handleClose}>Text</MenuItem>*/}
{/*            <MenuItem onClick={handleClose}>Number</MenuItem>*/}
{/*        </Menu>*/}
{/*        <p style = {{margin: 10}}>*/}
{/*            Text*/}
{/*        </p>*/}
{/*    </Box>*/}
{/*</Grid>*/}
