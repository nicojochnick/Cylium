import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";


function AutomationId(props) {

    const classes = useStyles();

    const [title, setTitle] = React.useState(props.title);
    const [isEditing, setIsEditing] = React.useState(false);

    const changeTitle = (title) => {
        setTitle(title)
        setIsEditing(true)
    };

    const confirmTitleChange = () => {
        setIsEditing(false);
        props.changeTitle(title);
    };

    return (
        <div>

            <Box display = 'flex' flexDirection = 'row'>
                <Grid item xs={1.5} md={1.5} lg={1.5}>
                </Grid>
                <TextField
                    InputProps={{ disableUnderline: true, className: classes.input}}
                    defaultValue={title}
                    onChange = {(e)=>changeTitle(e.target.value)}
                />
                {isEditing
                    ?
                    <Button
                        variant="contained"
                        color = 'white'
                        className={classes.button}
                        onClick={()=>confirmTitleChange(title)}
                    >
                        Save
                    </Button>
                    :null
                }
            </Box>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    margin: {
        margin: theme.spacing(1),
        color: "white"
    },
    input: {
        color: "white",
        fontWeight: 600,
        // backgroundColor:'white',
    }
}));

export default AutomationId;



{/*<Box style={{margin: 5}} border={2} borderColor={'white'} borderRadius={50}>*/}
{/*    <Avatar className={classes.large}>*/}

{/*        {*/}

{/*        }*/}

{/*    </Avatar>*/}
{/*</Box>*/}
