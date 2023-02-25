import React from 'react';
import PropTypes from 'prop-types';
import * as Effects from './Effects';

export default class ComponentSwapper extends React.Component {
  constructor(props) {
    super(props);
    this.refEff = React.createRef();
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  swap = (newValue) => {
    this.refEff.current.apply(newValue);
  };

  render() {
    const { effect, children, ...others } = this.props;
    const Effect = effect;
    return <Effect ref={this.refEff} output={children} {...others} />;
  }
}

ComponentSwapper.propTypes = {
  children: PropTypes.node,
  effect: PropTypes.elementType,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  options: PropTypes.object,
};

ComponentSwapper.defaultProps = {
  effect: Effects.None,
  children: null,
};

export { Effects };
