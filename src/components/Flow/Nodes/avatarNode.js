import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";

import {makeStyles} from "@material-ui/core";

export default memo(({ data,}) => {
    const classes = useStyles();
    const [shadow, setShadow ] =React.useState(8)


    return (
        <Grid item xs={0} md={0} lg={0}>
            <Box style={{margin: 5,boxShadow: `0px 1px 4px #4A4A4E`, }} border={3} borderColor={'#7664FF'} borderRadius={50}>
                <Avatar src={data.user.img_url_Profile.imgUrl} className={classes.large}/>
            </Box>
            <Handle
                type="source"
                position="bottom"
                id="a"
                style={{  zIndex: 12, borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:'#5D596B' }}
            />
        </Grid>
    );
});

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
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));
