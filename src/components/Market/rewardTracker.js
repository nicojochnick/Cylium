import React from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Box from "@material-ui/core/Box";
import Card from 'react-bootstrap/Card'
import teamwork from '../../assets/images/teamwork.svg'
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FeedbackTracker from "../Analytics/feedbackTracker";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import {db} from "../../api/firebase";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Alert from "@material-ui/lab/Alert/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

function RewardTracker(props) {
    const [isTransacting, setIsTransacting] = React.useState(false);
    const [error, setError] = React.useState(null)
    const [isCash, setIsCash] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);
    const [add, setAdd] = React.useState(0);
    const [withdraw, setWithdraw] = React.useState(0);
    const [successAdd, setSuccessAdd] = React.useState(false);
    const [successWithdraw, setSuccessWithDraw] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(true);



    const classes = useStyles();


    const handleAddBalance = async(email, amount,event) => {
        event.preventDefault();
        try {
            const res = await db.collection('store_transactions').add({
                amount: amount,
                email: email,
                type: "add_points",
                timeCreated: Date.now()
            });
            db.collection('store_transactions').doc(res.id).update({
                id: res.id
            });


            setSuccessAdd(true);
            setIsTransacting(false)
            console.log('Added document with ID: ', res.id);

        } catch (error) {
            console.log(error);
            setError({error: error.message});
        }
    };

    const handleCashoutBalance = async(amount, email, event) => {
        event.preventDefault();
        try {
            const res = await db.collection('store_transactions').add({
                amount: amount,
                email: email,
                type: "cash_points",
                timeCreated: Date.now()
            });
            db.collection('store_transactions').doc(res.id).update({
                id: res.id
            });
            setIsTransacting(false)

            setSuccessWithDraw(true);
            console.log('Added document with ID: ', res.id);

        } catch (error) {
            console.log(error);
            setError({error: error.message});
        }
    };

    const add_or_cash = (type) => {
        setIsTransacting(true);
        if (type ==='add'){
            setIsCash(false);
            setIsAdd(true)
        } else if (type ==='cash'){
            setIsAdd(false);
            setIsCash(true);

        }
    };

    const handleCancel = () => {
        setIsTransacting(false)
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
            <Box  style = {{boxShadow: "0px 5px 10px #D7D7DA",}} className={classes.box}>
                <h2
                    style ={{
                        margin: 15,
                        color:"#9FA5B1",
                        fontSize: 15,
                        fontWeight: 600
                    }}>
                    POINTS
                </h2>
                <Divider style ={{marginTop:20, marginBottom: -20}}/>
                <div style = {{padding: 20,paddingTop:0,margin:0 }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <div>
                            <h2 style = {{color:'#191B44', fontSize: 40, textAlign:"center"}}> {props.points}</h2>
                            <p style = {{color: '#191B44', marginTop: -30, textAlign:"center"}}> Available </p>
                        </div>
                    </Grid>
                    <Divider style = {{margin:10}}/>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center">

                        <Button
                            onClick = {()=>add_or_cash('add')}
                        variant="contained"
                        style={{
                            borderRadius: 8,
                            margin: 3,
                            padding: 3,
                            backgroundColor: '#4D6DF1',
                        }}>
                        <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                            Add
                        </p>
                    </Button>
                        <Button
                            variant="contained"
                            onClick = {()=>add_or_cash('cash')}
                            style={{
                                borderRadius: 8,
                                padding: 3,
                                margin: 3,
                                backgroundColor: '#191B44',
                            }}>
                            <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                                Cash out
                            </p>
                        </Button>
                    </Grid>
                    {(isTransacting)
                        ?
                        <div>

                            {(isAdd)
                                ?
                                <Grid container alignItems = "center" justify = "center">
                                    <p style={{textAlign: "center",fontWeight: 300, fontSize: 16}}> 10 points = $1.00</p>
                                    <TextField
                                        placeholder=""
                                        rows={1}
                                        onChange={e => setAdd(e.target.value)}
                                        label="Add points"
                                        variant="outlined"
                                        rowsMax={1}
                                    />

                                    <Button
                                        onClick = {(event)=>handleAddBalance(props.email, add, event)}
                                        fullWidth
                                        style={{
                                            borderRadius: 8,
                                            margin: 20,
                                            padding: 3,
                                            backgroundColor: '#4D6DF1',
                                        }}>
                                        <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                                            Get Points
                                        </p>
                                    </Button>
                                    <Button
                                        onClick = {()=>handleCancel()}
                                        fullWidth
                                        style={{
                                            borderRadius: 8,
                                            margin: 20,
                                            marginTop: -10,
                                            padding: 3,
                                            backgroundColor: '#191B44',
                                        }}>
                                        <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                                            Cancel
                                        </p>
                                    </Button>


                                </Grid>
                                : null

                            }


                            {(isCash)
                                ?
                                <Grid container alignItems = "center" justify = "center">
                                    <p style={{textAlign: "center",fontWeight: 300, fontSize: 16}}> 10 points = $1.00</p>
                                    <TextField
                                        placeholder=""
                                        rows={1}
                                        onChange={e => setWithdraw(e.target.value)}
                                        label="Cash out points"
                                        variant="outlined"
                                        rowsMax={1}
                                    />

                                    <Button
                                        fullWidth
                                        onClick = {(event)=>handleCashoutBalance(props.email, withdraw, event)}

                                        style={{
                                            borderRadius: 8,
                                            margin: 20,
                                            padding: 3,
                                            backgroundColor: '#4D6DF1',
                                        }}>
                                        <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                                            Get Cash
                                        </p>
                                    </Button>
                                    <Button
                                        onClick = {()=>handleCancel()}
                                        fullWidth
                                        style={{
                                            borderRadius: 8,
                                            margin: 20,
                                            marginTop: -10,
                                            padding: 3,
                                            backgroundColor: '#191B44',
                                        }}>
                                        <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                                            Cancel
                                        </p>
                                    </Button>


                                </Grid>
                                :null
                            }
                        </div>
                        :
                        <div>
                            {(successAdd || successWithdraw)

                                ? <div style={{margin: 10}}>

                                    <Collapse in={openConfirm}>
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpenConfirm(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit"/>
                                                </IconButton>
                                            }
                                        >
                                            Your request will be completed in the next 24 hours. You will receive an
                                            email confirmation.
                                        </Alert>
                                    </Collapse>

                                </div>
                                : null
                            }

                        </div>

                    }

                </div>
            </Box>


    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        flexGrow: 1,
        borderRadius: 10,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white'
    },

    rewardsImage: {
        height: 120,
        margin: 0,
        padding: 0,
        marginLeft: -10,

    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

    paper: {
        justify: 'center',
        padding: theme.spacing(2),
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    fixedHeight: {
        height: 350,
    },
}));

export default RewardTracker;
