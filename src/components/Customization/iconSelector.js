import React from 'react';
import Box from "@material-ui/core/Box";
import { BiNews, BiMessage ,BiMailSend, BiPalette, BiWallet,BiBulb, BiRocket, BiBadgeCheck,
    BiWorld, BiLike,BiHomeAlt,BiDollarCircle,BiCubeAlt, BiBitcoin, BiCoffee,BiCode,BiBriefcase, BiBug } from "react-icons/bi";

import { FaAmazon,FaDropbox ,FaYoutube, FaSlack, FaTwitter, FaStripeS, FaStackOverflow, FaShopify, FaLinkedinIn, FaFacebook ,FaGoogle, FaGit,FaInstagram} from "react-icons/fa";

import Divider from "@material-ui/core/Divider";

function IconSelector(props) {
    const [size,setSize] = React.useState(23);
    const [color,setColor] = React.useState('black')
    return (
        <div>
            <Divider/>
        <Box display = 'flex' flexDirection = 'column' alignItems ='center' border={1} borderRadius = {10} justify={'center'} borderColor = {'grey'} style = {{ overflow:'hidden', zIndex: 100}}>
            <Box display = 'flex' flexDirection = 'row' >
                <FaFacebook style = {{color: color, margin: 5}} size = {size} />
                <FaTwitter style = {{color: color, margin: 5}} size = {size} />
                <FaGoogle style = {{color: color, margin: 5}} size = {size} />
                <FaSlack style = {{color: color, margin: 5}} size = {size} />
                <FaShopify style = {{color: color, margin: 5}} size = {size} />
                <FaYoutube style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <FaStripeS style = {{color: color, margin: 5}} size = {size} />
                <FaStackOverflow style = {{color: color, margin: 5}} size = {size} />
                <FaDropbox style = {{color: color, margin: 5}} size = {size} />
                <FaGit style = {{color: color, margin: 5}} size = {size} />
                <FaInstagram style = {{color: color, margin: 5}} size = {size} />
                <FaLinkedinIn style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <BiNews style = {{color: color, margin: 5}} size = {size} />
                <BiMessage style = {{color: color, margin: 5}} size = {size} />
                <BiMailSend style = {{color: color, margin: 5}} size = {size} />
                <BiPalette style = {{color: color, margin: 5}} size = {size} />
                <BiWallet style = {{color: color, margin: 5}} size = {size} />
                <BiBulb style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <BiRocket style = {{color: color, margin: 5}} size = {size} />
                <BiBadgeCheck style = {{color: color, margin: 5}} size = {size} />
                <BiLike ilSend style = {{color: color, margin: 5}} size = {size} />
                <BiWorld style = {{color: color, margin: 5}} size = {size} />
                <BiHomeAlt style = {{color: color, margin: 5}} size = {size} />
                <BiDollarCircle style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <BiCubeAlt style = {{color: color, margin: 5}} size = {size} />
                <BiCoffee style = {{color: color, margin: 5}} size = {size} />
                <BiCode ilSend style = {{color: color, margin: 5}} size = {size} />
                <BiBriefcase style = {{color: color, margin: 5}} size = {size} />
                <BiBug style = {{color: color, margin: 5}} size = {size} />
                <BiBitcoin style = {{color: color, margin: 5}} size = {size} />
            </Box>

        </Box>
    </div>
    );
}

export default IconSelector;
