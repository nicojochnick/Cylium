import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";



export default memo(({ data,}) => {
    const classes = useStyles();


    return (
        <Box >
       <Box className={'nodrag'} display = 'flex' style = {{  margin: 10, zIndex: 30, }}>



       </Box>
        </Box>
    );
})


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },

    draggedCard: {
        marginLeft: -400,

    },

    cont1 : {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },

    cont2 : {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        paddingRight: 20,
    },
    box:{
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    fixedHeight: {
        height: 350,
    },
    popover: {
    },


}));


