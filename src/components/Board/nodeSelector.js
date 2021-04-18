
export const selectNode = (type, id, user, color) => {
    let node = null;
    if (type == 'avatar') {
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'avatarNodes',
            data: {
                user: user
            },
            position: {x: 350, y: 350},
        }
    }

    if (type == 'graph') {
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'graphNodes',
            data: {
                color: color,
                title: null,
                graphData: [{name: '1', uv: 400, pv: 2400, amt: 2400, key: '1'},{name: '2', uv: 500, pv: 2500, amt: 2500,key: '2'},{key: '3', name: '3', uv: 900, pv: 4400, amt: 3500}]
            },
            position: {x: 350, y: 350},
        }
    }
    if (type === 'metric') {
        node = {
            id: id,
            type: 'metricNodes',
            data: {title: '', value: 0,color: color,},
            position: {x: 350, y: 350},

        }
    }


    if (type === 'report') {
        node = {
            id: id,
            type: 'reportNodes',
            data: {reports:[]},
            position: {x: 350, y: 350},

        }
    }


    if (type =='label'){
        node = {
            id:id ,
            draggable:true,
            type: 'labelNodes',
            data: { textContent: null, done:false, id: id, fontSize: 16, textColor: '#3D3B42', border: 0, backgroundColor:'white', borderColor: '#3D3B42', shadow: 8 },
            position: { x: 300, y: 300 },
            // style: { border: '0px solid #6685FF', borderRadius:7, padding: 2, display: 'flex', },
            // noWheel: true,
        }
    }

    if (type === 'button'){
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'buttonNodes',
            data: {isSquare: false, link: 'https://example.com', style: {backgroundColor: '#7664FF'}, icon: null, title: null},
            position: {x: 350, y: 350},
        }
    }

    if (type == 'character') {
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'characterNode',
            position: {x: 350, y: 350},
        }

    }

    if (type =='todo') {
        node = {
            id: id,
            connectionMode: 'loose',
            draggable: true,
            // className : "nodrag",
            type: 'todoNodes',
            data: {
                color: color,
                textContent: null,
                text: null,
                deadline: '',
                done: false,
                isFolded: false,
                id: id,
                fontSize: 16,
                textColor: '#3D3B42',
                border: 0,
                backgroundColor: 'white',
                borderColor: '#3D3B42',
                shadow: 8
            },
            position: {x: 350, y: 350},
        }
    }


    if (type =='notes'){
        node = {
            id:id ,
            draggable:true,
            // className : "nodrag",
            type: 'noteNodes',
            data: {
                text: null,
                color: color,
                textContent: null,
                isFolded: false,
                className: '',
                done:false,
                id: id,
                fontSize: 16,
                textColor: '#3D3B42',
                border: 0,
                backgroundColor:'white',
                borderColor: '#3D3B42',
                shadow: 8
            },
            position: { x: 350, y: 350 },

        }
    }
    return node;
};


//Bitcoin
// if (type == 'bitcoingif') {
//     node = {
//         id: id,
//         draggable: true,
//         // className : "nodrag",
//         type: 'bitCoinGifNodes',
//         position: {x: 350, y: 350},
//     }
//
// }


// Calendar
// if (type ==='calendar') {
//
//     node = {
//         id:id ,
//         draggable:true,
//         type: 'calendarNodes',
//         className:"nowheel",
//         // data: { text: null, onChange: onTextChange, id: id }
//         data: { style:{color:'white'}, calendarID: ''},
//         position: { x: 300, y: 300 },
//         // style: { border: '0px solid #6685FF', borderRadius:7, padding: 2, display: 'flex', },
//         // noWheel: true,
//
//     }
//
// }
