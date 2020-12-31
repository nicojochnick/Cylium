import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {convertFromRaw, Editor, EditorState} from "draft-js";
import {makeStyles} from "@material-ui/core/styles";
import { FiMoreVertical } from "react-icons/fi";

function TrackerResponseItem(props) {
    return (
        <div>
            {(props.type === 'numerical')
                ?
                <div>
                    <p style={{color: '#262139', fontSize: 15, margin: 10, marginTop: 2,}}> Score:{props.intData} </p>
                </div>
                :
                <div>
                    { (props.isDynamic)
                        ?
                        <p style={{
                            color: '#5E5E66',
                            fontWeight: 500, fontSize: 15,
                            margin: 10,
                            marginTop: 2,
                        }}
                        >
                            {props.label} {' '} {props.recurringTime} </p>
                        :
                        <p style={{
                            color: '#5E5E66',
                            fontWeight: 500, fontSize: 15,
                            margin: 10,
                            marginTop: 2,
                        }}
                        >
                            {props.label} </p>
                    }
                    <p style={{color: '#262139', fontSize: 15, margin: 10, marginTop: 2,}}> {props.textData} </p>
                </div>
            }
        </div>
    );
};

export default TrackerResponseItem;
