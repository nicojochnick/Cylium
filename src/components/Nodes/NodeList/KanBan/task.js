import React from 'react';
import Box from "@material-ui/core/Box";
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

function Task(props) {
    return (
        <Draggable className={'nodrag'} draggableId={props.task.id} index={props.index}>
            {provided => (

                <Container className={'nodrag'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}  innerRef={provided.innerRef}
                >
                    {props.task.content}
                </Container>

            )}
        </Draggable>
    );
}

export default Task;
