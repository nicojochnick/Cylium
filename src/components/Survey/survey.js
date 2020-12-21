import React from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';



function Survey(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid style = {{padding: 20}}>
            <form className={classes.form} onSubmit={console.log('submit')} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <Slider
                            defaultValue={1}
                            getAriaValueText={''}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            valueLabelDisplay="on"

                            step={1}
                            marks
                            min={1}
                            max={10}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            rows={10}
                            multiline
                            required
                            label="positives"
                            autoComplete="email"
                            placeholder="start typing"
                            name="email" type="email"
                            onChange={console.log('submit')}
                            rowsMax={5}
                            value={''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            label="improvements"
                            autoComplete="current-password"
                            rows={10}
                            rowsMax={5}
                            multiline
                            placeholder="start typing..."
                            name="password"
                            onChange={console.log('submit')}
                            value={''}
                            type="password"
                        />
                    </Grid>
                </Grid>

                <div>
                    {''? <p>{''}</p> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </div>

            </form>
            </Grid>


        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    box: {
        padding: 0,
        margin: 0,
        marginBottom: 20,
        borderRadius: 5,
    },
    container:{
        margin: 20

    },
    formGroup: {
        alignItems: 'center'
    },

    submitButton: {
        margin: 10,
    },

    root: {
        height: '100vh',
        flexGrow:1
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: "#10102F"

    },
    input: {
        display: 'none',
    },

}));

export default Survey;
