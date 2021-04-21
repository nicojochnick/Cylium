import React from 'react';
import { EditorState,RichUtils,getDefaultKeyBinding, Modifier, SelectionState} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, convertToRaw} from 'draft-js';
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles";
import {sendPublicChannelMessageFS} from "../../../api/firestore";

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

    //TODO remove async if its not necessary
    const sendMessage = async() => {
        try {
            console.log(contentState);
            await sendPublicChannelMessageFS(props.channel.channelID, props.user.email, contentState,props.room.id);
            props.scrollToBottom()
        } catch (error) {
            console.log('sending message failed ', error)
        }
    };
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        console.log(editorState,JSON.parse(contentState));
        if(command === 'send-message' && JSON.parse(contentState).blocks[0].text !== ''){
            sendMessage();
            let contentState = editorState.getCurrentContent();
            const firstBlock = contentState.getFirstBlock();
            const lastBlock = contentState.getLastBlock();
            const allSelected = new SelectionState({
                anchorKey: firstBlock.getKey(),
                anchorOffset: 0,
                focusKey: lastBlock.getKey(),
                focusOffset: lastBlock.getLength(),
                hasFocus: true,
            });
            contentState = Modifier.removeRange(contentState, allSelected, 'backward');
            editorState = EditorState.push(editorState, contentState, 'remove-range');
            editorState = EditorState.forceSelection(
                editorState,
                contentState.getSelectionAfter(),
            );
            setEditorState(editorState);
            return 'handled'
        }
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const keyBindingFN = (e) => {
        if (e.key === 'Enter') {return 'send-message'}
        return getDefaultKeyBinding(e)
    };

    return (

        <Box
            border = {1}
            display = 'flex'
            borderColor = {'#BABCBE'}
            flexDirection = 'column'
            borderRadius={10}
            style = {{minHeight: 0, padding: 15, margin: 20, backgroundColor: '#F3F3F3', width: 360, color: '#555555'}}>
                <Editor
                    placeholder="message..."
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onEditorStateChange={onChange}
                    keyBindingFn = {keyBindingFN}
                    toolbarStyle = {{border:1, backgroundColor: 'white', zIndex: 20,  borderRadius: 8, }}
                    toolbar = {{
                        options: [ 'link','list', 'emoji',],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        link: { inDropdown: true },
                    }}
                    // handleBeforeInput={_handleBeforeInput}
                    // handlePastedText={=_handlePastedText}
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
        display: 'start',
        overflow: 'auto',
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


