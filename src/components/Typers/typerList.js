import React, {useEffect} from 'react';
import {db} from "../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import TyperTracker from "./typerTracker";
import TrackerResponseItem from "../Responses/trackerResponseItem";

function TyperList(props) {
    console.log(props.tracker)

    useEffect(() => {


    }, []);

    return (
        <div>
            {(props.tracker.call)
                ?
                <div>
                    {Object.keys(props.tracker.call).map((item) =>
                    <TyperTracker question={props.tracker.call[item]}/>
                    )}
                </div>
                : null
            }
        </div>
    );
}

export default TyperList;
