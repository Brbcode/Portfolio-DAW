import React from "react";
import PropTypes from "prop-types";

export default class IEffect extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            output: this.props.output,
            running: false,
        }
    }

    _start = ()=>{
        this.setState(v=>({
            ...v,
            running: true
        }));
    }

    _stop = ()=>{
        this.setState(v=>({
            ...v,
            running: false
        }));
    }

    apply = (newValue) => {
        if(!this.state.running){
            this._start();
            this._effect(newValue);
        }
        else
            console.warn('Effect already running');
    }

    _effect(newValue){
        throw new Error("Abstract Method has no implementation");
    }

    render() {
        return <>{this.state.output}</>;
    }
}

IEffect.propTypes = {
    options: PropTypes.object,
}

IEffect.defaultProps = {
    options: {}
}