import React, {memo} from 'react';
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DocumentApp from "../../NonActive/Document/documentApp";

export default memo(({data}) => {
    const [text, setText] = React.useState(data.text)
    const [isOpen,setIsOpen] = React.useState(data.isOpen)
    const [anchorEl, setAnchorEl] = React.useState(null);


    const classes = useStyles();

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box borderRadius={data.style.borderRadius} style = {{backgroundColor:data.style.bgColor, padding: 20, boxShadow:data.style.shadow}}>
            <p> hey world </p>
            <Dialog
                id={id}
                open={open}
                className = {'nodrag'}
                fullWidth={true}
                maxWidth={'lg'}
                classes  = {{
                    paper: classes.pop
                }}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >

                    <DialogContent style = {{backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white' }}>
                        <Box borderRadius = {20} style = {{ backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white' , height: '80vh'}}>
                            <p> hey world </p>
                        </Box>
                    </DialogContent>
            </Dialog>


        </Box>
    );
})



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
        // width: '80vw',
        // height: '80vh',
        // marginTop: -30,

    },
}));


