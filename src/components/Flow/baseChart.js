
import React, {useCallback, useEffect} from 'react';
import ReactFlow, { ReactFlowProvider, Background, isEdge, Controls,updateEdge, removeElements, addEdge,useZoomPanHelper,} from 'react-flow-renderer';
import Box from "@material-ui/core/Box";
import buildingbackground from "../../assets/images/buildingbackground.png";
import Divider from "@material-ui/core/Divider";
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button';
import PuffLoader from "react-spinners/PuffLoader";
import {convertToRaw, EditorState} from 'draft-js';

import {BiCheck} from "react-icons/bi"

import FlowController from "./flowController"
import LabelNode from "./Nodes/labelNode";
import TodoNode from "./Nodes/todoNode";
import {saveFlow} from "../../api/firestore";
import FeedController from "./feedController";
import Grid from "@material-ui/core/Grid";
import BitCoinGifNode from "./Nodes/bitCoinGifNode"

import NoteNode from "./Nodes/noteNode";
import WebPageNode from "./Nodes/webPageNode";
import CharacterNode from "./Nodes/characterNode";
import AvatarNode from "./Nodes/avatarNode"
import ButtonNode from "./Nodes/buttonNode"
import CalendarNode from "./Nodes/calendarNode"


const reset = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    // you can also pass a React component as a label
    { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
];

const nodeTypes = {
    webPageNodes: WebPageNode,
    labelNodes: LabelNode,
    noteNodes: NoteNode,
    todoNodes: TodoNode,
    avatarNodes: AvatarNode,
    buttonNodes: ButtonNode,
    calendarNodes: CalendarNode,
    characterNode: CharacterNode,
    bitCoinGifNodes: BitCoinGifNode,
};

const getNodeId = () => `node_${+new Date()}`;

function BaseChart(props) {

    const [elements,setElements] = React.useState([]);
    const [id, setID] = React.useState(500);
    const [rfInstance, setRfInstance] = React.useState(null);
    const [saving, setSaving] = React.useState(false);
    const [buttonStyle, setButtonStyle] = React.useState({borderColor: '#545359'});

    const { transform } = useZoomPanHelper();

    const onNodeDoubleClick = (node) => console.log('node double click', node);


    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            saveFlow(props.channel.channelID, flow);
            console.log('SAVING FLOW: ', flow)
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

        if (type == 'avatar') {

            node = {
                id: id,
                draggable: true,
                // className : "nodrag",
                type: 'avatarNodes',
                data: {
                    user: props.user
                },
                position: {x: 350, y: 350},
            }

        }

        if (type =='calendar') {

            node = {
                id:id ,
                draggable:true,
                type: 'calendarNodes',
                className:"nowheel",
                // data: { text: null, onChange: onTextChange, id: id }
                data: { style:{color:'white'}, calendarID: 'add your calendar ID here - must be in public mode'},
                position: { x: 300, y: 300 },
                // style: { border: '0px solid #6685FF', borderRadius:7, padding: 2, display: 'flex', },
                // noWheel: true,

            }

        }

        if (type =='label'){
            node = {
                id:id ,
                draggable:true,
                type: 'labelNodes',
                data: { textContent: null, done:false, id: id, fontSize: 16, textColor: '#3D3B42', border: 0, backgroundColor:'white', borderColor: '#3D3B42', shadow: 8 },
                position: { x: 300, y: 300 },
                // style: { border: '0px solid #6685FF', borderRadius:7, padding: 2, display: 'flex', },
                // noWheel: true,
            }
        }

        if (type === 'button'){
            node = {
                id: id,
                draggable: true,
                // className : "nodrag",
                type: 'buttonNodes',
                data: {isSquare: false, link: 'https://example.com', style: {backgroundColor: '#7664FF'}, icon: null, title: 'add a title'},
                position: {x: 350, y: 350},
            }



        }

        if (type == 'character') {
            node = {
                id: id,
                draggable: true,
                // className : "nodrag",
                type: 'characterNode',
                position: {x: 350, y: 350},
            }

        }

        if (type == 'bitcoingif') {
            node = {
                id: id,
                draggable: true,
                // className : "nodrag",
                type: 'bitCoinGifNodes',
                position: {x: 350, y: 350},
            }

        }


        if (type =='todo') {
            node = {
                id: id,
                draggable: true,
                // className : "nodrag",
                type: 'todoNodes',
                data: {
                    textContent: null,
                    text: null,
                    deadline: '',
                    done: false,

                    id: id,
                    fontSize: 16,
                    textColor: '#3D3B42',
                    border: 0,
                    backgroundColor: 'white',
                    borderColor: '#3D3B42',
                    shadow: 8
                },
                position: {x: 350, y: 350},
            }
        }


        if (type =='notes'){
            node = {
                id:id ,
                draggable:true,
                // className : "nodrag",
                type: 'noteNodes',
                data: {
                    text: null,
                    textContent: null,
                    done:false,
                    id: id,
                    fontSize: 16,
                    textColor: '#3D3B42',
                    border: 0,
                    backgroundColor:'white',
                    borderColor: '#3D3B42',
                    shadow: 8
                },
                position: { x: 350, y: 350 },

            }
        }

        let nID = id + 1;
        setID(nID);
        console.log(nID)

        currentElements.push(node);
        setElements(currentElements)
        triggerAutoSave()

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
        triggerAutoSave()

    };


    const onElementsRemove = (elementsToRemove) => {
        setElements((els) => removeElements(elementsToRemove, els));
        triggerAutoSave()

    };


    const onEdgeUpdate = (oldEdge, newConnection) => {
        setElements((els) => updateEdge(oldEdge, newConnection, els));
        triggerAutoSave()
    };

    const onNodeDragStop = () => {
        triggerAutoSave()
    };


    const onElementClick = () => {

        triggerAutoSave()
    };

    const onConnect = (params) =>  {
        params.animated = true;
        setElements((els) =>
            addEdge(params, els)
        );
    };

    let timerID;


    const triggerAutoSave = async () => {
        console.log("starting/restarting save");
        clearTimeout(timerID);
        setSaving(true);
        timerID = setTimeout(() => {
            // onSave();
            setSaving(false);
            console.log("finished")
        }, 5000)
    }


    useEffect(() => {
       if(props.channel && props.channel.flow!== ''){
            let f = JSON.parse(props.channel.flow);
            console.log('ELEMENTS:', f.elements,);
           let dbElements = f.elements;
            for (let node of dbElements){

                if (node.data) {
                    node.data.save = triggerAutoSave
                }

            }
            console.log(dbElements);
           setElements(dbElements)

        }
    }, []);



    return (

        <ReactFlowProvider>
        <Box border={1} borderColor = {'#9B9B9B'}>
            <Box style = {{marginRight: 40}} display = 'flex' flexDirection = 'row' justifyContent = 'flex-end' alignItems='center'>

                <Box
                    border={1}
                    borderColor = {buttonStyle.borderColor}
                    borderRadius = {100}

                    style = {{ height: 70, zIndex: 10, marginTop: 65, width: 70, marginBottom: -40, position:'absolute',  backgroundColor:'white', boxShadow: "0px 0px 20px #EBEFFF", }}
                >
                    <FlowController buttonStyle = {buttonStyle} addNode = {addNode} />
                    <Button onClick = {()=> onSave()}> SAVE </Button>


                </Box>

            </Box>
            <Box flexDirection ='row'  justifyContent = 'center' alignItems = 'center' style={{height: '100vh', width: props.viewWidth, overflow: 'hidden'}} >
                <div style = {{zIndex: 0, height: '100vh',}}>
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        style = {{ overflow: 'hidden', background: '#FAFAFA'}}
                        elements={elements}
                        onLoad={setRfInstance}
                        onNodeDragStop = {onNodeDragStop}
                        onElementsRemove={onElementsRemove}
                        onConnect={onConnect}
                        onEdgeUpdate={onEdgeUpdate}
                        // onElementClick={onElementClick}
                        onNodeDoubleClick={onNodeDoubleClick}
                    >
                        <Background
                            variant = "dots"
                            color = "#968ab8"
                            // style = {{backgroundColor:'black'}}
                            // gap={18}
                            // size={1}
                        />

                        <Box display ='flex' flexDirection ='row' container justifyContent = 'space-between' alignItems = 'space-between'>
                            <Box
                                border={1}
                                borderColor = {buttonStyle.borderColor}
                                borderRadius = {100}
                                style = {{ height: 70, zIndex: 10, marginTop: 70, width: 70, margin: 20,  backgroundColor:'white', boxShadow: "0px 0px 20px #EBEFFF", }}
                            >
                                <FeedController buttonStyle = {buttonStyle} openChat = {props.openChat}/>

                            </Box>
                            <Box style = {{marginRight: 130,zIndex: 10,   marginTop: 10,}}>
                                { saving
                                    ?
                                    <Box display ='flex' alignItems = 'center'  justifyContent = 'center' flexDirection = {'row'}>
                                        <p> Saving </p>
                                        <PuffLoader color={'black'} loading={true} size={25} />
                                    </Box>
                                    :
                                     <Box display ='flex' alignItems = 'center'  justifyContent = 'center' flexDirection = {'row'}>
                                         <p> Saved </p>
                                         <BiCheck size ={15} />
                                     </Box>

                                }
                            </Box>


                        </Box>


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
