import React, {memo, useEffect} from 'react';
import {convertFromRaw, EditorState} from "draft-js";
import {functions} from "../../api/firebase"

export default memo(({ data,}) => {


    const getIG = () => {
              console.log(functions);
        let ig = functions.httpsCallable('takeScreenshot');

        ig()
            .then((result) => {
                // Read result of the Cloud Function.
                let sanitizedMessage = result.data
                console.log(sanitizedMessage)
            });


    };

    useEffect(() => {


    }, []);



    return (
        <div style = {{margin: 10, border: 0, overflow:'hidden'}}>
            {/*<iframe src="https://giphy.com/embed/rU5AbJsldy3ndqg5LP" style = {{border: 0, height: 100, width: 100}}*/}
            {/*        className="giphy-embed" allowFullScreen></iframe>*/}



        </div>
    );
})

