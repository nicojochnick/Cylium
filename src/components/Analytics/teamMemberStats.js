import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const data = [{name: 'uno', uv: 400, pv: 2400, amt: 2400},{name: 'dos', uv: 500, pv: 2500, amt: 2500},{name: 'tres', uv: 900, pv: 4400, amt: 3500}];


function TeamMemberStats(props) {
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
                    <LineChart width={500} height={200} data={data}>
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

export default TeamMemberStats;
