import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Button from "@material-ui/core/Button";
import {fade, makeStyles} from "@material-ui/core/styles";
import { BiSend, BiPlus,BiCheck} from "react-icons/bi";
import {db} from "../../../api/firebase";
import UserId from "../../User/userID";
import Divider from "@material-ui/core/Divider";


function SearchUsers(props) {
    const classes = useStyles();

    const [searchEmail, setSearchEmail] = React.useState('');
    const [searchUser, setSearchUser] = React.useState(false);
    const [didSearch, setDidSearch]  = React.useState(false);
    const [invited, setDidInvite ] = React.useState(false);

    const handleSearch = async () => {
        let usersRef = db.collection("users");

        console.log('SEARCH QUERY', searchEmail);
        let snapshot = await usersRef.where("email", "==", searchEmail).get()
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            setSearchUser(doc.data())
        });
        setDidSearch(true);
    };

    const didInvite = () => {
        setDidInvite(true);
        setSearchUser(false);
        setDidSearch(false);
        const timer = setTimeout(() => {
            setDidInvite(false)
        }, 1400);
    }


    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container direction={'column'}>
            <Box display="flex"  direction="column" flexDirection="column" borderRadius={0}
                 style={{padding: 5,}}>
                <Box   display="flex" flexDirection="row" direction="row">
                <Box
                    display="flex" flexDirection="row" direction="row"
                    borderRadius={16}
                    style={{margin: 10, flexGrow: 1}}
                    className={classes.search2}
                >
                    <div className={classes.searchIcon}>
                        <BiPlus/>
                    </div>
                    <InputBase
                        fullWidth
                        onChange={(e) => setSearchEmail(e.target.value)}
                        placeholder="Search by Email"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onClick={event => setSearchEmail(event.target.value)}
                        inputProps={{'aria-label': 'search'}}
                    />
                </Box>
                <Button
                    style={{margin: 10}}
                    variant="contained"
                    color='primary'
                    className={classes.button}
                    onClick = {() => handleSearch()}
                >
                    Search
                </Button>
                </Box>
                {!invited
                    ?<Box>
                        {didSearch
                            ?
                            <div>
                                {searchUser
                                    ?
                                    <div>
                                        <Divider style={{margin: 5}}/>
                                        <UserId
                                            didInvite={didInvite}
                                            background={true}
                                            isAdding={true}
                                            goDark={true}
                                            user={searchUser}
                                            viewingUser={props.user}
                                            channel = {props.channel}

                                        />

                                    </div>
                                    : <p> no user found</p>
                                }
                            </div>
                            : null

                        }
                    </Box>
                    :
                    <Box display = 'flex' flexDirection ='row' alignItems = 'center' justifyContent = 'center'>
                        <p style = {{fontSize: 17, margin: 5 }}> Invite Sent!</p>
                        <BiCheck size = {25} />
                    </Box>
                }
            </Box>
            </Grid>
            {/*<Box display="flex" flexDirection="row" direction="row" borderRadius={10}*/}
            {/*     style={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA"}}>*/}
            {/*    <Box*/}
            {/*        borderRadius={16}*/}
            {/*        style={{margin: 10}}*/}
            {/*        className={classes.search2}*/}
            {/*    >*/}
            {/*        <div className={classes.searchIcon}>*/}
            {/*            <BiSend/>*/}
            {/*        </div>*/}
            {/*        <InputBase*/}
            {/*            fullWidth*/}
            {/*            placeholder="Send Email Invite"*/}
            {/*            classes={{*/}
            {/*                root: classes.inputRoot,*/}
            {/*                input: classes.inputInput,*/}
            {/*            }}*/}
            {/*            // inputProps={{'aria-label': 'search'}}*/}
            {/*        />*/}
            {/*    </Box>*/}
            {/*    <Button*/}
            {/*        style={{margin: 10}}*/}
            {/*        variant="contained"*/}
            {/*        color='primary'*/}
            {/*        className={classes.button}*/}
            {/*    >*/}
            {/*        Invite*/}
            {/*    </Button>*/}
            {/*</Box>*/}
        </Grid>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxWidth: 540,
        backgroundColor: 'white',
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        flexDirection: 'column',
        // margin: 10,
        // marginBottom: 20,
        backgroundColor: 'white',
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'start',
        flexDirection: 'column',
        // backgroundColor: 'white',
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

    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#A8ADBC", 0.15),
        '&:hover': {
            backgroundColor: fade("#A8ADBC", 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    search2: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#A8ADBC", 0.15),
        '&:hover': {
            backgroundColor: fade("#A8ADBC", 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

export default SearchUsers;
