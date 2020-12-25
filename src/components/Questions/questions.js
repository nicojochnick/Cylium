import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import {makeStyles} from "@material-ui/core/styles";
import SurveyQuestion from './surveyQuestion'
import {db} from "../../api/firebase";
import Slider from '@material-ui/core/Slider';

function isEmpty(obj) {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    };
    return true;
};

function Survey(props) {
    const classes = useStyles();
    // const question_1 = 'Rate your team strength this week (1-10)';
    const [survey, setSurvey] = React.useState({});
    const [responses, setResponses] = React.useState({});

    const getSurvey = async() => {
        //TODO: refactor this with dashboard pull
        if (props.user.team) {
            let survRef = db.collection("teams").doc(props.user.team);
            let survData = await survRef.get();
            let surv = survData.data();
            console.log(surv.survey.questions);
            setSurvey(surv.survey)
        }
    };

    useEffect(() => {
        getSurvey()
    }, []);

    return (
        <div>
            <Grid style = {{padding: 20}}>
            <form className={classes.form} onSubmit={console.log('submit')} noValidate>
                {(!isEmpty(survey.questions))
                    ?<Grid container direction = 'column' style ={{padding: 10}} spacing={2}>
                        {Object.keys(survey.questions).map((item) => <SurveyQuestion question={survey.questions[item]}/>)}
                    </Grid>
                    : null
                }

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


{/*<Grid item xs={12}>*/}
{/*    <p style = {{fontSize: 17, textAlign: 'left', fontWeight: 300, marginBottom: 35, color:"#10102F"}}>*/}
{/*    </p>*/}
{/*    <Slider*/}
{/*        defaultValue={1}*/}
{/*        getAriaValueText={''}*/}
{/*        aria-labelledby="discrete-slider"*/}
{/*        valueLabelDisplay="auto"*/}
{/*        valueLabelDisplay="on"*/}
{/*        step={1}*/}
{/*        marks*/}
{/*        min={1}*/}
{/*        max={10}*/}
{/*    />*/}
{/*    <TextField*/}
{/*        variant="outlined"*/}
{/*        fullWidth*/}
{/*        rows={10}*/}
{/*        multiline*/}
{/*        required*/}
{/*        label="What's working?"*/}
{/*        placeholder="start typing"*/}
{/*        onChange={console.log('submit')}*/}
{/*        rowsMax={5}*/}
{/*        value={''}*/}
{/*    />*/}
{/*</Grid>*/}
{/*<Grid item xs={12}>*/}
{/*    <TextField*/}
{/*variant="outlined"*/}
{/*fullWidth*/}
{/*required*/}
{/*label="What could be improved?"*/}
{/*rows={10}*/}
{/*rowsMax={5}*/}
{/*multiline*/}
{/*placeholder="start typing..."*/}
{/*onChange={console.log('submit')}*/}
{/*value={''}*/}
{/*/>*/}
{/*</Grid>*/}
