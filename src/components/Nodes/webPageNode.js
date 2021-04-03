import React, {memo} from 'react';
import Box from "@material-ui/core/Box";

export default memo(({ data,}) => {
    const[border, setBorder] = React.useState(data.border);
    const [shadow, setShadow ] =React.useState(8);
    const [backgroundColor, setBackGroundColor] = React.useState(data.backgroundColor);

    return (
        <>
        <Box border = {2}  borderColor = {'white'} style = {{ width: 1000, height: 400, boxShadow: `0px ${shadow == 8 ? '5' : '0'}px ${shadow.toString()}px #D3D3DA`, padding: -5, overflow: 'hidden', borderRadius:7, backgroundColor: backgroundColor, }}
            display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'center'>

            {/*<iframe className="airtable-embed"*/}
            {/*        src="https://airtable.com/embed/shrAhRpupJ2uNZwQm?backgroundColor=blue&viewControls=on" style = {{width: 1005, height: 355}}>*/}


            {/*</iframe>*/}

            <div style={{height: '374px', backgroundColor: '#1D2330', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid #282E3B', borderRadius: '4px', textAlign: 'right', lineHeight: '14px', fontSize: '12px', fontFeatureSettings: 'normal', textSizeAdjust: '100%', boxShadow: 'inset 0 -20px 0 0 #262B38', padding: '0px', margin: '0px', width: '100%'}}><div style={{height: '354px', padding: '0px', margin: '0px', width: '100%'}}><iframe src="https://widget.coinlib.io/widget?type=full_v2&theme=dark&cnt=5&pref_coin_id=1505&graph=yes" width="100%" height="350px" scrolling="auto" marginWidth={0} marginHeight={0} frameBorder={0} border={0} style={{border: 0, margin: 0, padding: 0}} /></div><div style={{color: '#626B7F', lineHeight: '14px', fontWeight: 400, fontSize: '11px', boxSizing: 'border-box', padding: '2px 6px', width: '100%', fontFamily: 'Verdana, Tahoma, Arial, sans-serif'}}><a href="https://coinlib.io" target="_blank" style={{fontWeight: 500, color: '#626B7F', textDecoration: 'none', fontSize: '11px'}}>Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>



g

            {/*<embed src="https://vclock.com/timer/" style={{width:1000, height: 350}} />*/}


        </Box>
            </>

    );
});


