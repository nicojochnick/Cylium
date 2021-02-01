import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Box from "@material-ui/core/Box";
import UserId from "../User/userID";
import Button from "@material-ui/core/Button";
import {fade, makeStyles} from "@material-ui/core/styles";


function EditTeamMemberItem(props) {
    const classes = useStyles();


    const [pending, setPending] = React.useState('false');


    console.log(props.user)
    return (
        <Box flexDirection="row" borderRadius ={10} style ={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA", }} >
            <ListItem key={props.value} button>
                <UserId setPending = {setPending} user = {props.user} goDark = {true} />
                <ListItemSecondaryAction>
                    {props.withSelect
                    ? < Checkbox
                        edge="end"
                        onChange={props.handleToggle(props.value)}
                        checked={props.checked.indexOf(props.value) !== -1}
                        inputProps={false}
                        />
                        : null
                    }
                    {  pending && props.user.receiver
                        ?

                        <Button
                            style={{margin: 10}}
                            variant="contained"
                            color='primary'
                            className={classes.button}
                        >
                            Accept Friend Request
                        </Button>
                        : null

                    }
                </ListItemSecondaryAction>
            </ListItem>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxWidth: 540,
        backgroundColor: 'white',
    },
}));

export default EditTeamMemberItem;
