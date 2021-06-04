import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import {Editor} from "react-draft-wysiwyg";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core";
import TitleAndOptions from "../../../../NodeUtils/NodeHeaders/titleAndOptions";
import { BiEdit,BiRctangle, BiPlus, BiLink, BiMove,BiChevronUp, BiChevronDown, BiText,BiChevronLeft,BiCheckboxChecked,BiListUl,BiUserCircle,BiMessageAltDetail} from "react-icons/bi";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
let tinycolor = require("tinycolor2");
let global_bg_c = 'white';

export default memo(({ data,}) => {
        const classes = useStyles();

        const [isFolded, setIsFolded] = React.useState(data.isFolded);
        const [reports, setReports] = React.useState(data.reports)
        const fold = () => {
            data.isFolded = !isFolded;
            setIsFolded(!isFolded);
            console.log('fold to', !isFolded)

        };

        const addReport = () => {
            let r = reports.slice();
            r.push({name: null, id: Math.random(), created: Date(), link: ''});
            setReports(r);
            data.reports = r;
        };

        const changeReportName = (id, name) => {
            let r = reports.slice();

            for (let i = 0; i < reports.length; i++){
                if (r[i].id  === id){
                    r[i].name = name;
                }
            }
            setReports(r);
            data.reports = r;

        };

        const changeReportLink = (id, link) => {
            let r = reports.slice();

            for (let i = 0; i < reports.length; i++){
                if (r[i].id  === id){
                    r[i].link = link;
                }
            }
            setReports(r);
            data.reports = r;

        };

        return (
            <>
                <Box
                    borderColor = {'#5C5C5C'}
                    borderRadius = {10}
                    style = {{ boxShadow: '0px 3px 8px #D3D3DA', backgroundColor:'white', color: 'white', minWidth: 50, marginRight: 20, marginBottom: -25, overflow:'hidden'}}
                    display = 'flex' flexDirection ='column' justifyContent = 'center' alignItems = 'center'>

                        <Box display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'center'>
                            <Box style={{marginLeft: 8, color:'black'}} display = 'flex' flexDirection ='column' justifyContent = 'flex-start' alignItems = 'flex-start'>

                            <p style = {{margin: 5, fontWeight: 500, fontSize: 20}}> Reports </p>

                        </Box>

                        <Button style = {{margin: 10}} variant={'contained'}  > Latest </Button>
                        <Button style = {{margin: 10}} onClick = {fold} variant={'contained'}>
                            {  isFolded
                                ? <p style = {{margin:0}}> All </p>
                                : <p style = {{margin:0}}> Close </p>
                            }
                        </Button>

                        <IconButton onClick = {addReport} style ={{margin:0, padding: 0}} >

                                <BiPlus style = {{margin: 5, color: 'black'}} size = {17} />

                        </IconButton>
                    </Box>
                    </Box>

                <Box display = 'flex'  flexDirection = 'column' style = {{overflow:'hidden'}}>
                {reports.map( (item, index) =>
                    <Box display = 'flex' flexDirection = 'row'>
                        <TextField
                            defaultValue = {item.name}
                        />
                        <IconButton style ={{margin:0, padding: 0}} >
                            <BiLink/>
                        </IconButton>
                    </Box>

                )

                }

                </Box>


            </>
    );
}
)


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },

    cont1: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },

    cont2: {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        paddingRight: 20,
    },
    box: {
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    fixedHeight: {
        height: 350,
    },
    popover: {},

    toolbar: {
        fontSize: 12,
        backgroundColor: global_bg_c,


    }
}));
