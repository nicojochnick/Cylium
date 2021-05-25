import React from 'react';
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";

const filter = createFilterOptions();


function Channels(props) {
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);
    const [editing,setEditing] = React.useState(false)
    const classes = useStyles();
    const handleClose = () => {
        setDialogValue({
            name: '',
        });
        toggleOpen(false);
    };
    const [dialogValue, setDialogValue] = React.useState({
        name: '',
    });


    const switchChannel = (val) => {
        console.log(val)
        props.selectChannel(val)

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            name: dialogValue.name,
        });

        handleClose();
    };
    return (
        <Box borderColor={'lightgrey'} display='flex' flexDirection={'row'} justifyContent={'center'}
             alignItems={'center'}
             style={{height: '10vh', backgroundColor: props.user.theme === 'light' ? 'white' : '#363638',}}>
            <Box display = 'flex' borderRadius={5} style = {{flexGrow: 1, margin: 20}} flexDirection = 'row' border = {1} borderColor={'lightgrey'}>
            <Autocomplete
                onMouseOver={()=> setEditing(true)}
                onMouseLeave={()=>setEditing(false)}
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                name: newValue,
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            name: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                        switchChannel(newValue)
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={props.channels}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    // if (typeof option === 'string') {
                    //     return option.name;
                    // }
                    // if (option.inputValue) {
                    //     return option.inputValue;
                    // }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(option) => option.name}
                style={{display:'flex', flexGrow:1, margin: 0, backgroundColor: editing ? 'white': '#454546', borderRadius: 5, zIndex: 10, borderColor: 'lightgrey', color: props.user.theme === 'dark' ? 'white' : 'black'}}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        color={'secondary'}
                        placeholder={'search channel..'}
                     variant="outlined"/>
                )}
            />
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Add a Channel </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add a new messaging channel
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.title}
                            onChange={(event) => setDialogValue({...dialogValue, title: event.target.value})}
                            label="name"
                            type="text"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Box>
    );
}
const useStyles = makeStyles((theme) => ({
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "white !important"
    }
}));
export default Channels;