
export const selectNode = (type, id, user, color, position) => {
    let node = null;

    if (type === 'thought') {
        node = {
            id: id,
            draggable: true,
            type: 'thoughtNode',
            data: {
                text: null,
                isOpen: true,
                style: {bgColor: user.theme === 'dark' ? '#363638' : 'white', borderColor: '#8E9CFD', borderRadius: 20, border: 0, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},
                title: null,
                id: id,
                type: 'thoughtNode',
            },
            position: position,
        }
    }

    if (type ==='label'){
        node = {
            id:id ,
            draggable:true,
            type: 'standardNodes',
            data: {
                style: {bgColor:'rgba(0,0,0,0.0)', border: 0, borderRadius: 0, shadow: null},
                size: [120,60],
                type: 'label',
                id: id,
            },
            position: position,
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
            data: {
                isSquare: false,
                link: 'https://example.com',
                size: [95,25],
                style: {backgroundColor: '#7664FF'},
                icon: null,
                title: null,
                color: color,

            },
            position: position,
        }
    }


    if (type === 'box'){
        // className : "nodrag",
        node = {
            id: id,
            draggable: true,
            layer: 0,
            type: 'appNodes',
            data : {
                id: id,
                type: 'box',
                title: null,
                locked: false,
                icon: null,
                cover: null,
                actives: [],
                style: {bgColor: user.theme === 'dark' ? '#363638' : 'white', borderColor: '#8E9CFD', borderRadius: 20, border: 0, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},
                size: [2000,1000]

            },
            position: position,
        }
    }

    if (type === 'folder'){
        // className : "nodrag",
        node = {
            id: id,
            draggable: true,
            type: 'folderNodes',
            data : {
                type: 'folder',
                title: null,
                locked: false,
                size: [50, 50]
            },
            position: position,
        }
    }

    if (type === 'document'){
        // className : "nodrag",
        node = {
            id: id,
            draggable: true,
            type: 'documentNodes',
            data : {
                id: id,
                type: 'document',
                title: null,
                content: [
                    {
                        _id: 'doc_' + Math.random().toString(),
                        html: " ",
                        tag: "p",
                        imageUrl: ""
                    }
                ],
                locked: false,
                user: user,
                style: {bgColor: user.theme === 'dark' ? '#363638' : 'white', borderRadius: 5, border: 1, shadow: `0px 3px 10px rgba(0, 0, 0, 0.25)`},
                size: [250,60]

            },
            position: position,
        }

    }

    if (type === 'character') {
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'characterNode',
            position: position,
        }

    }

    if (type ==='kanban') {

        node = {
            type: 'appNodes',
            id: id,
            position: position,
            data: {
                size: [600,300],
                id: id,
                type: 'list',
                user: user,
                style: {bgColor: user.theme === 'dark' ? '#363638' : 'white', borderRadius: 10, border: 3, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},
                listData: {
                    tasks: {
                        'task-1': {
                            id: 'task-1',
                            title: 'type something..',
                            content:[
                                    {
                                    _id: 'doc_' + Math.random().toString() * Math.random().toString() ,
                                    html: " ",
                                    tag: "p",
                                    imageUrl: ""
                                }
                                ],
                        },

                    },

                    columns: {
                        'column-1': {
                            id: 'column-1',
                            title: 'List',
                            taskIds: ['task-1'],
                        },
                    },
                    // Facilitate reordering of the columns
                    columnOrder: ['column-1'],
                }

            }
        }
    }

    if (type === 'table') {

        node = {
            type: 'standardNodes',
            id: id,
            position: position,
            data: {
                title: null,
                type: 'table',
                size: [1000, 600],
                tableData: {},
                style: {bgColor: '#F3EC77', borderRadius: 0, border: 0, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},

            }
        }
    }

    if (type ==='note'){
        node = {
            id:id ,
            draggable:true,
            // className : "nodrag",
            type: 'standardNodes',
            data: {
                type: 'note',
                text: null,
                size: [300,300],
                title: null,
                style: {bgColor: 'white', borderRadius: 0, border: 0, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},
            },
            position: position,

        }
    }

    if (type === 'todo') {
        node = {
            id: id,
            connectionMode: 'loose',
            draggable: true,
            // className : "nodrag",
            type: 'todoNodes',
            data: {
                size: [220,45],
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
            position: position,
        }
    }
    if (type === 'avatar') {
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'avatarNodes',
            data: {
                user: user
            },
            position: position,
        }
    }
    if (type === 'graph') {
        node = {
            id: id,
            draggable: true,
            // className : "nodrag",
            type: 'graphNodes',
            data: {
                color: color,
                size: [700,400],
                title: null,
                graphData: [{name: '1', uv: 400, pv: 2400, amt: 2400, key: '1'},{name: '2', uv: 500, pv: 2500, amt: 2500,key: '2'},{key: '3', name: '3', uv: 900, pv: 4400, amt: 3500}]
            },
            position: position,
        }
    }
    if (type === 'metric') {
        node = {
            id: id,
            type: 'metricNodes',
            data: {title: '', size: [300,100], value: 0,color: color,},
            position: position,

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


//boxes

// if (type === 'boxback'){
//     // className : "nodrag",
//     node = {
//         id: id,
//         draggable: true,
//         layer: 0,
//         type: 'boxNodes',
//         data : {
//             title: null,
//             locked: false,
//             style: {bgColor: 'white', borderRadius: 20, border: 0, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},
//             size: [2000,1000]
//
//         },
//         position: position,
//     }
//
// }
// if (type === 'boxfront'){
//     // className : "nodrag",
//     node = {
//         id: id,
//         draggable: true,
//         layer: 1,
//         type: 'boxNodes',
//         data : {
//             locked: false,
//             size: [300,300],
//             style: {bgColor: 'white', borderRadius: 20, border: 0, shadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`},
//
//
//         },
//         position: position,
//     }
//
// }


//divider


// if (type === 'divider'){
//     // className : "nodrag",
//     node = {
//         id: id,
//         draggable: true,
//         type: 'dividerNodes',
//         data : {
//             locked: false,
//             size: [5,300]
//
//         },
//         position: position,
//     }
//
// }


//
// if (type === 'report') {
//     node = {
//         id: id,
//         type: 'reportNodes',
//         data: {reports:[]},
//         position: position,
//
//     }
// }
