import React, {useEffect}  from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BiSend, BiPlus } from "react-icons/bi";
import {sendFlowInvite} from "../../api/firestore";

function UserId(props) {
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [username, setUsername] = React.useState(null );
    const [textColor, setTextColor] = React.useState('white');
    const [background, setBackGround] = React.useState(null);
    const [pending, setPending] = React.useState('false');

    const sendChannelInviteToDB = () => {
        console.log('sending channel invite with the followng, ',props.channel.channelID, props.channel.name, props.viewingUser.email, props.user.email )
        try {
            sendFlowInvite(props.channel.channelID, props.channel.name, props.viewingUser.email, props.user.email)
        } catch {
            console.log('error sending channel invite')
        }
        if (props.didInvite){
            props.didInvite()
        }
    };

    //TODO check this for performance issues:
    useEffect( () => {
        if (props.goDark){setTextColor('black')}
        if (props.background) {setBackGround('lightgrey')}
        if (props.user && props.user.img_url_Profile){
            setProfilePicture(props.user.img_url_Profile.imgUrl);
            setUsername(props.user.name)
            }
        if (props.user.pending){
            props.setPending(true)
        }
    }, []);

    return (
        <Box borderRadius = {8} border = {1} borderColor = {'#8B8B92'}>
        <Grid container direction={'row'} justify={'space-between'}>
            <Box display = 'flex' flexDirection = 'row'>
            <Grid item xs={0} md={0} lg={0}>
                <Box style={{margin: 5}} border={2} borderColor={'white'} borderRadius={50}>
                    <Avatar src={profilePicture} className={classes.large}/>
                </Box>
            </Grid>
            <p style  = {{color: textColor, fontWeight:500, fontSize: 17}}>
                {username}
            </p>
            </Box>
            <Grid item>
                {(props.isAdding)
                    ?
                    <div>
                        <Button
                            style = {{margin: 10}}
                            variant="contained"
                            color = 'primary'
                            className={classes.button}
                            startIcon={<BiSend />}
                            onClick={() => sendChannelInviteToDB()}
                        >
                            Invite
                        </Button>
                    </div>
                    :
                    null
                }
            </Grid>
        </Grid>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        color: "white"
    },
    input: {
        color: "white"
    }
}));

export default UserId;
