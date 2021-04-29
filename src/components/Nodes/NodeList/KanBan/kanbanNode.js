import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./column";
import * as ReactDOM from "react-dom";
import Portal from "@material-ui/core/Portal";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";

const dataSample = {

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [initData, setInitData] = React.useState(dataSample);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    function onDragEnd(result) {

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = initData.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...initData,
            columns: {
                ...initData.columns,
                [newColumn.id]: newColumn,
            },
        };

        setInitData(newState);



    }


    return (



        <div  className={'nodrag'} style={{ padding: 50, transform:'none',right: 0, }}>

            <div onClick={handleClick}  style={{ padding: 50, transform:'none',right: 0, }}>



                <DragDropContext
                    // onDragUpdat
                    // onClick={handleClick}
                    // onDragStart = {handleClick}
                    onDragEnd={onDragEnd}
                >

                    <Box  display = 'flex' style = {{  minHeight: 100, minWidth: 300, margin: 10,translate: 'none',backgroundColor: 'white', }}>
                        {initData.columnOrder.map(columnID => {
                            const column = initData.columns[columnID];
                            const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
                            return <Column  column = {column} key = {columnID} tasks = {tasks} />

                        })
                        }

                    </Box>
                </DragDropContext>
            </div>

            <Popover
                id={id}
                open={open}
                className = {'nodrag'}
                classes  = {{
                    paper: classes.pop
                }}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >




                <DragDropContext
                    // onDragStart
                    // onDragUpdate
                    onDragEnd={onDragEnd}
                >

               <Box  display = 'flex' style = {{  minHeight: 100, minWidth: 300, margin: 10,translate: 'none',backgroundColor: 'white', }}>
                   {initData.columnOrder.map(columnID => {
                       const column = initData.columns[columnID];
                       const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
                       return <Column  column = {column} key = {columnID} tasks = {tasks} />

                   })
                   }

               </Box>
                </DragDropContext>


            </Popover>

        </div>
    );
})


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },


    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
        // width: '80vw',
        // height: '80vh',
        // marginTop: -30,

    },



}));


