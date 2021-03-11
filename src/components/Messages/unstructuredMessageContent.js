import React, {useEffect} from 'react';
import {Editor, EditorState,RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';

function UnstructuredMessageContent(props) {
    const [content, setContent] = React.useState(EditorState.createEmpty());


    useEffect(() => {
        if (props.content) {
            setContent(EditorState.createWithContent(convertFromRaw(JSON.parse(props.content))));
        }
    }, []);

    return (
        <div>
            <Editor editorState={content} readOnly={true}/>
        </div>
    );
}

export default UnstructuredMessageContent;
