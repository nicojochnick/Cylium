import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect,useParams} from "react-router-dom";


function Feedbox(props) {

    let { id } = useParams();

    return (
        <div>
            HOWDY

        </div>
    );
}

export default Feedbox;
