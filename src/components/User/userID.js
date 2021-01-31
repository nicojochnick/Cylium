import React, {useEffect}  from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

function UserId(props) {
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [username, setUsername] = React.useState(null );



    useEffect( () => {

        console.log(props.user)

        if (props.user){
            setProfilePicture(props.user.img_url_Profile.imgUrl)
            setUsername(props.user.name)
            }

    });


    return (
        <Grid container direction={'row'}>
            <Grid item xs={1.5} md={1.5} lg={1.5}>
                <Box style={{margin: 5}} border={2} borderColor={'white'} borderRadius={50}>
                    <Avatar src={profilePicture} className={classes.large}/>
                </Box>
            </Grid>
            <p style  = {{color: 'white', fontWeight:500, fontSize: 17}}>
                {username}

            </p>
        </Grid>
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
