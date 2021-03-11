import React from 'react';
import {Editor, EditorState,RichUtils,getDefaultKeyBinding} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles";


function Responder(props) {
    const classes = useStyles();

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty(),);
    const [contentState, setContentState] = React.useState(() => null);


    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setContentState(save);
        setEditorState(editorState)

    };


    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(command === 'send-message'){
            console.log('returned');
            return 'handled'
        }

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };


    const keyBindingFN = (e) => {
        if (e.key === 'Enter') {
            console.log('gotit')
            return 'send-message'
        }

        return getDefaultKeyBinding(e)
    };

    return (
        <Box flexDirection = 'column' display = 'flex' justifyContent='flex-end' borderRadius={20} style = {{minHeight: 50, padding: 15, margin: 20, backgroundColor: '#F3F3F3'}}>
            <Editor
                placeholder="message..."
                handleKeyCommand={handleKeyCommand}
                editorState={editorState}
                onChange={onChange}
                keyBindingFn = {keyBindingFN}
                // handleBeforeInput={_handleBeforeInput}
                // handlePastedText={_handlePastedText}
            />
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({

    root: {
        // flexGrow: 1,
        // backgroundColor: "#ECEFF3",
    },
    paper: {
        padding: theme.spacing(2),
        margin: 10,
    },
    box: {
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    formGroup: {
        alignItems: 'center'
    },

    draft:{
        overflow: "auto",
        maxHeight: 400,
        padding: 20,
        marginTop: -20,
    },

    submitButton: {
        margin: 10,
    },

    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: "#10102F"
    },


}));


export default Responder;


