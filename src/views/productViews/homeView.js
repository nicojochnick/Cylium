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
import { BiPlus } from "react-icons/bi";




function HomeView(props) {
    const classes = useStyles();
    const [channels,setChannels] = React.useState([])

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
                    <Box  display = 'flex' flexDirection = 'column' justifyContent = 'center' alignItems = 'center'>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            style = {{ }}
                            options={channels.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField {...params}  defaultValue={''} style = {{width: 300}} label="search for a project.." margin="normal" variant="outlined" />
                            )}
                        />

                    </Box>
                </Toolbar>
                <Divider/>
            </AppBar>
            <Grid className = {classes.rootGrid} spacing={0}>
                <Box className = {classes.rootGrid} display = 'flex' flexDirection = 'column' justifyContent = 'center' alignItems = 'center'>

                    <Box border ={2} borderColor = {'white'} borderRadius = {20} style = {{backgroundColor:'#8D7DFF', boxShadow: "0px 5px 10px #D7D7DA"}}>
                <IconButton>

                    <BiPlus style = {{color:'white'}} size = {100} />

                </IconButton>
                    </Box>
                <p style = {{fontWeight: 500, fontSize: 15}}> start a view </p>

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
