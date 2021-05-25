import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import NodeStylerBar from "../NodeUtils/nodeStylerBar";
import {Rnd} from "react-rnd";
import BoxNode from "../NodeList/Board/boxNode"
import NoteNode from "../NodeList/noteNode"
import LabelNode from "../NodeList/labelNode"
import TableNode from "../NodeList/Table/tableNode"
import ListNode from "../NodeList/List/listNode"

import DocumentNode from "../NodeList/Document/documentNode"
import {getBarPosition} from "recharts/lib/util/ChartUtils";

export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);
    const [isOptionOpen, setOptions] = React.useState(false);
    const [locked, setLocked] = React.useState(data.locked);
    const [barOpen, setBarOpen] = React.useState(false);
    const [contextData,setData] = React.useState(data)
    const [barKey, setBarKey] = React.useState('');
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

    const renderNode = (type, size) => {
        switch (type) {
            case 'box':
                return <BoxNode size = {size} data = {data}/>;
            case 'note':
                return <NoteNode size = {size} data = {contextData}/>;
            case 'label':
                return <LabelNode size = {size} data = {contextData}/>;
            case 'table':
                return <TableNode size = {size} data = {contextData}/>;
            case 'list':
                return <ListNode closeModal = {closeModal} size = {size} data = {data}/>;
            default:
                return null;
        }

    };

    const closeModal = () => {
        console.log('closing modal');
        setBarOpen(false);
        setBarKey(Math.random);
    }

    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width, size[1] + delta.height]
        setSize(newSize);
        contextData.size = newSize;
        data.size = newSize;
        setData(data)
    };

    return (
        <div
            onMouseEnter = {()=> setOptions(true)}
            onMouseLeave={()=> closeAll()}
            onClick = {()=>nodeSelected()}
            style = {{ padding: 5, width: size[0]+10, height: size[1]+10,}}
            className={data.locked ? 'nodrag' : null}
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
                    width: size[0],
                    height: size[1],
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
                    border =  {barOpen ? 2: data.style.border}
                    borderRadius = {data.style.borderRadius}
                    borderColor = {barOpen ? '#268CFF': '#6E6E6E'}
                    style = {{ width: size[0], height: size[1]}}
                    display='flex'
                    flexDirection='row'
                    alignItems = 'space-between'
                    justifyContent = 'space-between'
                >
                {renderNode(data.type, size)}
                </Box>
            </Rnd>
        </div>
    );
});
