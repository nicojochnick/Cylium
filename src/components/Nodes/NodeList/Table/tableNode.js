import React, {memo} from 'react';

export default memo(({ data,}) => {

    const [size, setSize] = React.useState(data.size);
    const [locked, setLocked] = React.useState(data.locked);
    const  [title, setTitle] =React.useState(data.title);


    return (
        <div>




        </div>
    );
})
