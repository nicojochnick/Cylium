import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import LayersIcon from '@material-ui/icons/Layers';
import { IoIosMail } from "react-icons/io";

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <IoIosMail size = {25}/>
            </ListItemIcon>
            <ListItemText primary="Feedback" />
        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="My Box" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>

    </div>
);
