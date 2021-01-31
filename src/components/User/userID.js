import React, {useEffect}  from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BiSend, BiPlus } from "react-icons/bi";


function UserId(props) {
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [username, setUsername] = React.useState(null );
    const [textColor, setTextColor] = React.useState('white');
    const [background, setBackGround] = React.useState(null)



    useEffect( () => {

        console.log(props.user)

        if (props.goDark){
            setTextColor('black')


        }

        if (props.background) {
            setBackGround('lightgrey')
        }

        if (props.user){
            setProfilePicture(props.user.img_url_Profile.imgUrl)
            setUsername(props.user.name)
            }


    });


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
