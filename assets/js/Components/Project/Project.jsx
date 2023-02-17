import React from "react";
import PropTypes from "prop-types";
import './style.scss'

export default class Project extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {description} = this.props;
        return <article className='product'>
            {description}
        </article>;
    }
}

Project.propTypes = {
    image: PropTypes.string.isRequired,
    badges: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired
}

PropTypes.defaultProps = {
    badges: []
}
