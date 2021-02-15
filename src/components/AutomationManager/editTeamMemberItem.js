import React, {useEffect} from 'react';
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
import Divider from "@material-ui/core/Divider";



function EditTeamMemberItem(props) {
    const classes = useStyles();
    const [pending, setPending] = React.useState('false');
    const [shadow, setShadow] = React.useState("0px 5px 10px #D7D7DA");
    const [margin, setMargin] = React.useState(10);
    const [padding, setPadding] = React.useState(5);
    useEffect( () => {
        if (props.flat){
            setShadow(null)
            setMargin(0);
            setPadding(0)
        }

    }, []);

    return (
        <Box flexDirection="row" borderRadius ={10} style ={{padding: padding, margin: margin, boxShadow: shadow, minWidth: 250}} >
            <ListItem key={props.value} button>
                <UserId setPending = {setPending} user = {props.user} goDark = {true} />
                <ListItemSecondaryAction>
                    {props.withSelect
                    ? < Checkbox
                        edge="end"
                        onChange={props.handleToggle(props.value, props.user)}
                        checked={props.user.checked}
                        inputProps={false}
                        />
                        : null
                    }
                    {props.user.pending
                        ?
                        <div>
                            <Box borderColor = {'#50E079'} borderRadius = {20} border = {1.5}>
                                <p style = {{color: '#50E079', size: 15, fontWeight: 400, margin: 7}}> Friend Request Pending </p>
                            </Box>
                            {props.user && props.user.receiver
                               ?
                                   <div>
                                        <Button
                                        style={{margin: 10}}
                                        variant="contained"
                                        color='primary'
                                        className={classes.button}
                                    >
                                        Accept Friend Request
                                    </Button>
                                    </div>
                                    : null
                            }
                               </div>
                        : null

                    }
                </ListItemSecondaryAction>
            </ListItem>
            {(props.flat)
                ? <Divider/>
                : null

            }
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
