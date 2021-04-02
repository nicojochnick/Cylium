import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";


const data = [{name: 'uno', uv: 400, pv: 2400, amt: 2400},{name: 'dos', uv: 500, pv: 2500, amt: 2500},{name: 'tres', uv: 900, pv: 4400, amt: 3500}];


function TeamMemberStats(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid alignItems='center' justify='space-around' container style = {{paddingTop: 20}}>
            <Grid>
                <div>
                    <h2 style = {{color:'#191B44', fontSize: 40, marginTop: -20, textAlign:"center"}}> 8.3 </h2>
                    <p style = {{color: '#191B44', marginTop: -30, textAlign:"center"}}> Trailing Average </p>
                </div>

            </Grid>
                <Grid>
                    <LineChart width={400} height={200} data={data}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
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

    root: {
        height: '100vh',
        flexGrow:1
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

export default TeamMemberStats;
