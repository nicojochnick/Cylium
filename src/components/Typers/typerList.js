import React from 'react';
import {db} from "../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import TyperTracker from "./typerTracker";

function TyperList(props) {
    return (
        <div>
            <TyperTracker/>
        </div>
    );
}

export default TyperList;
