import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Feedback from "../feedback";
import Checkbox from '@material-ui/core/Checkbox';
import { BsChat } from "react-icons/bs";

function AllTopics(props) {
    console.log(props.topics);
    const handleCheck = (name,checked) => {
        if (checked) {
            props.handleDeselect(name)

        } else {
            props.handleSelect(name)
        }
    };
    return (
        <div>
            <Box display = "flex" fullWidth flexWrap="wrap" flexDirection="row" >

        {props.topics.map((item) =>
               <div>
                   <Box
                       style = {{borderRadius:10, margin: 5, paddingLeft: 15, paddingRight: 5}}
                        boxShadow = {4}>
                   <Grid
                       container
                       direction="row"
                   >
                       <p>
                       {item.name}
                       </p>
                       <Checkbox
                           checked={item.checked}
                           onChange={()=>handleCheck(item.name, item.check)}
                           inputProps={{ 'aria-label': 'primary checkbox' }}
                       />
                   </Grid>
                   </Box>

               </div>
            )}
            </Box>

        </div>

    );
}

export default AllTopics;
