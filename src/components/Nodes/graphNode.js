import React, {memo, useEffect} from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FiMoreVertical } from "react-icons/fi";
import Switch from "@material-ui/core/Switch/Switch";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {CirclePicker} from "react-color";
import {colors} from "../../styles/colors";
import IconSelector from "../Editor/iconSelector";
import Divider from "@material-ui/core/Divider";
//TODO: uninstall all google api crap + sheets



export default memo(({ data,  }) => {

    const [editOpen, setEditOpen] = React.useState(false);
    const [d, setD] = React.useState(null);
    const [key, setKey] = React.useState('1')
    const [updated, setUpdated] = React.useState(true)

    const classes = useStyles();

    const handleEditOpen = () => {
        setEditOpen(!editOpen)
    };

    const handleEditOpenDeley = () => {
        setEditOpen(false)
        setTimeout(() => {
            setEditOpen(true)
        }, 20);
    };

    const addRow = () => {
        let ds = d;
        ds.push({name: 'x', uv: 0, key: Math.random().toString()});
        setD(ds);
        data.graphData = ds;
        setKey(Math.random().toString())
    };


    const handleDeleteRow = (key) => {
        setUpdated(false)
        let ds = d.slice()
        for (let i = 0; i < ds.length; i++) {
            if (ds[i].key === key) {
                ds.splice(i,1)
            }
        }
        data.graphData = ds;
        setKey(Math.random().toString())
        setD(ds);
        setUpdated(true)
        handleEditOpenDeley()
    };
    const editData = (axis,y,nx,ny, key) => {
        let ds = d;

        for (let i = 0; i < ds.length; i++) {
            console.log(i)
                if (ds[i].key === key){
                    if (axis === 'y') {
                      ds[i].name = ny
                    } else {
                        ds[i].uv = nx

                    }
                }
        }
        console.log(ds)

        setD(ds);
        data.graphData = ds;
        setKey(Math.random().toString())

    };



    const handleOpenOptions = (event) => {
        handleEditOpen()
    };

    useEffect(() => {
       setD(data.graphData)
    }, []);
    return (
        <Grid container className={classes.root}>
        <Box
            justifyContent = 'flex-start'
            flexDirection = 'column'

            borderColor = {'black'}
            style = {{zIndex: 20,
                boxShadow: '0px 3px 8px #D3D3DA',
                backgroundColor:'white',
                color: 'white',
                overflow:'hidden',
                height: 300,
                margin: 10,
                flexGrow: 1,
                }
            }
        >
            <Box display="flex" justifyContent = 'flex-end' flexDirection = 'row' style = {{height: 30, backgroundColor:'grey', color: 'black'}}>
                <IconButton style ={{margin: 0, padding:0, zIndex:20}} onClick={handleOpenOptions}>
                    <FiMoreVertical  size = {18} style = {{color:'white', margin: 8,}}/>
                </IconButton>
            </Box>
        <div style = {{backgroundColor:'white', margin: 10, marginLeft: -10,}}>
            <Grid>
                <LineChart key = {key} width={450} height={250} data={d}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </Grid>
        </div>
        </Box>
            {editOpen
                ?
                <Box border = {1} display = 'flex' flexDirection ='column' borderRadius = {8} style = {{backgroundColor: 'white', padding: 5,boxShadow: '0px 3px 8px #D3D3DA' }} >
                    <Box display = 'flex' flexDirection = 'row' justifyContent = 'space-around'>

                        <p > y </p>

                        <Divider style ={{margin: 5}} orientation="vertical" flexItem />

                        <p> x </p>

                    </Box>
                    <Divider/>

                    { updated ?
                       d.map( (item, index) =>

                                <div key={index}>
                                    <Box style={{width: 200}} display='flex' flexDirection='row'>

                                        <TextField
                                            defaultValue={item.name}
                                            onChange={(e) => editData('y', item.name, item.uv, e.target.value, item.key)}

                                        />

                                        <Divider style={{margin: 5}} orientation="vertical" flexItem/>

                                        <TextField
                                            defaultValue={item.uv}
                                            onChange={(e) => editData('x', item.name, e.target.value, item.name, item.key)}


                                        />
                                        <Divider style={{margin: 5}} orientation="vertical" flexItem/>

                                        <IconButton style={{margin: 0, padding: 0, zIndex: 20}}
                                                    onClick={() => handleDeleteRow(item.key)}>
                                            <FiMoreVertical size={18} style={{color: 'black', margin: 8,}}/>
                                        </IconButton>

                                    </Box>
                                </div>

                        )

                        : null

                    }

                    <Button style = {{margin: 10}} variant={'contained'}  onClick= {()=>addRow()}> Add </Button>

                </Box>
                : null

            }
        </Grid>
    );
});


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,


    },
    box: {
        padding: 0,
        margin: 0,
        marginBottom: 20,
        borderRadius: 5,
    },
    container:{
        margin: 20

    },
    formGroup: {
        alignItems: 'center'
    },

    submitButton: {
        margin: 10,
    },

    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: "#10102F"

    },
    input: {
        display: 'none',
    },

}));



// import {google} from 'googleapis';

// const oauth2Client = new google.auth.OAuth2(
//     '269903968002-uqut7heda5r08q8aur5mcc76296fg9co.apps.googleusercontent.com',
//     '"Quu9UekVSh1KFqxIWSmPxB9N"',
//     'https://localhost:3001'
// );
//
// // generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = [
//     'https://www.googleapis.com/auth/sheets',
// ];
//
// const url = oauth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: 'offline',
//
//     // If you only need one scope you can pass it as a string
//     scope: scopes
// });
