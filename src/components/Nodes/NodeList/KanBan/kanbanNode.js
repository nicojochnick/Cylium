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


export default memo(({ data,}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [initData, setInitData] = React.useState(data.listData);
    const [contextKey, setContextKey] = React.useState('');
    const [dragging,setDragging] =React.useState(false);
    const [border, setBorder] = React.useState(0);



    const handleClick = (event) => {
        if (!dragging) {
            setAnchorEl(event.currentTarget);
            setBorder(0)

        }

    };


    const handleClose = () => {
        setBorder(0);
        setAnchorEl(null);

    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const addTask = (col) => {
        let list = initData;
        let newTaskID = `task - `+ Math.random().toString();
        let newTask = {id: newTaskID, title: 'type something',
            content:[
                    {
                        _id: 'doc_' + Math.random().toString(),
                        html: " ",
                        tag: "p",
                        imageUrl: ""
                    }],
        };
        list.columns[col.id].taskIds.push(newTaskID);
        list.tasks[newTaskID] = newTask;
        setInitData(list);
        data.listData = list;
        setContextKey('_'+ Math.random().toString());
    };


    const deleteTask = (col, task) => {
        let list = initData;
        let taskIndex = list.columns[col.id].taskIds.indexOf(task.id);
        list.columns[col.id].taskIds.splice(taskIndex, 1);
        delete list.tasks[task.id];
        data.listData = list;
        setInitData(list)
        setContextKey('_'+ Math.random().toString());
    };


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
        data.listData = newState;


    }

    const handleDragLeave = event => {
        event.preventDefault()
        console.log('')
        event.stopPropagation();
        setBorder(0)
    };
    const handleDragOver = event => {
        event.preventDefault()
        event.stopPropagation();
    };
    const handleDragEnter = event => {
        // event.preventDefault()
        // event.stopPropagation();

        setBorder(1);
        console.log('draggedover')
    };


    return (


        <Box border = {border} onMouseLeave={handleDragLeave} onMouseEnter = {handleDragEnter} style={{ transform:'none', padding: 10, right: 0, }}>

            <div  onClick={handleClick}  style={{ padding: 0, transform:'none',right: 0, }}>

                <DragDropContext
                    // onDragUpdat
                    // onClick={handleClick}
                    // onDragStart = {handleClick}
                    onDragEnd={onDragEnd}
                >

                    <Box  display = 'flex' style = {{  height: data.size[1], minWidth: data.size[0], margin: 10,translate: 'none',backgroundColor: 'white', }}>
                        {data.listData.columnOrder.map(columnID => {
                            const column = initData.columns[columnID];
                            const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
                            return <Column  column = {column} key = {columnID} tasks = {tasks} addTask = {addTask} />

                        })
                        }

                    </Box>
                </DragDropContext>
            </div>

            <Popover
                id={id}
                open={open}
                className={'nodrag'}
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
                    key = {contextKey}
                >

               <Box  display = 'flex' style = {{  minHeight: 100, minWidth: 300, margin: 10,translate: 'none',backgroundColor: 'white', }}>
                   {data.listData.columnOrder.map(columnID => {
                       const column = initData.columns[columnID];
                       const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
                       return <Column deleteTask = {deleteTask} addTask = {addTask}  column = {column} key = {columnID} tasks = {tasks} />

                   })
                   }

               </Box>
                </DragDropContext>
            </Popover>

        </Box>
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


