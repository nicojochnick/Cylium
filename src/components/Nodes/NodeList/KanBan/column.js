import React from 'react';
import Box from "@material-ui/core/Box";
import Task from "./task";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components"

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
`;


function Column(props) {
    return (
        <Container className={'nodrag'} >
            <Title> {props.column.title} </Title>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    <TaskList ref={provided.innerRef}  innerRef={provided.innerRef} {...provided.droppableProps}>
                        {props.tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>

        </Container>
    );
}

export default Column;
