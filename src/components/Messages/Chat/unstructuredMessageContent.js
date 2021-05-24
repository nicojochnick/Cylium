import React, {useEffect} from 'react';
import {Editor, EditorState,RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';

export default function UnstructuredMessageContent(props) {


    useEffect(() => {

    }, []);
    return (

        <div style = {{color:'white'}}>

            <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))} readOnly={true}/>

        </div>

    );
}

