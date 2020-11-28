import React from 'react';
import Radio from '@material-ui/core/Radio';
import { BsX} from "react-icons/bs";



function Topic(props) {
    return (
        <div>
            <Radio/>
            {(props.isEdit)
                ? <BsX/>
                : null

            }


        </div>
    );
}

export default Topic;
