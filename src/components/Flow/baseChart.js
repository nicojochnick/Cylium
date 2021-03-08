
import React from 'react';
import ReactFlow, { Background,Controls } from 'react-flow-renderer';
import Box from "@material-ui/core/Box";
import buildingbackground from "../../assets/images/buildingbackground.png";

const elements = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output', // output node
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3',animated: true },
];


function BaseChart(props) {
    return (
        <Box borderRadius = {10} borderColor = {'#9DA0A9'} border = {1} style={{ height: '80vh', overflow: 'hidden'}}>
            <ReactFlow style = {{overflow: 'hidden', background: '#F0F0F0'}} elements={elements}>
                <Background
                    variant="dots"
                    gap={15}
                    size={1}
                />
                <Controls />

            </ReactFlow>
        </Box>
    );
}

export default BaseChart;
