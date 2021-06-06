import React, {memo, useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DocumentApp from "../../NonActive/Document/documentApp";
import {convertFromRaw, convertToRaw, Editor, EditorState, getDefaultKeyBinding} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Handle} from "react-flow-renderer";
import {BiDotsVertical, BiDotsVerticalRounded, BiExpand, BiText} from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";


export default memo(({data}) => {
    const [text, setText] = React.useState(data.text)
    const [isOpen,setIsOpen] = React.useState(data.isOpen);
    const [isHovering, setIsHovering] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [noDrag, setNoDrag] = React.useState(false)
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty(),)
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);



    const editor = useRef(null);
    const classes = useStyles();


    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false)
        data.isOpen = false;
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const focusEditor = () => {
        editor.current.focus()
    }
    const handleKeyCommand = (command, editorState) => {
        if (command === 'send-message') {
            console.log('return')
            handleClose()
        }
    }
    const keyBindingFN = (e) => {
        if (e.key === 'Enter') {
            return 'send-message'

        }
        return getDefaultKeyBinding(e)
    };

    const handleSetEditorState = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setEditorState(editorState)
        data.text = save;
        // data.save();
    };

    const onMouseEnter = () => {
        setIsHovering(true)

    }

    const onMouseLeave = () => {
        setNoDrag(false)
        setIsHovering(false)
    }


    const openMenu = (event) => {
        setIsMenuOpen(true)
        setAnchorElMenu(event.currentTarget);

    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setAnchorElMenu(null);
    };


    useEffect(() => {

        if (data.text) {
            let parsed = EditorState.createWithContent(convertFromRaw(JSON.parse(data.text)))
            setEditorState(parsed);
        }

    }, []);

    // if (isOpen){
    //     focusEditor()
    // }

    return (
        <>
        <Box
            onMouseEnter = {onMouseEnter}
            onMouseLeave={onMouseLeave}
            display={'flex'}
            flexDirection = 'column'
            onDoubleClick={()=>setNoDrag(true)}
            className={noDrag ? 'nodrag' : null}
            borderRadius={data.style.borderRadius}
            style = {{
                backgroundColor:data.style.bgColor,
                paddingTop: 15,
                padding: 20,
                width: 400,
                fontSize: 18,
                fontWeight:500,
                color: '#28292C',
                boxShadow: isHovering ? `0px 3px 10px rgba(0, 5, 0.9, 0.15)`:  data.style.shadow
            }}>

            <Box
                style = {{height: 58, marginTop: -10, marginBottom: -49, marginRight: -20, zIndex: 5}}

                display={'flex'}
                flexDirection='row'
                justifyContent={'flex-end'}
            >

            {isHovering
                ?

                        <IconButton style={{margin:5, }} onClick={openMenu}>
                            <BiDotsVerticalRounded size={25}  />
                        </IconButton>

                : null
            }

                </Box>


            {/*<Box*/}
            {/*    display={'flex'}*/}
            {/*    flexDirection = 'row'*/}
            {/*    style = {{color:'black'}}*/}
            {/*>*/}

                <Editor
                    onEditorStateChange={handleSetEditorState}
                    editorState={editorState}
                    onChange={handleSetEditorState}
                />

            {/*</Box>*/}




        </Box>

            {/*<Dialog*/}
            {/*    // id={id}*/}
            {/*    open={isOpen}*/}
            {/*    // className = {'nodrag'}*/}
            {/*    // fullWidth={true}*/}
            {/*    maxWidth={'lg'}*/}
            {/*    classes  = {{*/}
            {/*        // paper: classes.pop*/}
            {/*    }}*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    onClose={handleClose}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'center',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*    transformOrigin={{*/}
            {/*        vertical: 'center',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*>*/}

            {/*        /!*<DialogContent style = {{backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white', }}>*!/*/}
            {/*            <Box borderRadius={data.style.borderRadius} style = {{backgroundColor:data.style.bgColor, padding: 10, width: 350, boxShadow:data.style.shadow}}>*/}
            {/*                <Editor                 keyBindingFn={keyBindingFN}*/}
            {/*                                        handleKeyCommand={handleKeyCommand} ref={editor}  editorState={editorState} onChange={setEditorState} />*/}
            {/*            </Box>*/}
            {/*        /!*</DialogContent>*!/*/}
            {/*</Dialog>*/}

                {/*<Handle*/}
                {/*    type="source"*/}
                {/*    id='k'*/}
                {/*    position="left"*/}
                {/*    style={{zIndex: 12, boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`}}*/}
                {/*    // onConnect={(params) => console.log('handle onConnect', params)}*/}
                {/*/>*/}

                {/*<Handle*/}
                {/*type="source"*/}
                {/*id = 'j'*/}
                {/*position="right"*/}
                {/*style={{zIndex: 12, boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`}}*/}
                {/*// onConnect={(params) => console.log('handle onConnect', params)}*/}
                {/*/>*/}
        </>
    );
})



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
    },
}));


