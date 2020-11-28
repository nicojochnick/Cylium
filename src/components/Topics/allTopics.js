import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Feedback from "../feedback";
import Checkbox from '@material-ui/core/Checkbox';
import { BsChat } from "react-icons/bs";



let topics = [

    {name: "Communication", checked: false,},
    {name: "Leadership", checked: false,},
    {name: "Writing", checked: false,},
    {name: "Management", checked: false,},
    {name: "Product Management", checked: false,},
    {name: "Organization", checked: false,},
    {name: "Strategic Thinking", checked: false,},
    {name: "Design", checked: false,},
    {name: "Other", checked: false,},
];




function AllTopics(props) {
    return (
        <div>
            <Box display = "flex" fullWidth flexWrap="wrap" flexDirection="row" >

        {topics.map((item) =>
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
                           onChange={console.log('add to my categories')}
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
