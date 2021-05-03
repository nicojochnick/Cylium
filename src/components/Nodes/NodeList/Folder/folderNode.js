import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";

import {makeStyles} from "@material-ui/core";
import folder from "../../../../assets/images/folder.png"



export default memo(({ data,}) => {


    return (
            <div>
                <img style = {{height: 100,pointerEvents:'none' }} src = {folder}/>
            </div>

    )}
)

