import React, {memo} from 'react';

export default memo(({ data,}) => {
    return (
        <div style = {{margin: 10, border: 0, overflow:'hidden'}}>
            <iframe src="https://giphy.com/embed/rU5AbJsldy3ndqg5LP" style = {{border: 0, height: 100, width: 100}}
                    className="giphy-embed" allowFullScreen></iframe>

        </div>
    );
})

