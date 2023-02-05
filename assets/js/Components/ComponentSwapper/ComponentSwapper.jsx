import React from "react";
import PropTypes from "prop-types";
import * as Effects from "./Effects";

export default class ComponentSwapper extends React.Component{
    constructor(props) {
        super(props);
        this.refEff = React.createRef();
    }

    swap = (newValue)=>{
        this.refEff.current.apply(newValue);
    }

    render() {
        const {effect, ...others} = this.props;
        const Effect = effect;
        return <><Effect ref={this.refEff} output={this.props.children} {...others} /></>;
    }
}

ComponentSwapper.propTypes = {
    effect: PropTypes.elementType,
    options: PropTypes.object,
}

ComponentSwapper.defaultProps = {
    effect: Effects.None,
    options: {}
}

export {Effects};
