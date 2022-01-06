//CONTINUOUS ASSESSMENT II - BSC30921
//STUDENT ID: 21565
//STUDENT NAME: ALESSANDRA SILVA DOS REIS

// component to view 1 single Singer
import React from 'react';

class SingerView extends React.Component{
    constructor(props){
        super(props);
        let id = window.location.href.split('=')[1]
    }
    render(){
        return(
            <div>This is the Singer View component</div>
        )
    }
}

export default SingerView;