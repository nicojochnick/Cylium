import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

function AutomationId(props) {

    const classes = useStyles();


    return (
        <div>

            <Box display = 'flex' flexDirection = 'row'>
                <Grid item xs={1.5} md={1.5} lg={1.5}>
                    {/*<Box style={{margin: 5}} border={2} borderColor={'white'} borderRadius={50}>*/}
                    {/*    <Avatar className={classes.large}>*/}

                    {/*        {*/}




                    {/*        }*/}

                    {/*    </Avatar>*/}
                    {/*</Box>*/}
                </Grid>
                <p style  = {{color: 'white', fontWeight:500, fontSize: 17, width: 150}}>
                    {props.title}
                </p>
            </Box>

        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        color: "white"
    },
    input: {
        color: "white"
    }
}));

export default AutomationId;
