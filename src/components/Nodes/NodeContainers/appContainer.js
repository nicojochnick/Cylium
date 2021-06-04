import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import NodeStylerBar from "../NodeUtils/nodeStylerBar";
import {Rnd} from "react-rnd";
import BoxNode from "../NodeList/Board/boxNode"
import NoteNode from "../NodeList/Note/noteNode"
import LabelNode from "../NodeList/Label/labelNode"
import TableNode from "../NodeList/Table/tableNode"
import ListNode from "../NodeList/List/listNode"
import {IconButton} from "@material-ui/core";
import DocumentNode from "../NodeList/Document/documentNode"
import {getBarPosition} from "recharts/lib/util/ChartUtils";
import {BiGridVertical, BiCog, BiMessage, BiTrash} from "react-icons/bi";


export default memo(({ data,sourcePosition, targetPosition}) => {
    const [size, setSize] = React.useState(data.size);
    const [isOptionOpen, setOptions] = React.useState(false);
    const [locked, setLocked] = React.useState(data.locked);
    const [barOpen, setBarOpen] = React.useState(false);
    const [appMenuOpen, setAppMenuOpen] = React.useState(false);
    const [border, setBorder] = React.useState(data.style.border);
    const [borderColor, setBorderColor] = React.useState('#69696C')
    const [contextData, setData] = React.useState(data)
    const [isActive, setIsActive] = React.useState(data);

    const [barKey, setBarKey] = React.useState('');

    // console.log(data,sourcePosition,targetPosition)

    const lock = () => {
        data.locked = !data.locked;
        setLocked(!locked)
    };
    const nodeSelected = () =>{
        openBar();
    };
    const openBar = ()=>{
        setBarOpen(true)
    };
    const closeAll = () => {
        setBarOpen(false);
        console.log(barOpen)
    };

    const closeAppMenu = ()=> {
        setAppMenuOpen(false)
    }

    const renderNode = (type, size) => {
        switch (type) {
            case 'box':
                return <BoxNode setActive = {setActive} sourcePostion = {sourcePosition} size = {size} data = {data}/>;
            case 'table':
                return <TableNode size = {size} data = {contextData}/>;
            case 'list':
                return <ListNode closeModal = {closeModal} size = {size} data = {data}/>;
            default:
                return null;
        }

    };

    const setActive = () => {
        // const { nodes } = store.getState();
        // for (let i = 0; i < nodes.length; i++){
        //
        // }

    };

    const closeModal = () => {
        console.log('closing modal')
        setBarOpen(false);
        setBarKey(Math.random)
    }
    const setTimeAppMenuOpen = () => {
        setAppMenuOpen(true)

        setTimeout(function(){
            setAppMenuOpen(false)
            }, 3000);



    }
    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width, size[1] + delta.height]
        setSize(newSize);
        contextData.size = newSize;
        data.size = newSize;
        setData(data)
    };
    const leaveBox = () => {
        setAppMenuOpen(false);
        setBarOpen(false)
    }

    useEffect(() => {
        let isActive  = false

        // if (data.actives && data.actives.length > 0){
        //     for (let i = 0; i < data.actives.length; i++){
        //         if (data.actives[i].email === data.user.email){
        //             console.log('bang')
        //             setIsActive(true)
        //             setBorder(3);
        //             setBorderColor('#8E9CFD')
        //             isActive = true ;
        //         }
        //     }
        // }
        // if (!isActive) {
        //     setBorderColor('#69696C')
        //     setIsActive(false)
        // }

    }, );


    return (
        <Box display = 'flex' onMouseEnter = {()=> setTimeAppMenuOpen(true)} onMouseLeave={()=> leaveBox()}
        >
            <Box display = 'flex' flexDirection='column' style={{marginLeft: -90,  }}>
                        <Box display = 'flex' flexDirection={'column'} style={{margin: 10, marginRight: 20,}}>
                            {appMenuOpen
                                ?
                                <>
                                    <BiGridVertical size={40} style={{color: data.user.theme === 'dark' ? 'white' : 'black'}}/>
                                    <BiCog onClick={()=>setBarOpen(!barOpen)} size={30} style={{color: data.user.theme === 'dark' ? 'white' : 'black', margin: 5}}/>
                                            {data.type === 'box'
                                                ? <BiMessage size={30} style={{
                                                    color: data.user.theme === 'dark' ? 'white' : 'black',
                                                    margin: 5
                                                }}/>

                                                : null
                                            }
                                    <BiTrash onClick={()=>data.delete(data.id)} size={30} style={{color: data.user.theme === 'dark' ? 'white' : 'black', margin: 5}}/>
                            </>
                                : null

                            }
                        </Box>



                </Box>


        <Box
            display='flex' flexDirection={'column'}
            className={'nodrag'}
        >
            <Box key = {barKey} style = {{width: size[0]}} display = 'flex' flexDirection = 'row' justifyContent = 'center'>
                {barOpen
                    ?
                    <div barOpen = {barOpen} style = {{marginTop: -90}}>
                        <NodeStylerBar locked = {data.locked} style = {data.style} />
                    </div>
                    : null
                }
            </Box>
            <Rnd
                size={{
                    width: size[0]-10, height: size[1]-10,
                }}
                onResizeStop={(event, direction, elementRef, delta) => onResizeStop(delta)}
                style={{
                    margin: 0,
                    borderRadius: data.style.borderRadius,
                    // overflow: 'hidden',
                    boxShadow: data.style.shadow,
                    backgroundColor: data.style.bgColor,
                }}
                disableDragging={true}
            >
                <Box
                    border =  {barOpen ? 2: border}
                    borderRadius = {data.style.borderRadius}
                    borderColor = {barOpen ? '#268CFF': borderColor}
                    style = {{ width: size[0]-10, height: size[1]-10}}
                    display='flex'
                    flexDirection='row'
                    alignItems = 'space-between'
                    justifyContent = 'space-between'
                >
                    {renderNode(data.type, size)}
                </Box>

            </Rnd>
        </Box>
        </Box>
    );
});
