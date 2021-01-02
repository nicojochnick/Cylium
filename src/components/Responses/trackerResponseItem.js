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
                                {props.response.numberData} </p>

                        </div>

                        :
                        <div>
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
                                    {props.response.stringData} </p>

                                </div>


                        </div>


                    }
                </div>
                : null
            }
        </div>
    );
};

export default TrackerResponseItem;
