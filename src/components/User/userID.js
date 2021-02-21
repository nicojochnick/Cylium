import React, {useEffect}  from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BiSend, BiPlus } from "react-icons/bi";
import {db} from '../../api/firebase'


function UserId(props) {
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [username, setUsername] = React.useState(null );
    const [textColor, setTextColor] = React.useState('white');
    const [background, setBackGround] = React.useState(null);
    const [pending, setPending] = React.useState('false')



    //TODO Move this functionality somewhere else, please.

    const sendFriendRequest = async() => {
        //Add both people to each other friend lists as "pending".
        let addedUserRef = await db.collection('users').doc(props.user.email);
        let addedUserGet = await addedUserRef.get();
        let addedUserData = addedUserGet.data();

        let viewingUserRef =  await db.collection('users').doc(props.viewingUser.email);
        let viewingUserGet =  await viewingUserRef.get();
        let viewingUserData = viewingUserGet.data();

        let addedList = addedUserData.friendList;
        addedList.push(
            {
                name: props.viewingUser.name,
                email: props.viewingUser.email,
                img_url_Profile: {imgUrl: props.viewingUser.img_url_Profile.imgUrl},
                pending: true,
                timeStamp: new Date(),
            }
        );

        let viewingList = viewingUserData.friendList;
        viewingList.push(
            {
                name: props.user.name,
                email: props.user.email,
                img_url_Profile: {imgUrl: props.user.img_url_Profile.imgUrl},
                pending: true,
                timeStamp: new Date(),
            }
        );
        const resAdded = await addedUserRef.update({friendList: addedList});
        const viewingAdded = await viewingUserRef.update({friendList: viewingList});
    };

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
        <Box borderRadius = {20} style = {{backgroundColor: background,}}>
        <Grid container direction={'row'} justify={'space-between'}>
            <Box display = 'flex' flexDirection = 'row'>
            <Grid item xs={1.5} md={1.5} lg={1.5}>
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
                            startIcon={<BiPlus />}
                            onClick={() => sendFriendRequest()}
                        >
                            Add to Friend List
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
