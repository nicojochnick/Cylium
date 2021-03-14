
import React, {useCallback, useEffect} from 'react';
import ReactFlow, { ReactFlowProvider, Background, isEdge, Controls,updateEdge, removeElements, addEdge,useZoomPanHelper,} from 'react-flow-renderer';
import Box from "@material-ui/core/Box";
import buildingbackground from "../../assets/images/buildingbackground.png";
import Divider from "@material-ui/core/Divider";
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button';

import FlowController from "./flowController";
import TextNode from "./Nodes/textNode";
import TodoNode from "./Nodes/todoNode";

import {saveFlow} from "../../api/firestore";



const nodeTypes = {
    textNodes: TextNode,
    todoNodes: TodoNode,
};

const getNodeId = () => `randomnode_${+new Date()}`;

function BaseChart(props) {

    const [elements,setElements] = React.useState(props.channel.flow.elements);
    const [id, setID] = React.useState(500);
    const [rfInstance, setRfInstance] = React.useState(null);

    const { transform } = useZoomPanHelper();


    const onSave = useCallback(() => {
        if (rfInstance) {
            console.log(rfInstance)
            const flow = rfInstance.toObject()
            console.log(props.channel);
            saveFlow(props.channel.channelID, flow);
            console.log(flow)
        }
    }, [rfInstance]);



    const onRestore = useCallback((flow) => {
        const restoreFlow = async () => {
            if (flow) {
                const [x = 0, y = 0] = flow.position;
                setElements(flow.elements || []);
                transform({ x, y, zoom: flow.zoom || 0 });
            }
        };
        restoreFlow(flow);
    }, [setElements, transform]);


    const addNode = (type) => {

        let currentElements = elements.slice();
        let node = null;
        let id = getNodeId();

        if (type =='text'){
            node = {
                id:id ,
                draggable:true,
                type: 'textNodes',
                data: { text: null, onChange: onTextChange, id: id },
                position: { x: 300, y: 300 },
                style: { border: '1px solid #6685FF', borderRadius:7, padding: 2, backgroundColor:'white', display: 'flex', },

            }
        }

        if (type =='todo'){
            console.log('selected')
            node = {
                id:id ,
                draggable:true,
                type: 'todoNodes',
                data: { text: null, done:false, id: id },
                position: { x: 350, y: 350 },
                style: { border: '1px solid #6685FF', borderRadius:7, padding: 2, backgroundColor:'white', display: 'flex', },

            }
        }

        let nID = id + 1;
        setID(nID);
        console.log(nID)

        currentElements.push(node);
        setElements(currentElements)
    };

    //TODO SET NEW ELEMENTS

    const onTextChange = (text, id,) => {
        console.log('triggered elements', elements, rfInstance, onSave, '')
        let prevElements = elements.slice();
        for (let node of prevElements ) {
            if (node.id === id) {
                node.data.text = text
            }
        }
        if (prevElements.length > 0) {
            setElements(prevElements)
        }
    };


    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onEdgeUpdate = (oldEdge, newConnection) => setElements((els) => updateEdge(oldEdge, newConnection, els));
    const fl = JSON.parse(props.channel.flow);


    const onConnect = (params) => setElements((els) => addEdge(params, els));

    useEffect(() => {
       if(props.channel){
            let f = JSON.parse(props.channel.flow);
            console.log('ELEMENTS:', f.elements,)
           let dbElements = f.elements;

            for (let node of dbElements){
                if (node.type === 'textNodes'){
                    node.data.onChange = onTextChange;
                }
            }
            console.log(dbElements);
           setElements(dbElements)

        }
    }, []);



    return (

        <ReactFlowProvider>
        <Box border={1} borderColor = {'#9B9B9B'}>
            <Box style = {{marginRight: 40}} display = 'flex'flexDirection = 'row' justifyContent = 'flex-end' alignItems='center'>
                <Box
                    border={1}
                    borderColor = {'#6989FF'}
                    borderRadius = {100}
                    style = {{ height: 70, zIndex: 10, marginTop: 70, width: 70, marginBottom: -50, position:'absolute',  backgroundColor:'white', boxShadow: "0px 0px 20px #EBEFFF", }}
                >
                     <FlowController addNode = {addNode} />
                     <Button onClick = {()=> onSave()}> SAVE </Button>

                </Box>
            </Box>
            <Box flexDirection ='row'  justifyContent = 'center' alignItems = 'center' style={{height: '100vh', width: '52vw', overflow: 'hidden'}} >
                <div style = {{zIndex: 0, height: '100vh',}}>
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        style = {{ overflow: 'hidden', background: '#FAFAFA'}}
                        elements={elements}
                        onEdgeUpdate={onEdgeUpdate}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={setRfInstance}

                    >
                    <Background
                        variant="dots"
                        color = '#7371FE'
                        gap={18}
                        size={1}
                    />
                <Controls />
            </ReactFlow>
                </div>
            </Box>

        </Box>

        </ReactFlowProvider>


    );
}

export default BaseChart;


{/*<Box border = {1} display = 'flex' style = {{boxShadow: "0px 0px 10px #ECECEC",width: '10vw'}}>*/}
{/*</Box>*/}


{/*<Box display = 'flex' style = {{boxShadow: "0px 0px 10px #ECECEC",height: '10vh'}}>*/}
{/*</Box>*/}
{/*<Divider orientation={'vertical'}/>*/}
