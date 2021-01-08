import React, {useEffect} from 'react';
import {convertToRaw, Editor, EditorState, RichUtils} from "draft-js";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../../views/Old/feedbox";
import {db} from "../../api/firebase";
import {auth} from "../../api/firebase"
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";






const MAX_LENGTH = 1500;

function TyperTracker(props) {

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty(),);
    const [contentState, setContentState] = React.useState(() => null);
    const [user, setUser] = React.useState({name: null, img_url_Profile: {imgURL:null}, welcome: null})
    const [viewerEmail, setViewerEmail] = React.useState(null);
    const [viewerUser, setViewerUser] = React.useState(null);


    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setContentState(save);
        setEditorState(editorState)

    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const _handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
            console.log('you can type max ten characters');

            return 'handled';
        }
    };
    const _handlePastedText = (pastedText) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
            console.log('you can type max ten characters');

            return 'handled';
        }
    };

    const _getLengthOfSelectedText = () => {
        const currentSelection = editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed()
        let length = 0;

        if (!isCollapsed) {
            const currentContent = editorState.getCurrentContent();
            const startKey = currentSelection.getStartKey();
            const endKey = currentSelection.getEndKey();
            const startBlock = currentContent.getBlockForKey(startKey);
            const isStartAndEndBlockAreTheSame = startKey === endKey;
            const startBlockTextLength = startBlock.getLength();
            const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
            const endSelectedTextLength = currentSelection.getEndOffset();
            const keyAfterEnd = currentContent.getKeyAfter(endKey);
            console.log(currentSelection)
            if (isStartAndEndBlockAreTheSame) {
                length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
            } else {
                let currentKey = startKey;

                while (currentKey && currentKey !== keyAfterEnd) {
                    if (currentKey === startKey) {
                        length += startSelectedTextLength + 1;
                    } else if (currentKey === endKey) {
                        length += endSelectedTextLength;
                    } else {
                        length += currentContent.getBlockForKey(currentKey).getLength() + 1;
                    }

                    currentKey = currentContent.getKeyAfter(currentKey);
                };
            }
        }

        return length;
    };


    const getViewerUser = async() => {
        let user = auth().currentUser;
        if (user) {
            let email = await auth().currentUser.email;
            setViewerEmail(email);
            console.log(email);
            await db.collection("users").doc(email)
                .onSnapshot(function(doc) {
                    if (doc.data()) {
                        setViewerUser(doc.data())
                    }
                });
        }
    };

    useEffect(() => {
        getViewerUser();

    }, []);

    const classes = useStyles();

    return (
        <div>
        <div style = {{margin: 15}}>
            {/*<Grid style = {{margin: 15}} container>*/}

            <p>
                {props.question.label}
            </p>
                <Box borderRadius = {10}
                     style = {{backgroundColor: 'lightgrey', padding: 20}}>

                <Editor
                    placeholder="type here..."
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onChange={onChange}
                    handleBeforeInput={_handleBeforeInput}
                    handlePastedText={_handlePastedText}
                />
                </Box>
            {/*</Grid>*/}
        </div>
        <Divider/>
        </div>

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


export default TyperTracker;
