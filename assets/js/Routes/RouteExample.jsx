import React from "react";
import PropTypes from 'prop-types';

export default class RouteExample extends React.Component {
    render() {
        return (<>
            <h2>Route {this.props.routeID}</h2>
        </>);
    }
}

RouteExample.propTypes = {
    routeID: PropTypes.number
}