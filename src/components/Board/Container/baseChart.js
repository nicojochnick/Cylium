import React, {useCallback, useEffect, useRef} from 'react';
import ReactFlow, {addEdge, Background, Controls, MiniMap, ReactFlowProvider, removeElements, updateEdge, useStoreState, useZoomPanHelper,} from 'react-flow-renderer';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import PuffLoader from "react-spinners/PuffLoader";
import FlowController from "../Controllers/flowController"
import LabelNode from "../../Nodes/NodeList/labelNode";
import TodoNode from "../../Nodes/NodeList/todoNode";
import {saveFlow, saveViewPort} from "../../../api/firestore";
import FeedController from "../Controllers/feedController";
import BitCoinGifNode from "../../Nodes/ScrapNodeList/bitCoinGifNode"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import NoteNode from "../../Nodes/NodeList/noteNode";
import WebPageNode from "../../Nodes/ScrapNodeList/webPageNode";
import CharacterNode from "../../Nodes/ScrapNodeList/characterNode";
import AvatarNode from "../../Nodes/NodeList/avatarNode"
import ButtonNode from "../../Nodes/NodeList/buttonNode"
import DocumentNode from "../../Nodes/NodeList/Document/documentNode"
import CalendarNode from "../../Nodes/ScrapNodeList/calendarNode"
// import KanBanNode from "../Nodes/NodeList/List/kanbanNode"
import {selectNode} from "../nodeSelector";
import GraphNode from "../../Nodes/NodeList/graphNode"
import FolderNode from "../../Nodes/NodeList/Folder/folderNode"
import BoxNode from "../../Nodes/NodeList/boxNode"
import ReportNode from "../../Nodes/ScrapNodeList/investorReportNode"
import MetricNode from "../../Nodes/NodeList/metricNode";
import StandardNode from "../../Nodes/NodeContainers/standardContainer";
import AppNode from "../../Nodes/NodeContainers/appContainer";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DividerNode from "../../Nodes/NodeList/dividerNode"
import ProjectHeader from "../../Headers/projectHeader";
import clsx from 'clsx';

import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Rooms from "../../Messages/Rooms/rooms";

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
    boxNodes: BoxNode,
    folderNodes: FolderNode,
    characterNode: CharacterNode,
    bitCoinGifNodes: BitCoinGifNode,
    documentNodes: DocumentNode,
    metricNodes: MetricNode,
    reportNodes: ReportNode,
    standardNodes: StandardNode,
    appNodes: AppNode,
    dividerNodes: DividerNode,
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
    const [isChatOpen,openChat] = React.useState(false);
    const reactFlowWrapper = useRef(null);
    const [refreshKey, setRefreshKey] = React.useState(' ');
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const { transform } = useZoomPanHelper();
    const classes = useStyles();

    const onSave = () => {
        if (rfInstance || elements.length > 0) {
            const flow = rfInstance.toObject();
            saveFlow(props.channel.channelID, flow);
            let position = flow.position;
            let zoom = flow.zoom;
            let updatedProjectIDs = props.user.projectIDs;
            updatedProjectIDs[props.channel.channelID].viewPort = position;
             updatedProjectIDs[props.channel.channelID].zoom = zoom;
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

    const addNode = (type, position) => {
        let currentElements = elements.slice();
        let id = getNodeId();

        let node = selectNode(type,id,props.user,props.channel.color,position);
        let nID = id + 1;

        setID(nID);
        currentElements.push(node);
        setElements(currentElements);
        triggerAutoSave()
    };

    //TODO SET NEW ELEMENTS
    const onTextChange = (text, id,) => {
        // console.log('triggered elements', elements, rfInstance, onSave, '');
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
        // console.log(elementsToRemove);
        setElementsToRemove(elementsToRemove);
        handleClickOpen()
    };


    const confirmElementsRemoveBase = (id, )=>{
        console.log(id, elements);
        handleClose();
        setElements((els) => removeElements(elementsToRemove, els));
        setElementsToRemove(null);
        triggerAutoSave();

    };


    const confirmElementsRemove = (id, )=>{

        if (id) {
            console.log(id, elements);
            handleClose();
            let elementToRemove = null;

            for (let node of elements) {
                if (node.id && node.id === id ) {
                    elementToRemove = node;
                }
            }
            console.log(elementToRemove)

            if (elementToRemove!==null) {

                setElements((els) => removeElements([elementToRemove], els));
            }

            setElementsToRemove(null);
            triggerAutoSave();
        }  else {
            console.log('NOID')
        }
    };

    const onEdgeUpdate = (oldEdge, newConnection) => {
        setElements((els) => updateEdge(oldEdge, newConnection, els));
        triggerAutoSave()
    };

    const onNodeDragStop = (event, node) => {
        console.log(elements);
        if (node.type === 'documentNodes') {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].type === 'kanbanNodes') {
                    let r1 = {
                        left: node.position.x,
                        right: node.position.x + node.data.size[0],
                        bottom: -node.position.y,
                        top: -node.position.y + node.data.size[1]

                    };
                    let node2 = elements[i];
                    let r2 = {
                        left: node2.position.x,
                        right: node2.position.x + node2.data.size[0],
                        bottom: -node2.position.y,
                        top: -node2.position.y + node2.data.size[1]

                    };
                    if ((r1.left > r2.left &&
                        r1.right < r2.right &&
                        r1.top < r2.top &&
                        r1.bottom < r2.bottom)) {
                        console.log('intersect!')
                        addDocumentToList(node, elements[i])
                    }
                }
            }
        }
        triggerAutoSave()
    };

    const addDocumentToList = (docNode, listNode) => {
        let e = elements.slice();
        for (let i = 0; i < e.length;i++){
            if (listNode.id === e[i].id){
                console.log('FOUND', e[i]);
                let list = e[i].data.listData;
                let newTaskID = `task - `+ Math.random().toString();
                let newTask = {id: newTaskID, title:docNode.data.title,  content: docNode.data.content};
                list.columns[list.columnOrder[0]].taskIds.push(newTaskID);
                list.tasks[newTaskID] = newTask;
            }
        }
        setElements(e);
        setElementsToRemove(null);
        setRefreshKey('_'+ Math.random().toString());
        let rem = [docNode]
        setElements((els) => removeElements(rem, els));
        setElementsToRemove(null);
        triggerAutoSave();

    };

    const onElementClick = () => {
        triggerAutoSave()

    };

    const onNodeDoubleClick = (event, node) => {
        // console.log('node double click', node);
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
        }, 2500)
    };

    const onLoad = (reactFlowInstance) => {
        setRfInstance(reactFlowInstance)
    };

    const onDragOver = (event) => {
        event.preventDefault();
        console.log('drag')
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = async (event) => {
        console.log("DROPPED")
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = rfInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        let id = getNodeId();
        console.log(type);
        const newNode = await selectNode(type,id,props.user,props.channel.color,position);
        newNode.data.delete = confirmElementsRemove;
        newNode.data.user = props.user;
        if (type === 'boxfront' || type ==='box'){
            console.log('addedbox');
            let elems = elements.slice();
            if (newNode.layer === 0) {
                elems.unshift(newNode);
            } else {
                for (let i = 0; i < elems.length; i++){
                    console.log(elems);
                    if (elems[i].type !== 'boxNodes'){
                        elems.splice(i,0,newNode);
                        break;
                    }
                }
            }
            setElements(elems);
        } else  {
            setElements((es) => es.concat(newNode));
        }
    };

    const reset = () => {
        let f = JSON.parse(props.channel.flow);
        let dbElements = f.elements;
        for (let node of dbElements){
            if (node.data) {
                node.data.delete = confirmElementsRemove;
                node.data.user = props.user;
            }
        }
        setElements(dbElements)
    }

    useEffect(() => {
        console.log('RESET')
       if(props.channel && props.channel.flow!== ''){
           let f = JSON.parse(props.channel.flow);
           let dbElements = f.elements;
            for (let node of dbElements){
                if (node.data) {
                    node.data.delete = confirmElementsRemove
                    node.data.user = props.user;
                }
            }
           setElements(dbElements)
        }
    }, [props.channel]);

    return (

        <ReactFlowProvider>
        <Box style = {{zIndex: 0, height: '100vh', overflow:'hidden'}} borderColor = {'#9B9B9B'}>
            <Box style = {{height: '70vh', width: props.baseWidth, position:'absolute',}} display = 'flex' flexDirection = 'row' justifyContent = 'flex-end' alignItems='center'>
                <Box
                    display = 'flex' flexDirection ='column' justifyContent = 'center' alignItems = 'center'
                    style = {{
                        zIndex: 10,
                        marginRight: 20,
                    }}
                >
                    <FlowController user = {props.user} color = {props.channel.color} buttonStyle = {buttonStyle} addNode = {addNode} />
                </Box>
            </Box>
            <Box
                flexDirection ='row'
                justifyContent = 'center'
                alignItems = 'center'
                style={{
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden'
                }}
            >
                <AppBar
                    style={{ background: 'transparent', zIndex: 100, boxShadow: 'none' }}
                    color = '#F7F7F7'
                    // position={'static'}
                >

                    <Box
                        display = 'flex'
                        flexDirection ='row'
                        justifyContent = 'flex-start'
                        alignItems = 'center'
                    >
                    <Toolbar style = {{margin: 15}}>
                        <ProjectHeader openChat = {props.openChat} isChatOpen = {isChatOpen} handleClickOpenSettings = {props.handleClickOpenSettings} user = {props.user} channel = {props.channel} />
                    </Toolbar>

                    </Box>
                </AppBar>


                <div style = {{  width: '100vw', height: '100vh',translate: 'none', }} className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                        key={ refreshKey}
                        nodeTypes={nodeTypes}
                        minZoom={0.05}
                        panOnScroll={true}
                        maxZoom={1}
                        style = {{ overflow: 'hidden', translate: 'none', transform:'none', background: '#FAFAFA'}}
                        elements={elements}
                        onLoad={onLoad}
                        selectNodesOnDrag = {false}
                        defaultPosition={props.user.projectIDs[props.channel.channelID].viewPort}
                        defaultZoom={props.user.projectIDs[props.channel.channelID].zoom}
                        onNodeDragStop = {(e,n) => onNodeDragStop(e,n)}
                        elementsSelectable={true}
                        // onNodeDrag = {(e,n)=> {console.log(e, n)}}
                        onElementsRemove={onElementsRemove}
                        onConnect={onConnect}
                        onEdgeUpdate={onEdgeUpdate}
                        connectionMode={'loose'}
                        onlyRenderVisibleElements={false}

                        onElementClick={onElementClick}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onNodeMouseLeave = {onNodeMouseLeave}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    >

                    {/*<Controls*/}
                    {/*    style = {{backgroundColor:props.user.theme === 'light' ? 'white' : '#363638'}}*/}
                    {/*    />*/}
                        {/*<MiniMap*/}
                        {/*    nodeColor={props.channel.color}*/}
                        {/*    nodeStrokeColor={'#CDCDCD'}*/}
                        {/*    nodeStrokeWidth={3}*/}
                        {/*    nodeBorderRadius={5}*/}
                        {/*    style = {{margin: 10, marginRight: 20, border:2, borderColor: 'black', boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <Background
                            variant = "dots"
                            color = {props.user.theme  === 'light' ? "#3B3C50" : 'lightgrey'}
                            style = {{backgroundColor:props.user.theme === 'light' ? 'white' : '#242426'}}
                            gap={30}
                            // size={1}
                        />
                        <Box display ='flex' flexDirection ='row' container justifyContent = 'flex-end' alignItems = 'space-between'>
                            <Box style = {{marginRight: 150, marginLeft: 20, zIndex: 10, marginTop: 10,}}>
                                { saving
                                    ?
                                    <Box display ='flex' alignItems = 'center'  justifyContent = 'center' flexDirection = {'row'}>
                                        <p style = {{color: props.user.theme === 'dark' ? 'white ' : 'black'}}> Saving </p>
                                        <PuffLoader color={props.user.theme === 'dark' ? 'white ' : 'black'} loading={true} size={25} />
                                    </Box>
                                    :
                                     <Box display ='flex' alignItems = 'center'  justifyContent = 'center' flexDirection = {'row'}>
                                         {/*<p> Saved </p>*/}
                                         {/*<BiCheck size ={15} />*/}
                                     </Box>
                                }
                            </Box>
                        </Box>

            </ReactFlow>
                </div>
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
                        <Button onClick={confirmElementsRemoveBase} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
        </ReactFlowProvider>
    );
}

const drawerWidth = 72;


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:'white',
        display: 'flex',

    },
    rootView: {
        height: '100vh',
        flexGrow: 1,
        overflow:'hidden',
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    privateBoard: {
        height: '90vh',

    },

    container: {
        flexGrow: 1,

    },
    appBarSpacer: theme.mixins.toolbar,

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#F8F8F8',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    toolbar: {
        paddingRight: 25,
        backgroundColor:'white',
    },

    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),

    },



}));

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


// {isChatOpen
//     ?
//     <Box borderRadius = {10} style = {{marginLeft: 38, marginTop: 100, width: '28vw', minWidth: 300, zIndex: 50, position:'absolute'}}>
//         <Rooms channel={props.channel} messages={props.messages} automations={props.automations} user={props.user}/>
//     </Box>
//     : null
// }