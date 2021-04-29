import React from 'react';
import Box from "@material-ui/core/Box";
import Task from "./task";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components"
import Portal from "@material-ui/core/Portal";

const Container = styled.div`margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgrey':'white')}
`;




function Column(props) {
    return (
        <Container >
            <Title> {props.column.title} </Title>

            <Droppable droppableId={props.column.id}>
                {(provided,snapshot) => (
                    <TaskList

                        isDraggingOver = {snapshot.isDraggingOver}

                        ref={provided.innerRef}  innerRef={provided.innerRef} {...provided.droppableProps}>
                        {props.tasks.map((task, index) => (
                            <Task disabled = {props.disabled} key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>


        </Container>
    );
}

export default Column;
