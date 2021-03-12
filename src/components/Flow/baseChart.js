
import React from 'react';
import ReactFlow, { Background,Controls } from 'react-flow-renderer';
import Box from "@material-ui/core/Box";
import buildingbackground from "../../assets/images/buildingbackground.png";
import Divider from "@material-ui/core/Divider";


const elements = [
    {
        id: '2',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '1',
        draggable: false,
        style: {borderRadius: 100, height: 70, width: 70},
        // you can also pass a React component as a label
        data: { label:

                    <Box display = 'flex' flexDirection = 'column'  justifyContent = 'center' alignItems = 'center'>
                        <p style = {{fontSize: 15}}>Root </p>

                    </Box>



        },
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
    { id: 'e1-3', source: '1', target: '3',animated: true },
];


function BaseChart(props) {
    return (

        <Box border={1} borderColor = {'#9B9B9B'}>

            <Box display = 'flex'flexDirection = 'row' justifyContent = 'center' alignItems='center'>
                <Box border={1} borderColor = {'#9B9B9B'}  borderRadius = {20} style = {{ height: 100,zIndex: 10, marginTop: 70, marginBottom: -50, position:'absolute', width: 400, backgroundColor:'white', boxShadow: "0px 3px 10px #ECECEC", }}
                />
            </Box>

            <Box flexDirection ='row'  justifyContent = 'center' alignItems = 'center' style={{height: '100vh', width: '60vw', overflow: 'hidden'}} >
                <div style = {{zIndex: 0, height: '100vh',}}>
                    <ReactFlow style = {{ overflow: 'hidden', background: '#F8F8F9'}} elements={elements}>
                <Background
                    variant="dots"
                    gap={18}
                    size={1}
                />
                <Controls />
            </ReactFlow>
                </div>
            </Box>
        </Box>

    );
}

export default BaseChart;


{/*<Box border = {1} display = 'flex' style = {{boxShadow: "0px 0px 10px #ECECEC",width: '10vw'}}>*/}
{/*</Box>*/}


{/*<Box display = 'flex' style = {{boxShadow: "0px 0px 10px #ECECEC",height: '10vh'}}>*/}
{/*</Box>*/}
{/*<Divider orientation={'vertical'}/>*/}
