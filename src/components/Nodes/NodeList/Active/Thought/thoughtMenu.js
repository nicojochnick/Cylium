import React from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {ListItemIcon, ListItemText} from "@material-ui/core";
import {BiDotsVerticalRounded, BiExpand, BiMapPin, BiX} from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";

function ThoughtMenu(props) {

    const [anchorElMenu, setAnchorElMenu] = React.useState(null);


    const openMenu = (event) => {
        setAnchorElMenu(event.currentTarget);

    };

    const closeMenu = () => {
        setAnchorElMenu(null);
    };

    return (


        <div>
            {props.isHovering
                ?
                <IconButton style={{margin:5,zIndex: 4 }} onClick={openMenu}>
                    <BiDotsVerticalRounded size={25}  />
                </IconButton>
                : null
            }

            <Menu
                id="simple-menu"
                anchorEl={anchorElMenu}
                keepMounted
                open={Boolean(anchorElMenu)}
                onClose={closeMenu}
            >

                <MenuItem>
                    <ListItemIcon>
                        <BiExpand />
                    </ListItemIcon>
                    <ListItemText primary="Expand" />
                </MenuItem>

                <MenuItem onClick={()=>props.setWithTitle()} >
                    <ListItemIcon>
                        <BiMapPin />
                    </ListItemIcon>
                    <ListItemText primary="Add Title" />
                </MenuItem>

                <MenuItem onClick={()=>props.data.delete(props.data.id)}>
                    <ListItemIcon>
                        <BiX />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />

                </MenuItem>
            </Menu>



        </div>

    );
}

export default ThoughtMenu;