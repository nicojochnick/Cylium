import React, {memo, useState, useEffect, useRef} from 'react';
import {ListItemIcon, ListItemText, makeStyles, TextField} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DocumentApp from "../../NonActive/Document/documentApp";
import {convertFromRaw, convertToRaw, Editor, EditorState, getDefaultKeyBinding} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Handle} from "react-flow-renderer";
import {BiDotsVertical, BiDotsVerticalRounded, BiExpand, BiMapPin, BiText, BiX} from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ThoughtMenu from "./thoughtMenu";
import { useZoomPanHelper,useStore } from 'react-flow-renderer';


export default memo(({data}) => {
    const [text, setText] = React.useState(data.text)
    const [isOpen,setIsOpen] = React.useState(data.isOpen);
    const [isHovering, setIsHovering] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [noDrag, setNoDrag] = React.useState(false)
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty(),)
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [title,setTitle] = React.useState(data.title);
    const [hasTitle, setHasTitle] = React.useState(data.hasTitle)
    const [hasConnections, setHasConnections] = React.useState(data.hasConnections)
    const [isActive, setIsActive] = React.useState(false);
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    const ref = useRef(null)
    const [icon, setIcon] = React.useState(data.icon);
    const { fitView, setCenter, project, fitBounds} = useZoomPanHelper();

    const store = useStore();
    const editor = useRef(null);
    const classes = useStyles();

    const focus = ()=>{
        setIsActive(true)
        const { nodes } = store.getState();
        for (let i = 0; i < nodes.length; i++){
            if (nodes[i].id === data.id){
                let position = nodes[i].position;
                let x = position.x+(200)
                let y = position.y + (height/2)
                setCenter(x,y, 1.75)
            }
        }
    }


    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false)
        data.isOpen = false;
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const focusEditor = () => {
        editor.current.focus()
    }
    const handleKeyCommand = (command, editorState) => {
        if (command === 'send-message') {
            console.log('return')
            handleClose()
        }
    }
    const keyBindingFN = (e) => {
        if (e.key === 'Enter') {
            return 'send-message'

        }
        return getDefaultKeyBinding(e)
    };

    const changeTitle = (text) => {
        setTitle(text);
        data.title = text
    };


    const handleSetEditorState = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setEditorState(editorState)
        data.text = save;
        // data.save();
    };

    const onMouseEnter = () => {
        setIsHovering(true)

    }

    const onMouseLeave = () => {
        setNoDrag(false)
        setIsHovering(false)
    }

    const setWithTitle = (type) => {
        if (type === 'remove') {
            data.hasTitle = false
            setHasTitle(false)

        } else {
            data.hasTitle = true;
            setHasTitle(true)
            addIcon()
        }
    }

    const setWithConnections = (type) => {
        if (type === 'remove') {
            data.hasConnections = false
            setHasConnections(false)

        } else {
            data.hasConnections = true;
            setHasConnections(true)
        }
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const addIcon = ( ) => {
        let allEmojis = ["😀","😁","😂","😃","😄","😅","😆","😇","😈","👿","😉","😊","☺️","😋","😌","😍","😎","😏","😐","😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡","😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲","😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀","👣","👤","👥","👶","👦","👧","👨","👨🏻","👨🏼","👨🏽","👨🏾","👨🏿","👩","👩🏻","👩🏼","👩🏽","👩🏾","👩🏿","👪","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧","👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👫","👬","👭","👯","","👼","👼🏻","👼🏼","👼🏽","👼🏾","👼🏿","🎅","🎅🏻","🎅🏼","🎅🏽","🎅🏾","🎅🏿","👻","👹","👺","💩","💀","👽","👾","🙇","🙇🏻","🙇🏼","🙇🏽","🙇🏾","🙇🏿","💁","💁🏻","💁🏼","💁🏽","💁🏾","💁🏿","🙅","🙅🏻","🙅🏼","🙅🏽","🙅🏾","🙅🏿","🙆","🙆🏻","🙆🏼","🙆🏽","🙆🏾","🙆🏿","🙋","🙋🏻","🙋🏼","🙋🏽","🙋🏾","🙋🏿","🙎","🙎🏻","🙎🏼","🙎🏽","🙎🏾","🙎🏿","🙍","🙍🏻","🙍🏼","🙍🏽","🙍🏾","🙍🏿","💆","💆🏻","💆🏼","💆🏽","💆🏾","💆🏿","💇","💇🏻","💇🏼","💇🏽","💇🏾","💇🏿","💑","👩‍❤️‍👩","👨‍❤️‍👨","💏","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","🙌","🙌🏻","🙌🏼","🙌🏽","🙌🏾","🙌🏿","👏","👏🏻","👏🏼","👏🏽","👏🏾","👏🏿","👂","👂🏻","👂🏼","👂🏽","👂🏾","👂🏿","👀","👃","👃🏻","👃🏼","👃🏽","👃🏾","👃🏿","👄","💋","👅","💅","💅🏻","💅🏼","💅🏽","💅🏾","💅🏿","👋","👋🏻","👋🏼","👋🏽","👋🏾","👋🏿","👍","👍🏻","👍🏼","👍🏽","👍🏾","👍🏿","👎","👎🏻","👎🏼","👎🏽","👎🏾","👎🏿","☝","☝🏻","☝🏼","☝🏽","☝🏾","☝🏿","👆","👆🏻","👆🏼","👆🏽","👆🏾","👆🏿","👇","👇🏻","👇🏼","👇🏽","👇🏾","👇🏿","👈","👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👉","👉🏻","👉🏼","👉🏽","👉🏾","👉🏿","👌","👌🏻","👌🏼","👌🏽","👌🏾","👌🏿","✌","✌🏻","✌🏼","✌🏽","✌🏾","✌🏿","👊","👊🏻","👊🏼","👊🏽","👊🏾","👊🏿","✊","✊🏻","✊🏼","✊🏽","✊🏾","✊🏿","✋","✋🏻","✋🏼","✋🏽","✋🏾","✋🏿","💪","💪🏻","💪🏼","💪🏽","💪🏾","💪🏿","👐","👐🏻","👐🏼","👐🏽","👐🏾","👐🏿","🙏","🙏🏻","🙏🏼","🙏🏽","🙏🏾","🙏🏿","🌱","🌲","🌳","🌴","🌵","🌷","🌸","🌹","🌺","🌻","🌼","💐","🌾","🌿","🍀","🍁","🍂","🍃","🍄","🌰","🐀","🐁","🐭","🐹","🐂","🐃","🐄","🐮","🐅","🐆","🐯","🐇","🐰","🐈","🐱","🐎","🐴","🐏","🐑","🐐","🐓","🐔","🐤","🐣","🐥","🐦","🐧","🐘","🐪","🐫","🐗","🐖","🐷","🐽","🐕","🐩","🐶","🐺","🐻","🐨","🐼","🐵","🙈","🙉","🙊","🐒","🐉","🐲","🐊","🐍","🐢","🐸","🐋","🐳","🐬","🐙","🐟","🐠","🐡","🐚","🐌","🐛","🐜","🐝","🐞","🐾","⚡️","🔥","🌙","☀️","⛅️","☁️","💧","💦","☔️","💨","❄️","🌟","⭐️","🌠","🌄","🌅","🌈","🌊","🌋","🌌","🗻","🗾","🌐","🌍","🌎","🌏","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌚","🌝","🌛","🌜","🌞","🍅","🍆","🌽","🍠","🍇","🍈","🍉","🍊","🍋","🍌","🍍","🍎","🍏","🍐","🍑","🍒","🍓","🍔","🍕","🍖","🍗","🍘","🍙","🍚","🍛","🍜","🍝","🍞","🍟","🍡","🍢","🍣","🍤","🍥","🍦","🍧","🍨","🍩","🍪","🍫","🍬","🍭","🍮","🍯","🍰","🍱","🍲","🍳","🍴","🍵","☕️","🍶","🍷","🍸","🍹","🍺","🍻","🍼","🎀","🎁","🎂","🎃","🎄","🎋","🎍","🎑","🎆","🎇","🎉","🎊","🎈","💫","✨","💥","🎓","👑","🎎","🎏","🎐","🎌","🏮","💍","❤️","💔","💌","💕","💞","💓","💗","💖","💘","💝","💟","💜","💛","💚","💙","🏃","🏃🏻","🏃🏼","🏃🏽","🏃🏾","🏃🏿","🚶","🚶🏻","🚶🏼","🚶🏽","🚶🏾","🚶🏿","💃","💃🏻","💃🏼","💃🏽","💃🏾","💃🏿","🚣","🚣🏻","🚣🏼","🚣🏽","🚣🏾","🚣🏿","🏊","🏊🏻","🏊🏼","🏊🏽","🏊🏾","🏊🏿","🏄","🏄🏻","🏄🏼","🏄🏽","🏄🏾","🏄🏿","🛀","🛀🏻","🛀🏼","🛀🏽","🛀🏾","🛀🏿","🏂","🎿","⛄️","🚴","🚴🏻","🚴🏼","🚴🏽","🚴🏾","🚴🏿","🚵","🚵🏻","🚵🏼","🚵🏽","🚵🏾","🚵🏿","🏇","🏇🏻","🏇🏼","🏇🏽","🏇🏾","🏇🏿","⛺️","🎣","⚽️","🏀","🏈","⚾️","🎾","🏉","⛳️","🏆","🎽","🏁","🎹","🎸","🎻","🎷","🎺","🎵","🎶","🎼","🎧","🎤","🎭","🎫","🎩","🎪","🎬","🎨","🎯","🎱","🎳","🎰","🎲","🎮","🎴","🃏","🀄️","🎠","🎡","🎢","🚃","🚞","🚂","🚋","🚝","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚨","🚕","🚖","🚗","🚘","🚙","🚚","🚛","🚜","🚲","🚏","⛽️","🚧","🚦","🚥","🚀","🚁","✈️","💺","⚓️","🚢","🚤","⛵️","🚡","🚠","🚟","🛂","🛃","🛄","🛅","💴","💶","💷","💵","🗽","🗿","🌁","🗼","⛲️","🏰","🏯","🌇","🌆","🌃","🌉","🏠","🏡","🏢","🏬","🏭","🏣","🏤","🏥","🏦","🏨","🏩","💒","⛪️","🏪","🏫","⌚️","📱","📲","💻","⏰","⏳","⌛️","📷","📹","🎥","📺","📻","📟","📞","☎️","📠","💽","💾","💿","📀","📼","🔋","🔌","💡","🔦","📡","💳","💸","💰","💎","🌂","👝","👛","👜","💼","🎒","💄","👓","👒","👡","👠","👢","👞","👟","👙","👗","👘","👚","👕","👔","👖","🚪","🚿","🛁","🚽","💈","💉","💊","🔬","🔭","🔮","🔧","🔪","🔩","🔨","💣","🚬","🔫","🔖","📰","🔑","✉️","📩","📨","📧","📥","📤","📦","📯","📮","📪","📫","📬","📭","📄","📃","📑","📈","📉","📊","📅","📆","🔅","🔆","📜","📋","📖","📓","📔","📒","📕","📗","📘","📙","📚","📇","🔗","📎","📌","✂️","📐","📍","📏","🚩","📁","📂","✒️","✏️","📝","🔏","🔐","🔒","🔓","📣","📢","🔈","🔉","🔊","🔇","💤","🔔","🔕","💭","💬","🚸","🔍","🔎","🚫","⛔️","📛","🚷","🚯","🚳","🚱","📵","🔞","🉑","🉐","💮","㊙️","㊗️","🈴","🈵","🈲","🈶","🈚️","🈸","🈺","🈷","🈹","🈳","🈂","🈁","🈯️","💹","❇️","✳️","❎","✅","✴️","📳","📴","🆚","🅰","🅱","🆎","🆑","🅾","🆘","🆔","🅿️","🚾","🆒","🆓","🆕","🆖","🆗","🆙","🏧","♈️","♉️","♊️","♋️","♌️","♍️","♎️","♏️","♐️","♑️","♒️","♓️","🚻","🚹","🚺","🚼","♿️","🚰","🚭","🚮","▶️","◀️","🔼","🔽","⏩","⏪","⏫","⏬","➡️","⬅️","⬆️","⬇️","↗️","↘️","↙️","↖️","↕️","↔️","🔄","↪️","↩️","⤴️","⤵️","🔀","🔁","🔂","#⃣","0⃣","1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟","🔢","🔤","🔡","🔠","ℹ️","📶","🎦","🔣","➕","➖","〰","➗","✖️","✔️","🔃","™","©","®","💱","💲","➰","➿","〽️","❗️","❓","❕","❔","‼️","⁉️","❌","⭕️","💯","🔚","🔙","🔛","🔝","🔜","🌀","Ⓜ️","⛎","🔯","🔰","🔱","⚠️","♨️","♻️","💢","💠","♠️","♣️","♥️","♦️","☑️","⚪️","⚫️","🔘"]
        let index = getRandomInt(0, allEmojis.length)
        let randomEmoji = allEmojis[index];
        setIcon(randomEmoji);
        data.icon = randomEmoji;
    };

    const onDoubleClick = () => {
        setNoDrag(true);
        focus()

    }


    useEffect(() => {

        if (data.text) {
            let parsed = EditorState.createWithContent(convertFromRaw(JSON.parse(data.text)))
            setEditorState(parsed);
        }

        setHeight(ref.current.clientHeight)


    }, []);

    // if (isOpen){
    //     focusEditor()
    // }

    return (
        <>
        <Box
            onMouseEnter = {onMouseEnter}
            onMouseLeave={onMouseLeave}
            display={'flex'}
            ref={ref}
            flexDirection = 'column'
            onDoubleClick={()=>onDoubleClick()}
            className={noDrag ? 'nodrag' : null}
            borderRadius={data.style.borderRadius}
            style = {{
                backgroundColor:data.style.bgColor,
                padding: 20,
                width: 400,
                fontSize: 18,
                fontWeight:500,
                cursor: noDrag ? 'default' : null,
                color: '#28292C',
                boxShadow: isHovering ? `0px 3px 10px rgba(0, 5, 0.9, 0.15)`:  data.style.shadow
            }}>

            <Box
                style = {{height: 30, marginBottom: hasTitle ? 0 : -30, marginTop: hasTitle ? -5 : 5, marginRight: -20,}}
                display={'flex'}
                flexDirection='row'
                justifyContent={'space-between'}
            >
                <div>
                {hasTitle
                   ?  <Box display = 'flex' flexDirection={'row'}>
                        <p style = {{fontSize: 27, marginBottom: 3, marginTop: 3, marginRight: 5, color:'black'}}> {icon} </p>

                        <TextField
                            onChange={(e) => changeTitle(e.target.value)}
                            id="standard-basic"
                            placeholder="Untitled"
                            value={title}
                            fullWidth={true}
                            InputProps={{style: {fontSize: 18, margin:5, marginRight: 0, fontWeight: 600, zIndex: 5,color: 'black', width: 285}, disableUnderline: true,}}
                        />

                    </Box>

                    : null
                }
                </div>

                <ThoughtMenu setWithConnections = {setWithConnections} hasConnections = {hasConnections} hasTitle = {hasTitle} setWithTitle = {setWithTitle} data = {data} isHovering = {isHovering} />




                </Box>

            <div style={{ cursor: noDrag ? 'text' : null,}}>


                <Editor
                    style = {{zIndex:10, }}
                    onEditorStateChange={handleSetEditorState}
                    editorState={editorState}
                    onChange={handleSetEditorState}
                />

            </div>


        </Box>

            {/*<Dialog*/}
            {/*    // id={id}*/}
            {/*    open={isOpen}*/}
            {/*    // className = {'nodrag'}*/}
            {/*    // fullWidth={true}*/}
            {/*    maxWidth={'lg'}*/}
            {/*    classes  = {{*/}
            {/*        // paper: classes.pop*/}
            {/*    }}*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    onClose={handleClose}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'center',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*    transformOrigin={{*/}
            {/*        vertical: 'center',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*>*/}

            {/*        /!*<DialogContent style = {{backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white', }}>*!/*/}
            {/*            <Box borderRadius={data.style.borderRadius} style = {{backgroundColor:data.style.bgColor, padding: 10, width: 350, boxShadow:data.style.shadow}}>*/}
            {/*                <Editor                 keyBindingFn={keyBindingFN}*/}
            {/*                                        handleKeyCommand={handleKeyCommand} ref={editor}  editorState={editorState} onChange={setEditorState} />*/}
            {/*            </Box>*/}
            {/*        /!*</DialogContent>*!/*/}
            {/*</Dialog>*/}

            {hasConnections

                ?
                <>

                        <Handle
                            type="source"
                            id='k'
                            position="left"
                            style={{zIndex: 12, boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`}}
                            // onConnect={(params) => console.log('handle onConnect', params)}
                        />

                        <Handle
                        type="source"
                        id = 'j'
                        position="right"
                        style={{zIndex: 12, boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`}}
                        // onConnect={(params) => console.log('handle onConnect', params)}
                        />
                    </>
                : null
            }
        </>
    );
})



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
    },
}));


