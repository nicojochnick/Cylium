import React from 'react';
import Box from "@material-ui/core/Box";
import { BiNews, BiMessage ,BiMailSend, BiPalette, BiWallet,BiBulb, BiRocket, BiBadgeCheck,
    BiWorld, BiLike,BiHomeAlt,BiDollarCircle,BiCubeAlt, BiBitcoin, BiCoffee,BiCode,BiBriefcase, BiBug } from "react-icons/bi";
import { FaAmazon,FaDropbox ,FaYoutube, FaSlack, FaTwitter,
    FaStripeS, FaStackOverflow, FaShopify, FaLinkedinIn, FaFacebook ,FaGoogle, FaGit,FaInstagram} from "react-icons/fa";

import Divider from "@material-ui/core/Divider";


export function getIcon(name, color, size) {

    let icons = {

        FaDropbox:  <FaDropbox style = {{color: color, margin: 5}} size = {size} />,
        FaYoutube:  <FaYoutube style = {{color: color, margin: 5}} size = {size} />,
        FaSlack:  <FaSlack style = {{color: color, margin: 5}} size = {size} />,
        FaShopify:  <FaShopify style = {{color: color, margin: 5}} size = {size} />,
        FaTwitter:  <FaTwitter style = {{color: color, margin: 5}} size = {size} />,
        FaStripeS:  <FaStripeS style = {{color: color, margin: 5}} size = {size} />,
        FaStackOverflow:  <FaStackOverflow style = {{color: color, margin: 5}} size = {size} />,
        FaLinkedinIn:  <FaLinkedinIn style = {{color: color, margin: 5}} size = {size} />,
        FaFacebook:  <FaFacebook style = {{color: color, margin: 5}} size = {size} />,
        FaGoogle:  <FaGoogle style = {{color: color, margin: 5}} size = {size} />,
        FaGit:  <FaGit style = {{color: color, margin: 5}} size = {size} />,
        FaInstagram:  <FaInstagram style = {{color: color, margin: 5}} size = {size} />,


        BiNews:  <BiNews style = {{color: color, margin: 5}} size = {size} />,
        BiMessage:  <BiMessage style = {{color: color, margin: 5}} size = {size} />,
        BiMailSend:  <BiMailSend style = {{color: color, margin: 5}} size = {size} />,
        BiPalette:  <BiPalette style = {{color: color, margin: 5}} size = {size} />,
        BiWallet:  <BiNews style = {{color: color, margin: 5}} size = {size} />,
        BiBulb:  <BiNews style = {{color: color, margin: 5}} size = {size} />,
        BiRocket:  <BiNews style = {{color: color, margin: 5}} size = {size} />,
        BiBadgeCheck:  <BiBadgeCheck style = {{color: color, margin: 5}} size = {size} />,
        BiWorld:  <BiWorld style = {{color: color, margin: 5}} size = {size} />,
        BiLike:  <BiLike style = {{color: color, margin: 5}} size = {size} />,
        BiHomeAlt:  <BiHomeAlt style = {{color: color, margin: 5}} size = {size} />,
        BiDollarCircle:  <BiDollarCircle style = {{color: color, margin: 5}} size = {size} />,
        BiCubeAlt:  <BiCubeAlt style = {{color: color, margin: 5}} size = {size} />,
        BiBitcoin:  <BiBitcoin style = {{color: color, margin: 5}} size = {size} />,
        BiCoffee:  <BiCoffee style = {{color: color, margin: 5}} size = {size} />,
        BiCode:  <BiCode style = {{color: color, margin: 5}} size = {size} />,
        BiBriefcase:  <BiBriefcase style = {{color: color, margin: 5}} size = {size} />,
        BiBug:  <BiBug style = {{color: color, margin: 5}} size = {size} />,
    };
    return icons[name]

}



function IconSelector(props) {
    const [size,setSize] = React.useState(23);
    const [color,setColor] = React.useState('black')
    return (
        <div>
            <Divider/>
        <Box display = 'flex' flexDirection = 'column' alignItems ='center' border={1} borderRadius = {10} justify={'center'} borderColor = {'grey'} style = {{ overflow:'hidden', zIndex: 100}}>
            <Box display = 'flex' flexDirection = 'row' >
                <FaFacebook onClick = {() => props.selectIcon('FaFacebook')} style = {{color: color, margin: 5}} size = {size} />
                <FaTwitter onClick = {() => props.selectIcon('FaTwitter')} style = {{color: color, margin: 5}} size = {size} />
                <FaGoogle  onClick = {() => props.selectIcon('FaGoogle')}  style = {{color: color, margin: 5}} size = {size} />
                <FaSlack  onClick = {() => props.selectIcon('FaSlack')}  style = {{color: color, margin: 5}} size = {size} />
                <FaShopify onClick = {() => props.selectIcon('FaShopify')}  style = {{color: color, margin: 5}} size = {size} />
                <FaYoutube  onClick = {() => props.selectIcon('FaYoutube')}  style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <FaStripeS onClick = {() => props.selectIcon('FaStripeS')}   style = {{color: color, margin: 5}} size = {size} />
                <FaStackOverflow  onClick = {() => props.selectIcon('FaStackOverflow')}  style = {{color: color, margin: 5}} size = {size} />
                <FaDropbox  onClick = {() => props.selectIcon('FaDropbox')}  style = {{color: color, margin: 5}} size = {size} />
                <FaGit  onClick = {() => props.selectIcon('FaGit')}  style = {{color: color, margin: 5}} size = {size} />
                <FaInstagram  onClick = {() => props.selectIcon('FaInstagram')}  style = {{color: color, margin: 5}} size = {size} />
                <FaLinkedinIn  onClick = {() => props.selectIcon('FaLinkedinIn')}  style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <BiNews onClick = {() => props.selectIcon('BiNews')} style = {{color: color, margin: 5}} size = {size} />
                <BiMessage onClick = {() => props.selectIcon('BiMessage')} style = {{color: color, margin: 5}} size = {size} />
                <BiMailSend onClick = {() => props.selectIcon('BiMailSend')} style = {{color: color, margin: 5}} size = {size} />
                <BiPalette onClick = {() => props.selectIcon('BiPalette')} style = {{color: color, margin: 5}} size = {size} />
                <BiWallet onClick = {() => props.selectIcon('BiWallet')} style = {{color: color, margin: 5}} size = {size} />
                <BiBulb onClick = {() => props.selectIcon('BiBulb')} style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <BiRocket onClick = {() => props.selectIcon('BiRocket')} style = {{color: color, margin: 5}} size = {size} />
                <BiBadgeCheck onClick = {() => props.selectIcon('BiBadgeCheck')} style = {{color: color, margin: 5}} size = {size} />
                <BiLike onClick = {() => props.selectIcon('BiLike')}style = {{color: color, margin: 5}} size = {size} />
                <BiWorld onClick = {() => props.selectIcon('BiWorld')} style = {{color: color, margin: 5}} size = {size} />
                <BiHomeAlt onClick = {() => props.selectIcon('BiHomeAlt')} style = {{color: color, margin: 5}} size = {size} />
                <BiDollarCircle onClick = {() => props.selectIcon('BiDollarCircle')} style = {{color: color, margin: 5}} size = {size} />
            </Box>
            <Box display = 'flex' flexDirection = 'row' >
                <BiCubeAlt onClick = {() => props.selectIcon('BiCubeAlt')} style = {{color: color, margin: 5}} size = {size} />
                <BiCoffee onClick = {() => props.selectIcon('BiCoffee')} style = {{color: color, margin: 5}} size = {size} />
                <BiCode onClick = {() => props.selectIcon('BiCode')} style = {{color: color, margin: 5}} size = {size} />
                <BiBriefcase onClick = {() => props.selectIcon('BiBriefcase')} style = {{color: color, margin: 5}} size = {size} />
                <BiBug onClick = {() => props.selectIcon('BiBug')} style = {{color: color, margin: 5}} size = {size} />
                <BiBitcoin onClick = {() => props.selectIcon('BiBitcoin')} style = {{color: color, margin: 5}} size = {size} />
            </Box>

        </Box>
    </div>
    );
}

export default IconSelector;
