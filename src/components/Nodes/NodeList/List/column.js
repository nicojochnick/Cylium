import React from 'react';
import Box from "@material-ui/core/Box";
import Task from "./task";
import {Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components"
import Portal from "@material-ui/core/Portal";
import {BiPlus,BiDotsHorizontalRounded} from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
const Color = require('color');

const Container = styled.div
    `margin: 8px;
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: ${props => (props.data.style.bgColor)};
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px; 
  background-color: ${props => (props.data.style.bgColor)}
`;
function Column(props) {
    const [title, setTitle] = React.useState(props.column.title);
    const [backgroundColor, setBackgroundColor] = React.useState(Color(props.data.style.bgColor));
    const handleChangeTitle = (text) =>  {
        setTitle(text);
        props.changeColumnTitle(text, props.column)
    };
    return (
        <Draggable isDragDisabled = {props.disabled} index = {props.index} draggableId = {props.column.id}>
            { provided => (
                <Container  data = {props.data} {...provided.draggableProps} ref={provided.innerRef}  >
                    <Box  {...provided.dragHandleProps}  ref={provided.innerRef} display = 'flex' justifyContent = 'space-between'  style ={{padding: 5}} flexDirection = 'row' alignItems = 'center'>
                        {/*<Title> {props.column.title} </Title>*/}
                        <TextField
                            value={title}
                            onChange={(e)=> handleChangeTitle(e.target.value)}
                            placeholder="Untitled"
                            InputProps={{style: {fontSize: 18, margin: 10, fontWeight: 500, color: backgroundColor.isDark() ? 'white' : 'black'}, disableUnderline: true,}}
                        />
                        <BiDotsHorizontalRounded size = {18}  style = {{margin: 5, color: backgroundColor.isDark() ? 'white' : 'black'}} onClick = {()=>props.deleteColumn(props.column)} />
                        <BiPlus size = {18} style = {{margin: 5,color: backgroundColor.isDark() ? 'white' : 'black'}} onClick = {()=>props.addTask(props.column)} />
                    </Box>
                    <Divider style = {{backgroundColor: backgroundColor.isDark() ? 'white' : 'black', margin: 5, marginTop: -10}}/>
                    <Droppable droppableId={props.column.id}>
                        {(provided,snapshot) => (
                            <TaskList
                                data = {props.data}
                                isDraggingOver = {snapshot.isDraggingOver}
                                ref={provided.innerRef}  innerRef={provided.innerRef} {...provided.droppableProps}>
                                {props.tasks.map((task, index) => (
                                    task ? <Task backgroundColor = {backgroundColor} deleteTask = {props.deleteTask} column = {props.column} disabled = {props.disabled} key={task.id} task={task} index={index}/> : null

                                ))}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}

export default Column;
