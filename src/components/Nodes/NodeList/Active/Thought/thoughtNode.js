import React, {memo, useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DocumentApp from "../../NonActive/Document/documentApp";
import {Editor, EditorState, getDefaultKeyBinding} from 'draft-js';
import 'draft-js/dist/Draft.css';


export default memo(({data}) => {
    const [text, setText] = React.useState(data.text)
    const [isOpen,setIsOpen] = React.useState(data.isOpen)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

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
        }
    }

    const keyBindingFN = (e) => {
        if (e.key === 'Enter') {
            return 'send-message'

        }
        return getDefaultKeyBinding(e)
    };


    useEffect(() => {

    }, []);

    // if (isOpen){
    //     focusEditor()
    // }

    return (
        <>
            {!isOpen
                ?
        <Box borderRadius={data.style.borderRadius} style = {{backgroundColor:data.style.bgColor, padding: 10, width: 350, boxShadow:data.style.shadow}}>

        <Editor editorState={editorState} onChange={setEditorState} />

        </Box>
                : null
            }
            <Dialog
                // id={id}
                open={isOpen}
                // className = {'nodrag'}
                // fullWidth={true}
                maxWidth={'lg'}
                classes  = {{
                    // paper: classes.pop
                }}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >

                    {/*<DialogContent style = {{backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white', }}>*/}
                        <Box borderRadius={data.style.borderRadius} style = {{backgroundColor:data.style.bgColor, padding: 10, width: 350, boxShadow:data.style.shadow}}>
                            <Editor                 keyBindingFn={keyBindingFN}
                                                    handleKeyCommand={handleKeyCommand} ref={editor}  editorState={editorState} onChange={setEditorState} />
                        </Box>
                    {/*</DialogContent>*/}
            </Dialog>


        </>
    );
})



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
        // width: '80vw',
        // height: '80vh',
        // marginTop: -30,

    },
}));


