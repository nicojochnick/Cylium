import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {convertFromRaw, RichUtils, Editor, EditorState} from "draft-js";

import {makeStyles} from "@material-ui/core/styles";
import { FiMoreVertical } from "react-icons/fi";

function TrackerResponseItem(props) {

    const [eState, setEState] = React.useState(null)

    console.log(props.response)


    useEffect(() => {
        let editorState = null;
        if (props.response.type !== 'numeric') {
            editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.response.response)));
            editorState = RichUtils.toggleInlineStyle(editorState, 'rgba(255, 0, 0, 1.0)',
            );
            setEState(editorState)
        }
    }, []);


    console.log(props.response);
    return (
        <div>
            {props.response
                ?
                <div>
                    {(props.type === 'numerical')
                        ?
                        <div>
                            <p style={{
                                color: '#8B8FA0',
                                fontWeight: 500, fontSize: 15,
                                margin: 10,
                                marginTop: 2,
                            }}
                            >
                                {props.response.label} {' '} {props.response.recurringTime}?
                            </p>

                            <p style={{
                                color: '#1C1B30',
                                fontSize: 15,
                                margin: 10,
                                marginTop: -2,
                            }}>
                                {props.response.response} </p>

                        </div>

                        :
                        <div>
                            <div>
                                <p style={{
                                    color: 'white',
                                    fontWeight: 500, fontSize: 15,
                                    margin: 10,
                                    marginTop: 2,
                                }}
                                >
                                    {props.response.label} {' '} {props.response.recurringTime}?
                                </p>


                                {(eState!== null)

                                    ?
                                    <div style = {{color:'white', margin: 10, fontSize: 15}}>
                                    <Editor customStyleMap={colorStyleMap} editorState={eState} readOnly={true}/>
                                    </div>
                                    : null
                                }
                                </div>


                        </div>


                    }
                </div>
                : null
            }
        </div>
    );
};

const colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};

export default TrackerResponseItem;
