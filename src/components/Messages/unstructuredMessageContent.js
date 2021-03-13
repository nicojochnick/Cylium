import React, {useEffect} from 'react';
import {Editor, EditorState,RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';

function UnstructuredMessageContent(props) {


    useEffect(() => {

    }, []);
    return (
        <div>
            <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))} readOnly={true}/>
        </div>
    );
}

export default UnstructuredMessageContent;
