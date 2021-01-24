import React from 'react';
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Grid from "@material-ui/core/Grid";


function TrackerLytics(props) {
    return (
        <Grid container justify='center' alignItems = 'center' direction = 'column' style = {{ height: 200}} >
            <div style = {{width: '90%', height: '90%'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={200} height={200} data={data}
                               margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid stroke = "grey" strokeDasharray="2 2" />
                        <XAxis stroke = "grey" dataKey="name" />
                        <YAxis stroke = "grey"/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#9067FF" />
                        <Line type="monotone" dataKey="uv" stroke="#63DF93" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Grid>
    );
}

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]


export default TrackerLytics;
