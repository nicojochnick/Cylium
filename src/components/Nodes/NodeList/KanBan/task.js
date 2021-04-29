import React from 'react';
import Box from "@material-ui/core/Box";
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Portal from "@material-ui/core/Portal";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen': 'white')}
  
`;

function Task(props) {
    return (
        <Draggable isDragDisabled = {props.disabled} draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (

                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    innerRef={provided.innerRef}
                    isDragging = {snapshot.isDragging}
                >
                    {props.task.content}
                </Container>

            )}

        </Draggable>
    );
}

export default Task;
