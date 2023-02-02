import React from "react";
import PropTypes from "prop-types";
import * as Effects from "./Effects";

export default class ComponentSwapper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            swapping: false,
            output: this.props.children
        }

        this.swap = this.swap.bind(this);
        this.setSwapping = this.setSwapping.bind(this);
        this.props.effect.swapping = this.setSwapping;
        this.props.effect.output = (value)=>this.setState(v=>({...v,output: value}));
    }

    swap(component){
        if(!this.state.swapping){
            this.props.effect.swap(this.state.output,component);
        }
        else
            console.warn('ComponentSwapper is already performing a swap');
    }

    setSwapping(value,callback){
        if(this.state.swapping!==value)
            this.setState(v=>({...v,swapping: value}),callback);
    }

    render() {
        return <>{this.state.output}</>;
    }
}


ComponentSwapper.propTypes = {
    effect: PropTypes.oneOfType(
        Object.keys(Effects).map((key)=>PropTypes.instanceOf(Effects[key]))
    ),
}

ComponentSwapper.defaultProps = {
    effect: new Effects.None()
}

export {Effects};
