import React from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Grid from "@material-ui/core/Grid";

const data = [{name: 'uno', uv: 400, pv: 2400, amt: 2400},{name: 'dos', uv: 500, pv: 2500, amt: 2500},{name: 'tres', uv: 900, pv: 4400, amt: 3500}];


function TeamOverallStats(props) {
    return (
        <div>
            <Grid style = {{padding: 10}} container justify='center' alignItems = 'center'>
                <LineChart width={340} height={200} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </Grid>

        </div>
    );
}

export default TeamOverallStats;
