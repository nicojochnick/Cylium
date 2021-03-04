import React from 'react';
import PackageItem from "./packageItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {fade, makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {BiStar, BiLink, BiSend,BiPoll, BiPlus,BiSliderAlt,BiCheckSquare, BiChat, BiImport, BiBell, BiMessageSquareDetail,BiMessageSquareDots,BiMessageSquareError,BiMessageSquareCheck } from "react-icons/bi";
import nextId from "react-id-generator";
import {db} from "../../../../api/firebase";
import firebase from "firebase/app";
import Divider from "@material-ui/core/Divider";



function PackageManger(props) {
    const classes = useStyles();


    const addPackageItem = async(type) => {
        let id =  nextId();
        let newCall = {
            packageItemID: id,
            actionType: type,
            label: null,
            order: id,
            type: 'text',
            responseData: null,
            structuredMessage: true,
            timeStamp: new Date(),
        };
        const trackRef = await db.collection('trackers').doc(props.tracker.id);
        const addCall = await trackRef.update({
            call: firebase.firestore.FieldValue.arrayUnion(newCall)
        })
    };

    return (
        <Grid xs={12} md={12} lg={12} container className={classes.root} justifyContent= {'space-around'} alignItems={'space-around'} display = 'flex' flexDirection = 'row'>
            <Grid item xs={4} md={4} lg={4}>
            <Box borderRadius = {20} style = {{backgroundColor: 'white',overflow:'hidden', margin: 10, height: 350, boxShadow: "0px 3px 10px #D7D7DA"}} display = 'flex' flexDirection = 'column'>
                <p style = {{margin: 10, textAlign: 'center', fontSize: 14,fontWeight: 500, color: '#76777D'}} > ACTIONS </p>
                <Divider/>
                <Button
                    style = {{margin: 10}}
                    variant="outlined"
                    color = 'secondary'
                    className={classes.button}
                    startIcon={<BiChat/>}
                    onClick={()=>addPackageItem('ask')}
                >
                   Ask
                </Button>

                <Button
                    style = {{margin: 10}}
                    variant="outlined"
                    color = 'secondary'
                    className={classes.button}
                    startIcon={<BiCheckSquare/>}
                    onClick={()=>addPackageItem('track')}
                >
                     Track
                </Button>

                <Button
                    style = {{margin: 10}}
                    variant="outlined"
                    color = 'secondary'
                    className={classes.button}
                    startIcon={<BiStar/>}
                    onClick={()=>addPackageItem('rate')}
                >
                    Rate
                </Button>


                <Button
                    style = {{margin: 10}}
                    variant="outlined"
                    color = 'secondary'
                    className={classes.button}
                    startIcon={<BiBell/>}
                    onClick={()=>addPackageItem('remind')}
                >
                    Remind
                </Button>

                <Button
                    style = {{margin: 10}}
                    variant="outlined"
                    color = 'secondary'
                    className={classes.button}
                    startIcon={<BiLink/>}
                    onClick={()=>addPackageItem('share')}
                >
                    Share
                </Button>
            </Box>
            </Grid>

            <Grid direction = 'column'  item xs={8} md={8} lg={8}>
                {Object.keys(props.tracker.call).map((item) =>
                        <PackageItem
                            item = {item}
                            user = {props.user}
                            tracker = {props.tracker}
                        />
                    )}

            </Grid>

        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
        display:'flex',
        // minHeight: 200,
        // maxWidth: 540,
        // backgroundColor: 'white',
    },
}));

export default PackageManger;
