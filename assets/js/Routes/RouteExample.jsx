import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class RouteExample extends React.Component {
  render() {
    const { routeID } = this.props;
    return (
      <h2>
        Route
        {routeID}
      </h2>
    );
  }
}

RouteExample.propTypes = {
  routeID: PropTypes.number.isRequired,
};
