import IEffect from "./IEffect";
import PropTypes from "prop-types";

export default class Scramble extends IEffect{
    constructor(props) {
        super(props);
    }

    _effect = (newValue)=>{
        //TODO
        const from = this.state.output;
        console.log(from);
    }
}

Scramble.propTypes = {
    ...IEffect.propTypes,
    options: PropTypes.shape({
        duration: PropTypes.arrayOf(PropTypes.string),
        letters: PropTypes.string,
        wrapper: PropTypes.bool,
        wrapperClass: PropTypes.string,
        ignoreEquals: PropTypes.bool,
    })
}

Scramble.defaultProps = {
    ...IEffect.defaultProps,
    options: {
        duration: [300,1000],
        letters: '!<>-_\\/[]{}—=+*^?#@!·()$~_',
        wrapper: false,
        wrapperClass: '',
        ignoreEquals: false,
    }
}