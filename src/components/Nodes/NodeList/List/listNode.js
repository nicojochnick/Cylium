import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./column";
import styled from 'styled-components'
import * as ReactDOM from "react-dom";
import Portal from "@material-ui/core/Portal";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {Droppable} from "react-beautiful-dnd";
import {convertFromRaw, EditorState} from "draft-js";
const Color = require('color');

const Container = styled.div ` 
    display:flex;
`;


export default function ListNode (props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [initData, setInitData] = React.useState(null);
    const [contextKey, setContextKey] = React.useState('');
    const [dragging,setDragging] =React.useState(false);
    const [border, setBorder] = React.useState(0);
    const [backgroundColor, setBackgroundColor] = React.useState(Color(props.data.style.bgColor))

    const handleClick = (event) => {
        if (!dragging) {
            setAnchorEl(event.currentTarget);
            setBorder(0)}
    };

    const handleClose = () => {
        setBorder(0);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const addColumn = () => {
        let list = initData;
        let newColumnID = `column - ` + Math.random().toString();
        let newColumn = {id: newColumnID, title: null, taskIds: []};
        list.columns[newColumnID] = newColumn;
        list.columnOrder.push(newColumnID);
        setInitData(list);
        props.data.listData = list;
        setContextKey('_'+ Math.random().toString());

    };
    const deleteColumn = (col) => {
        let list = initData;
        list.columnOrder.splice(list.columnOrder.indexOf(col.id), 1,);
        delete list.columns[col.id];
        let keys = Object.keys(list.tasks);
        for (let i = 0; i < keys.length; i++){
            if (col.taskIds.includes(keys[i])){
                delete list.tasks[keys[i]]
            }
        }
        props.data.listData = list;
        setInitData(list);
        setContextKey('_'+ Math.random().toString());
    };

    const changeColumnTitle = (title, col) => {
        let list = initData;
        list.columns[col.id].title = title;
        setTimeout(() => {
            props.data.listData = list;
            setInitData(list);
            setContextKey('_'+ Math.random().toString());
        }, 3000);
    };



    const addTask = (col) => {
        let list = initData;
        let newTaskID = `task - `+ Math.random().toString() * Math.random().toString();
        let newTask = {id: newTaskID, title: 'type something',
            content:[
                    {
                        _id: 'doc_' + Math.random().toString() * Math.random().toString() ,
                        html: " ",
                        tag: "p",
                        imageUrl: ""
                    }],
        };
        list.columns[col.id].taskIds.push(newTaskID);
        list.tasks[newTaskID] = newTask;
        props.data.listData = list;
        setInitData(list);
        setContextKey('_'+ Math.random().toString());
    };

    const deleteTask = (col, task) => {
        if (task && col) {
            let list = initData;
            let taskIndex = list.columns[col.id].taskIds.indexOf(task.id);
            list.columns[col.id].taskIds.splice(taskIndex, 1);
            delete list.tasks[task.id];
            props.data.listData = list;
            setInitData(list);
            setContextKey('_' + Math.random().toString());

        } else {
            console.log('CANT DELETE TASK: no column or task args ')
        }
    };

    function onDragEnd(result) {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(initData.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            const newState = {
                ...initData,
                columnOrder:  newColumnOrder,

            };
            props.data.listData = newState;
            setInitData(newState);
            return;
        }

        const start = initData.columns[source.droppableId];
        const finish = initData.columns[destination.droppableId];

        if (start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...initData,
                columns: {
                    ...initData.columns,
                    [newColumn.id]: newColumn,
                },
            };

            props.data.listData = newState;
            setInitData(newState);

        }
            /// moving one list to another
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            const newState = {
                ...initData,
                columns: {
                    ...initData.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish

                },
            };

            props.data.listData = newState;
            setInitData(newState);


    }
    const handleDragLeave = event => {
        event.preventDefault();
        event.stopPropagation();
        setBorder(0)
    };
    const handleDragOver = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handleDragEnter = event => {
        event.preventDefault()
        event.stopPropagation();
        setBorder(1);
        console.log('draggedover')
    };

    useEffect(() => {
        if (props.data.listData) {
            setInitData(props.data.listData)
        }
    }, []);
    return (
        <>
        {initData
            ?
                <Box border = {border} onMouseLeave={handleDragLeave} onMouseEnter = {handleDragEnter} style={{ transform:'none', padding: 10, right: 0, }}>
                    <div  onClick={handleClick}  style={{ padding: 0, transform:'none',right: 0, }}>
                        <Container>
                            <DragDropContext
                                // onDragStart
                                // onDragUpdate
                                onDragEnd={onDragEnd}
                                key = {contextKey}
                            >
                                <Droppable
                                    droppableId="all-columns"
                                    direction="horizontal"
                                    type="column"
                                >
                                    { provided => (
                                        <Container
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <Box  display = 'flex' style = {{  height: props.data.size[1]-20, width: props.data.size[0]-20,translate: 'none'}}>
                                                {initData.columnOrder.map((columnID,index) => {
                                                    const column = initData.columns[columnID];
                                                    const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
                                                    return <Column data = {props.data} index = {index} deleteColumn = {deleteColumn} changeColumnTitle = {changeColumnTitle}  deleteTask = {deleteTask} addTask = {addTask}  column = {column} key = {columnID} tasks = {tasks} />

                                                })
                                                }
                                            </Box>
                                        </Container>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Container>
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
                        <Container style = {{backgroundColor:props.data.style.bgColor }}>
                            <DragDropContext
                                // onDragStart
                                // onDragUpdate
                                onDragEnd={onDragEnd}
                                key = {contextKey}
                            >
                                <Droppable  droppableId="all-columns" direction = 'horizontal' type = 'column'>
                                    { provided => (
                                        <Container
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <Box  display = 'flex' style = {{  height: props.data.size[1]-20, width: props.data.size[0]-20,translate: 'none'}}>
                                                {initData.columnOrder.map((columnID,index) => {
                                                    const column = initData.columns[columnID];
                                                    const tasks = column.taskIds.map(taskId => initData.tasks[taskId]);
                                                    return <Column data = {props.data} index = {index} deleteColumn = {deleteColumn} changeColumnTitle = {changeColumnTitle}  deleteTask = {deleteTask} addTask = {addTask}  column = {column} key = {columnID} tasks = {tasks} />

                                                })
                                                }
                                            </Box>
                                        </Container>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <div style={{height: 30, margin: 10, color: backgroundColor.isDark() ? 'white' : 'black'}}>
                                <Button onClick={addColumn} variant={'outlined'}> <p style = {{color: backgroundColor.isDark()? 'white' : 'black' }}> Add a List </p> </Button>
                            </div>
                        </Container>
                    </Popover>
                </Box>

                :null

        }

        </>

    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
        borderRadius: 10,
        // width: '80vw',
        // height: '80vh',
        // marginTop: -30,

    },
}));


