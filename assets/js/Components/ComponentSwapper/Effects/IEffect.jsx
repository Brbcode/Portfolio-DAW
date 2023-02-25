import React from 'react';
import PropTypes from 'prop-types';

export default class IEffect extends React.Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line react/prop-types
    const { output } = this.props;

    this.state = {
      output,
      running: false,
    };
  }

  _start = () => {
    this.setState((v) => ({
      ...v,
      running: true,
    }));
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  _stop = () => {
    this.setState((v) => ({
      ...v,
      running: false,
    }));
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  apply = (newValue) => {
    const { running } = this.state;
    if (!running) {
      // eslint-disable-next-line no-underscore-dangle
      this._start();
      // eslint-disable-next-line no-underscore-dangle
      this._effect(newValue);
      // eslint-disable-next-line no-console
    } else { console.warn('Effect already running'); }
  };

  // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
  _effect() {
    throw new Error('Abstract Method has no implementation');
  }

  render() {
    const { output } = this.state;
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{output}</>;
  }
}

IEffect.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  options: PropTypes.object,
};

IEffect.defaultProps = {
  options: {},
};
