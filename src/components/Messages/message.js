import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import mscott from "../../assets/images/mscott.png";
import Grid from "@material-ui/core/Grid";
import StructuredMessageItem from "./old/structuredMessageItem";
import AutomationItem from "../Automation/automationItem";
import {db} from "../../api/firebase";
import Divider from "@material-ui/core/Divider";

function Message(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(null);
    const getUser = async(email) => {
        await db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                //Fixes bug where doc.data() is undefined on first signin
                let user = doc.data();
                if (user) {
                    setUser(user);
                }
            });
    };

    useEffect(() => {
        getUser(props.senderID);
    }, []);
    return (
        <div className={classes.root}>
            {user
                ? <Box
                    color = {'#A3A0B1'}
                    className={classes.box}
                    boxShadow={0}
                    style={{padding: 10, minHeight: 100,boxShadow: "0px 0px 0px #ECECEC",backgroundColor:'white' , }}
                >
                    <Grid justify='flex-start' alignItems='flex-stars' direction="row" container style={{margin: 0,}}>
                        <Grid item >
                            <Box style={{margin: 5}} border={2} borderColor={'#4D6DF1'} borderRadius={50}>
                                <Avatar src={user.img_url_Profile.imgUrl} className={classes.large}/>
                            </Box>
                        </Grid>
                        <Grid style = {{padding: 5}} justify={'flex-end'} alignItems={'flex-end'} item xs={10} md={10} lg={10}>
                            <Grid container>
                            <p style={{
                                margin: 8,
                                marginTop: 2,
                                marginLeft: 13,
                                marginBottom: 0,
                                fontSize: 16,
                                color: '#2F2C37',
                                fontWeight: 500,
                            }}>{user.name} </p>
                            <p style={{color: '#2F2C37', fontSize: 12, margin: 8, marginTop: 5, marginLeft: 5}}>Monday, May 2020 </p>
                            </Grid>

                            <Box className={classes.root} style = {{margin: 8}}>

                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                : null
            }
            <Divider/>

        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    box:{
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    fixedHeight: {
        height: 350,
    },
}));

export default Message;


{/*{(props.message.structuredMessage)*/}
{/*    ? <div> {Object.keys(props.message.messageData).map((item) => <*/}
{/*        StructuredMessageItem packageItem={props.message.messageData[item]}/>)*/}
{/*    }*/}
{/*    </div>*/}
{/*    : null*/}
{/*}*/}
