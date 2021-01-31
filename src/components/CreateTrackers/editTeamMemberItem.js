import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Box from "@material-ui/core/Box";
import UserId from "../User/userID";

function EditTeamMemberItem(props) {
    return (
        <Box flexDirection="row" borderRadius ={10} style ={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA", }} >
            <ListItem key={props.value} button>
                <UserId goDark = {true} />
                <ListItemSecondaryAction>
                    {props.withSelect
                    ? < Checkbox
                        edge="end"
                        onChange={props.handleToggle(props.value)}
                        checked={props.checked.indexOf(props.value) !== -1}
                        inputProps={{'aria-labelledby': props.labelId}}
                        />
                        : null
                    }
                </ListItemSecondaryAction>
            </ListItem>
        </Box>
    );
}

export default EditTeamMemberItem;
