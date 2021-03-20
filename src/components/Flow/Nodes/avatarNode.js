import React from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

function AvatarNode(props) {
    return (
        <Grid item xs={0} md={0} lg={0}>
            <Box style={{margin: 5}} border={2} borderColor={'white'} borderRadius={50}>
                <Avatar src={''} className={classes.large}/>
            </Box>
        </Grid>
    );
}

export default AvatarNode;
