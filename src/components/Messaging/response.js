import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {convertFromRaw, Editor, EditorState} from "draft-js";
import {makeStyles} from "@material-ui/core/styles";
import { FiMoreVertical } from "react-icons/fi";
import Divider from '@material-ui/core/Divider';

function Response(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElReward, setAnchorElReward] = React.useState(null);
    let editorState = null;
    if (props.item.feedback) {
        editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.item.feedback)));
    }
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box className={classes.box}>
            <Grid
                container
                style={{margin: 10}}
                direction="row"
                justify="space-between"
                alignItems="flex-start">
                <Grid item direction="column" justify="flex-end">
                    {/*<Grid item>*/}
                    {/*    <IconButton onClick={handleClick} style={{marginRight: -20}} aria-label="open">*/}
                    {/*        <FiMoreVertical size={20}/>*/}
                    {/*    </IconButton>*/}
                    {/*    <Popover*/}
                    {/*        id={id}*/}
                    {/*        open={open}*/}
                    {/*        anchorEl={anchorEl}*/}
                    {/*        onClose={handleClose}*/}
                    {/*        anchorOrigin={{*/}
                    {/*            vertical: 'bottom',*/}
                    {/*            horizontal: 'center',*/}
                    {/*        }}*/}
                    {/*        transformOrigin={{*/}
                    {/*            vertical: 'top',*/}
                    {/*            horizontal: 'center',*/}
                    {/*        }}>*/}
                    {/*        <Button onClick={() => props.handleDelete(props.item.id)} variant="contained" color="primary">*/}
                    {/*            Delete*/}
                    {/*        </Button>*/}
                    {/*    </Popover>*/}
                    {/*</Grid>*/}
                </Grid>
            </Grid>
            <Grid style = {{margin: 15}} container direction = 'row' wrap="nowrap" spacing={2}>
                <Grid alignItems = 'center' justify = 'center' item>
                    <Box border={2} borderColor={"#3162F0"} borderRadius={100}>
                        <Avatar className={classes.large} alt={(props.item.anon) ? null : props.item.email} src="/static/images/avatar/1.jpg"/>
                    </Box>
                </Grid>
                <Grid className={classes.boxed_in} item>
                    <Box style={{padding: 10, minWidth: 240}} borderRadius={10} border={1}>
                       <p>
                           Answer 1
                       </p>
                    </Box>
                </Grid>
                <Grid className={classes.boxed_in} item>
                    <Box style={{padding: 10, minWidth: 240}} borderRadius={10} border={1}>
                        <p>
                            Answer 2
                        </p>
                    </Box>
                </Grid>
            </Grid>
            <Divider style = {{marginTop: 10}} />
        </Box>
    );
}

export default Response;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        // flexGrow: 1,
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        // backgroundColor:"#F9FAFC",
    },

    boxed_in:{

        borderWidth: 1,
        borderColor: 'black',

    },

    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: theme.palette.getContrastText("#3574EE"),
        backgroundColor: "#10102F",
    },
    contained: {
        marginRight: 50
    },
    hr: {
        size: 1,
        color: '#C6C9D1',
        borderColor: "#C6C9D1"
    }
}));
