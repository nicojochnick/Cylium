import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BiQuestionMark, BiPlus } from "react-icons/bi"



function EditQuestionItem(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <Box flexDirection="row" borderRadius ={10} style ={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA", }} >
            <Grid container justify={'space-between'} alignItems={'center'} direction = 'row'>
                <Grid direction={'row'} item xs ={8} md={8} lg = {8}>
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
            </Grid>
        </Box>
    );
}

export default EditQuestionItem;
