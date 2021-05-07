import React from 'react';
import Box from "@material-ui/core/Box";
import Task from "./task";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components"
import Portal from "@material-ui/core/Portal";
import {BiPlus,BiDotsHorizontalRounded} from "react-icons/bi";
import TextField from "@material-ui/core/TextField";

const Container = styled.div
    `margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    width: 250px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow 1;
  min-height: 100px; 
  background-color: ${props => (props.isDraggingOver ? 'lightgrey':'white')}
`;




function Column(props) {

    const [title, setTitle] = React.useState(props.column.title);

    const handleChangeTitle = (text) =>  {
        setTitle(text);
        props.changeColumnTitle(text, props.column)
    };

    return (
        <Container >
            <Box display = 'flex' justifyContent = 'space-between'  style ={{padding: 5}} flexDirection = 'row' alignItems = 'center'>
            {/*<Title> {props.column.title} </Title>*/}
                <TextField
                    value={title}
                    onChange={(e)=> handleChangeTitle(e.target.value)}
                    placeholder="Untitled"
                    InputProps={{style: {fontSize: 18, margin: 10, fontWeight: 500, color:'#4B494D'}, disableUnderline: true,}}

                />

                <BiDotsHorizontalRounded size = {18}  style = {{margin: 5}} onClick = {()=>props.deleteColumn(props.column)} />
                <BiPlus size = {18} style = {{margin: 5}} onClick = {()=>props.addTask(props.column)} />
            </Box>
            <Droppable droppableId={props.column.id}>
                {(provided,snapshot) => (
                    <TaskList
                        isDraggingOver = {snapshot.isDraggingOver}
                        ref={provided.innerRef}  innerRef={provided.innerRef} {...provided.droppableProps}>
                        {props.tasks.map((task, index) => (
                            <Task deleteTask = {props.deleteTask} column = {props.column} disabled = {props.disabled} key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>


        </Container>
    );
}

export default Column;
