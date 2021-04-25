import React, {memo, useEffect} from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {BiX} from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import Switch from "@material-ui/core/Switch/Switch";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {CirclePicker} from "react-color";
import {colors} from "../../../styles/colors";
import IconSelector from "../../Editor/iconSelector";
import Divider from "@material-ui/core/Divider";
import TitleAndOptions from "../NodeUtils/NodeHeaders/titleAndOptions";
import {Handle} from "react-flow-renderer";
import {Rnd} from "react-rnd";
//TODO: uninstall all google api crap + sheets



export default memo(({ data,  }) => {

    const [editOpen, setEditOpen] = React.useState(false);
    const [d, setD] = React.useState(null);
    const [key, setKey] = React.useState('1');
    const [updated, setUpdated] = React.useState(true);
    const [title, setTitle] = React.useState(data.title);
    const [size, setSize] = React.useState(data.size);

    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width, size[1] + delta.height]
        setSize(newSize);
        data.size = newSize;

    };

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

    const changeTitle = (title) => {
        data.title = title;
        setTitle(title)
    };



    const handleOpenOptions = (event) => {
        handleEditOpen()
    };

    useEffect(() => {
       setD(data.graphData)
    }, []);
    return (

        <div style = {{ padding: 20}}>

            <Rnd
                size={{
                    width: size[0],
                    height: size[1]+40,
                }}
                disableDragging={true}
                onResizeStop={(event, direction, elementRef, delta) => onResizeStop(delta)}
                // className={draggable ? null : 'nodrag'}
                style={{
                    borderRadius: 10,
                    boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`,
                    backgroundColor: 'white',
                    padding: 5,
                }}

            >
        <Grid container className={classes.root}>
            <Box
                display = 'flex'
                justifyContent = 'flex-start'
                flexDirection = 'row'
                >

        <Box
            display = 'flex'
            justifyContent = 'flex-start'
            flexDirection = 'column'
            border = {1}
            style = {{
                zIndex: 20,
                backgroundColor:'white',
                overflow:'hidden',
                color: 'white',
                flexGrow: 1,
                }
            }
        >

            <TitleAndOptions title = {title} changeTitle = {changeTitle} handleOpenOptions = {handleOpenOptions} />

                        <LineChart key = {key} width={data.size[0]-10} height={data.size[1]-20} data={d}>
                            <Line type="monotone" dataKey="uv"  />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>

        </Box>
            {editOpen
                ?
                <Box border = {1} display = 'flex' flexDirection ='column' borderRadius = {8} style = {{backgroundColor: 'white', padding: 5,  margin: 10, boxShadow: '0px 3px 8px #D3D3DA' }} >
                    <Box display = 'flex' flexDirection = 'row' justifyContent = 'space-around'>

                        <p > y </p>

                        <Divider style ={{margin: 5}} orientation="vertical" flexItem />

                        <p> x </p>

                    </Box>
                    <Divider/>

                    { updated ?
                       d.map( (item, index) =>

                                <div key={index}>
                                    <Box style={{width: 200,}} display='flex' flexDirection='row'>

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
                                            <BiX size={18} style={{color: 'black', margin: 8,}}/>
                                        </IconButton>

                                    </Box>
                                </div>

                        )

                        : null

                    }

                    <Button style = {{margin: 10, backgroundColor:data.color}} variant={'contained'}  onClick= {()=>addRow()}> <p style = {{color:'#E7E7E7', margin: 2}}> Add </p> </Button>
                    <Button style = {{margin: 10, backgroundColor:'#373638'}} variant={'contained'}  onClick= {()=>handleEditOpen()}> <p style = {{color:'#E7E7E7', margin: 2}}> Close </p> </Button>


                </Box>
                : null

            }
            </Box>
            <Handle
                type="source"
                id = 'k'
                position="bottom"
                style={{ zIndex: 30, backgroundColor: data.color,boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`}}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />

        </Grid>
            </Rnd>
        </div>
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
