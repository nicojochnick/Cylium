import React from 'react';

function CharacterNode(props) {

    return (
        <div style = {{margin: 10, border: 0, overflow:'hidden'}}>
            <iframe src="https://giphy.com/embed/m83vdNHgKvcwcN588J" style = {{width: 200, height: 300, border: 0,}}
                    className="giphy-embed" allowFullScreen/>



        </div>
    );
}

export default CharacterNode;
