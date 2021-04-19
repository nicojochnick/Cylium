import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";

import {makeStyles} from "@material-ui/core";

export default memo(({ data,}) => {
    const classes = useStyles();
    const [shadow, setShadow ] = React.useState(8);


    return (
        <Grid item xs={0} md={0} lg={0}>
            <Box className={data.className} style={{margin: -3, boxShadow: `0px 1px 3px #7F7E80`, }} border={2} borderColor={data.color} borderRadius={50}>
                <Avatar style = {{pointerEvents: 'none'}} alt=""  onClick = {()=>console.log('click')} src={data.user.img_url_Profile.imgUrl} className={classes.large}/>
            </Box>
            {/*<Handle*/}

            {/*    type="source"*/}
            {/*    id = 'j'*/}
            {/*    position="left"*/}
            {/*    style={{ zIndex: 12, backgroundColor: data.color,boxShadow: "0px 2px 4px #C5C5C5", }}*/}
            {/*    // onConnect={(params) => console.log('handle onConnect', params)}*/}
            {/*/>*/}
            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position="right"*/}
            {/*    id="z"*/}
            {/*    style={{  zIndex: 12, borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:data.color }}*/}
            {/*/>*/}

            {/*<Handle*/}
            {/*    type = 'source'*/}
            {/*    id="a"*/}
            {/*    position="top"*/}
            {/*    style={{  zIndex: 12,  borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:data.color }}*/}
            {/*/>*/}
            <Handle
                type="source"
                id = 'k'
                position="bottom"
                style={{ zIndex: 12, backgroundColor: data.color,boxShadow: "0px 2px 4px #C5C5C5" }}
                // onConnect={(params) => console.log('handle onConnect', params)}
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
