import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {convertFromRaw, RichUtils, Editor, EditorState} from "draft-js";
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';


function StructuredMessageItem(props) {
    const [eState, setEState] = React.useState(EditorState.createEmpty());
    useEffect(() => {
        let editorState = null;
        if (props.packageItem.responseData && props.packageItem.type !== 'numeric') {
            editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.packageItem.responseData)));
            editorState = RichUtils.toggleInlineStyle(editorState, 'rgba(255, 0, 0, 1.0)',
            );
            setEState(editorState)
        }
    }, []);
    return (
        <div>
            {props.packageItem
                ?
                <div>
                        <Box style = {{margin: 5}}>
                            <p style={{
                                color: 'white',
                                fontWeight: 500,
                                fontSize: 15,
                                marginTop: 15,
                                marginBottom: 6,
                            }}
                            >
                                {props.packageItem.label} {' '} {props.packageItem.recurringTime}
                            </p>
                            <div style = {{borderRadius: 20, color: 'white'}}>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                multiline
                                rowsMax={8}
                                variant="outlined"
                                InputProps={{style: {fontSize: 23, margin: 5, marginBottom:-1, fontWeight: 600, color:props.user.theme === 'dark' ? 'white' : '#363638'}, disableUnderline: true,}}

                            />
                            </div>
                        </Box>
                </div>
                : null
            }
        </div>
    );
}

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

export default StructuredMessageItem;


{/*<p style={{*/}
{/*    color: '#2F2C37',*/}
{/*    fontSize: 15,*/}
{/*    margin: 10,*/}
{/*    marginTop: 2,*/}
{/*}}*/}
{/*>*/}
{/*    {props.packageItem.label} {' '} {props.packageItem.recurringTime}*/}
{/*</p>*/}
{/*<Box borderRadius = {20} border = {2} borderColor = {'#EAEAEA'} style = {{color:'#2F2C37', margin: 10, padding: 15, fontSize: 15}}>*/}
{/*<Editor customStyleMap={colorStyleMap} editorState={eState}/>*/}
{/*</Box>*/}
