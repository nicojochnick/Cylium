import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles, fade } from '@material-ui/core/styles';

function Transactions(props) {
    return (
        <Grid justify = "center" alignItems = "center" style = {{minHeight: 400, minWidth: 400}} container>
            <Box borderColor = {'#191B44'} border = {1} borderRadius = {10} style = {{padding: 50}}>

                <Grid justify = "center" alignItems = "center" item>
                    <p style = {{fontSize: 16, color:'#191B44',}}> To add points to your balance or cash out on existing points, please email help@feedboxx.io </p>

                </Grid>




            </Box>


        </Grid>
    );
}

export default Transactions;
