import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./column";

const initData = {

    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1'],
};


export default memo(({ data,}) => {
    const classes = useStyles();

    function onDragEnd(result) {
      return


    }


    return (


        <div className={'nodrag'} style={{pointerEvents:'all'}}>


        <DragDropContext
            className={'nodrag'}
            // onDragStart
            // onDragUpdate
            onDragEnd={onDragEnd}
        >

       <Box  className={'nodrag'} display = 'flex' style = {{  minHeight: 100, minWidth: 300, margin: 10, zIndex: 30,backgroundColor: 'white' }}>
           {initData.columnOrder.map(columnID => {
               const column = initData.columns[columnID];
               const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
               return <Column className={'nodrag'} column = {column} key = {columnID} tasks = {tasks} />

           })
           }

       </Box>
        </DragDropContext>

        </div>
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


