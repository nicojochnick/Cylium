import React, {useCallback, useEffect} from 'react';
import ReactFlow, {addEdge, Background, Controls, ReactFlowProvider, removeElements, updateEdge, useZoomPanHelper,
 } from 'react-flow-renderer';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import PuffLoader from "react-spinners/PuffLoader";
import FlowController from "./Controllers/flowController"
import LabelNode from "../Nodes/NodeList/labelNode";
import TodoNode from "../Nodes/NodeList/todoNode";
import {saveFlow, saveViewPort} from "../../api/firestore";
import FeedController from "./Controllers/feedController";
import BitCoinGifNode from "../Nodes/ScrapNodeList/bitCoinGifNode"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import NoteNode from "../Nodes/NodeList/noteNode";
import WebPageNode from "../Nodes/ScrapNodeList/webPageNode";
import CharacterNode from "../Nodes/ScrapNodeList/characterNode";
import AvatarNode from "../Nodes/NodeList/avatarNode"
import ButtonNode from "../Nodes/NodeList/buttonNode"
import CalendarNode from "../Nodes/ScrapNodeList/calendarNode"
import {selectNode} from "./nodeSelector";
import GraphNode from "../Nodes/NodeList/graphNode"
import ReportNode from "../Nodes/ScrapNodeList/investorReportNode"
import MetricNode from "../Nodes/NodeList/metricNode";

let timerID = null;

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
    graphNodes: GraphNode,
    characterNode: CharacterNode,
    bitCoinGifNodes: BitCoinGifNode,
    metricNodes: MetricNode,
    reportNodes: ReportNode,
};

const getNodeId = () => `node_${+new Date()}`;

function BaseChart(props) {
    const [elements,setElements] = React.useState([]);
    const [id, setID] = React.useState(500);
    const [rfInstance, setRfInstance] = React.useState(null);
    const [saving, setSaving] = React.useState(false);
    const [buttonStyle, setButtonStyle] = React.useState({borderColor: '#545359'});
    const [open, setOpen] = React.useState(false);
    const [elementsToRemove, setElementsToRemove] = React.useState(null);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const { transform } = useZoomPanHelper();

    const onSave = () => {
        if (rfInstance || elements.length > 0) {
            const flow = rfInstance.toObject();
            saveFlow(props.channel.channelID, flow);
            let position = flow.position;
            let zoom = flow.zoom;
            let updatedProjectIDs = props.user.projectIDs;
            updatedProjectIDs[props.channel.channelID].viewPort = position;
             updatedProjectIDs[props.channel.channelID].zoom = zoom;
            console.log(updatedProjectIDs)
            saveViewPort(updatedProjectIDs, props.user.email)
        }
    };

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
        let id = getNodeId();
        let node = selectNode(type,id,props.user,props.channel.color);
        let nID = id + 1;
        setID(nID);
        console.log(nID);
        currentElements.push(node);
        setElements(currentElements);
        triggerAutoSave()
    };

    //TODO SET NEW ELEMENTS
    const onTextChange = (text, id,) => {
        console.log('triggered elements', elements, rfInstance, onSave, '');
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
        console.log(elementsToRemove);
        setElementsToRemove(elementsToRemove);
        handleClickOpen()
    };

    const confirmElementsRemove = ()=>{
        handleClose();
        setElements((els) => removeElements(elementsToRemove, els));
        setElementsToRemove(null);
        triggerAutoSave();
    };

    const onEdgeUpdate = (oldEdge, newConnection) => {
        setElements((els) => updateEdge(oldEdge, newConnection, els));
        triggerAutoSave()
    };

    const onNodeDragStop = () => {
        triggerAutoSave()
    };

    const onElementClick = () => {
        console.log('clicked')
    };

    const onNodeDoubleClick = (event, node) => {
        console.log('node double click', node);
        let e = elements.slice();
        for (let i = 0; i < e.length;i++){
            if (node.id === e[i].id){
                console.log(e[i]);
                e[i].data.className = 'nodrag'
            }
        }
        setElements(e)
    };

    const onNodeMouseLeave = (event, node) => {

        let e = elements.slice();
        for (let i = 0; i < e.length;i++){
            if (node.id === e[i].id){
                console.log(e[i]);
                if (e[i].data.className === 'nodrag') {
                    e[i].data.className = '';
                    triggerAutoSave()}
            }
        }
        setElements(e)

    };


    const onConnect = (params) =>  {
        params.animated = true;
        setElements((els) =>
            addEdge(params, els)
        );
    };


    const triggerAutoSave = async () => {
        console.log("started saving...");
        setSaving(true);
        if (timerID) {
            clearTimeout(timerID);
            timerID = null;
        }

        timerID = setTimeout(() => {
            onSave();
            setSaving(false);
            console.log("finished saving")
        }, 5000)
    };

    const onLoad = (reactFlowInstance) => {
        setRfInstance(reactFlowInstance)
        console.log(reactFlowInstance.toObject())
    };

    const getPosition = () => {

    };

    useEffect(() => {
       if(props.channel && props.channel.flow!== ''){
            let f = JSON.parse(props.channel.flow);
            console.log('ELEMENTS:', f.elements,);
           let dbElements = f.elements;

            for (let node of dbElements){

                if (node.data) {
                    node.data.color = props.channel.color
                }

            }
            console.log(dbElements);
           setElements(dbElements)

        }
    }, [props.channel.color]);



    return (

        <ReactFlowProvider>
        <Box style = {{zIndex: 0, height: '93vh',marginLeft: 20}} border={1} borderColor = {'#9B9B9B'}>
            <Box style = {{marginRight: 40}} display = 'flex' flexDirection = 'row' justifyContent = 'flex-end' alignItems='center'>
                <Box
                    border={1}
                    borderColor = {props.channel.color}
                    borderRadius = {100}
                    style = {{ height: 60, zIndex: 10, marginTop: 65, width: 60, marginBottom: -40, position:'absolute',  backgroundColor:'white', boxShadow: "0px 0px 20px #EBEFFF", }}
                >
                    <FlowController color = {props.channel.color} buttonStyle = {buttonStyle} addNode = {addNode} />
                </Box>

            </Box>
            <Box flexDirection ='row'
                 justifyContent = 'center'
                 alignItems = 'center'
                 style={{ width: '63vw', overflow: 'hidden'}} >
                <div style = {{zIndex: 0, height: '92vh',}}>
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        style = {{ overflow: 'hidden', background: '#FAFAFA'}}
                        elements={elements}
                        onLoad={onLoad}
                        defaultPosition={props.user.projectIDs[props.channel.channelID].viewPort}
                        defaultZoom={props.user.projectIDs[props.channel.channelID].zoom}
                        onNodeDragStop = {onNodeDragStop}
                        onElementsRemove={onElementsRemove}
                        onConnect={onConnect}
                        onEdgeUpdate={onEdgeUpdate}
                        connectionMode={'loose'}
                        onElementClick={onElementClick}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onNodeMouseLeave = {onNodeMouseLeave}
                    >
                        <Background
                            variant = "dots"
                            color = "#968ab8"
                            // style = {{backgroundColor:'black'}}
                            // gap={18}
                            // size={1}
                        />

                        <Box display ='flex' flexDirection ='row' container justifyContent = 'space-between' alignItems = 'space-between'>

                            <Box style = {{marginRight: 130, marginLeft: 20, zIndex: 10, marginTop: 10,}}>
                                { saving
                                    ?
                                    <Box display ='flex' alignItems = 'center'  justifyContent = 'center' flexDirection = {'row'}>
                                        <p> Saving </p>
                                        <PuffLoader color={'black'} loading={true} size={25} />
                                    </Box>
                                    :
                                     <Box display ='flex' alignItems = 'center'  justifyContent = 'center' flexDirection = {'row'}>
                                         {/*<p> Saved </p>*/}
                                         {/*<BiCheck size ={15} />*/}
                                     </Box>

                                }
                            </Box>


                        </Box>
                <Controls />

                        <Dialog
                            open={open}
                            maxWidth={'xs'}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText style = {{fontSize: 14}} id="alert-dialog-description">
                                    Are you sure you want to delete this edge or node?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={confirmElementsRemove} color="primary" autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
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


{/*<Box*/}
{/*    border={1}*/}
{/*    borderColor = {buttonStyle.borderColor}*/}
{/*    borderRadius = {100}*/}
{/*    style = {{ height: 70, zIndex: 10, marginTop: 70, width: 70, margin: 20,  backgroundColor:'white', boxShadow: "0px 0px 20px #EBEFFF", }}*/}
{/*>*/}
{/*    <FeedController buttonStyle = {buttonStyle} openChat = {props.openChat}/>*/}

{/*</Box>*/}
