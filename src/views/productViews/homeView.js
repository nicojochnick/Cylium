import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProjectHeader from "../../components/Headers/projectHeader";
import Divider from "@material-ui/core/Divider";
import clsx from 'clsx';
import Box from "@material-ui/core/Box";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {db} from "../../api/firebase";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { BiWorld, BiPlanet, BiCircle} from "react-icons/bi";
import ovl from "../../assets/images/ovl.png"
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import {BrowserRouter as Router, HashRouter, Switch, Route, Link, Redirect,useParams} from "react-router-dom";




function HomeView(props) {
    const classes = useStyles();
    const [channels,setChannels] = React.useState([]);
    const [buttonBackGround, setButtonBackGround] = React.useState('#202020');
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [redirect,setRedirect] = React.useState(false);
    const [redirectLink, setRedirectLink] = React.useState('');


    const handleInputSelected = (val) => {
        setInputValue(val);
        let channel = null;
        for (let i =0; i < channels.length; i++){
            if (val === channels[i].name) {
                channel = channels[i]
            }
        }
        console.log(channel);
        if (channel){
            setRedirect(true);
            setRedirectLink(channel.channelID)
        }
    };


    const getChannels = () =>{
        let filtered =  channels.filter(function(item) { return item.name !== null});
        return filtered
    };

    useEffect(async () => {
        const projectRef = db.collection('channels');
        const snapshot = await projectRef.get();
        let channels = [];
        snapshot.forEach(doc => {
            channels.push(doc.data());
        });
        setChannels(channels)

    }, []);

    return (
        <div className={classes.root}>
            <AppBar
                style={{boxShadow: "0px 0px 0px #C8CEEB", marginTop:0,}}
                position="absolute"
                color = '#F7F7F7'
                className={clsx(classes.appBar, true && classes.appBarShift)}
            >
                <Toolbar style = {{boxShadow: `5px 1px 10px -5px #838383`}} noWrap className={classes.toolbar}>
                    <Box  style = {{width: '100vw'}} display = 'flex' flexDirection = 'row' justifyContent = 'flex-end' alignItems = 'center'>
                        <Autocomplete
                            id="free-solo-demo"
                            // freeSolo
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                                handleInputSelected(newInputValue)
                            }}
                            options={getChannels().map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    defaultValue={''}
                                    style = {{width: 400, }}
                                    label="search for a project.." margin="normal" variant="outlined" />
                            )}
                        />

                    </Box>
                </Toolbar>
                <Divider/>
            </AppBar>
            {redirect
                ?
                <Redirect to= {`/${redirectLink}`} />
                : null

            }
            <Grid className = {classes.rootGrid} spacing={0}>
                <Box className = {classes.rootGrid} display = 'flex' flexDirection = 'column' justifyContent = 'center' alignItems = 'center'>
                    <Box
                        border ={2}
                        borderColor = {'white'}
                        display = 'flex' flexDirection = 'column' justifyContent = 'center'
                        alignItems = 'center'
                        borderRadius = {20}
                        onMouseEnter={()=>setButtonBackGround('#000000')}
                        onMouseLeave={()=>setButtonBackGround('#202020') }
                        style = {{backgroundColor:buttonBackGround, width: 150, height: 150, boxShadow: "0px 4px 15px #D7D7DA"}}>

                        <p style = {{fontSize: 80}}> 🪴 </p>

                    </Box>
                <p style = {{fontWeight: 500, fontSize: 15, color:buttonBackGround}}> initialize a project</p>

                </Box>

            </Grid>

        </div>
    );
}
const drawerWidth = 72;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    rootGrid: {
        height: '92vh',
        width: '95vw',
        backgroundColor: '#E8E8E8'

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBarSpacer: theme.mixins.toolbar,

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#F8F8F8',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    toolbar: {
        paddingRight: 25,
        backgroundColor:'white',
    },


}));

export default HomeView;
