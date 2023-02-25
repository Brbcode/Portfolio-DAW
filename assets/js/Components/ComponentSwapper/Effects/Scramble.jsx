import PropTypes from 'prop-types';
import React from 'react';
import IEffect from './IEffect';
import '../../../Utils/StringExtensions';

export default class Scramble extends IEffect {
  static get DEFAULTS() {
    return (
      {
        duration: 1000,
        letters: '!<>-_\\/[]{}—=+*^?#@!·()$~_',
        wrapperClass: '',
        ignoreEquals: false,
      }
    );
  }

  get #options() {
    return ({
      ...Scramble.DEFAULTS,
      ...this.props.options,
    });
  }

  componentWillUnmount() {
    if (this.timeoutEnd) {
      clearTimeout(this.timeoutEnd);
    }
    this.timeouts?.forEach(({ begin, end }) => {
      clearTimeout(begin);
      clearTimeout(end);
    });
  }

  _effect = (newValue) => {
    const from = this.#cmap(this.state.output);
    const to = this.#cmap(newValue);
    const maxLength = Math.max(from.length, to.length);
    const output = this.#cresize(from, maxLength);
    const { duration, wrapperClass, ignoreEquals } = this.#options;

    this.timeoutEnd = setTimeout(() => {
      this.setState((v) => ({
        ...v,
        output: newValue,
        // eslint-disable-next-line no-underscore-dangle
      }), () => this._stop());
    }, duration + 1);
    this.timeouts = [];

    output.forEach((element, index) => {
      const beginDelay = (Math.random() * duration) / 2;
      const endDelay = beginDelay + (Math.random() * (duration - beginDelay));
      const char = this.#options.letters.randomChar();

      // eslint-disable-next-line react/no-array-index-key
      const wrapChar = <span key={index} className={wrapperClass}>{char}</span>;

      if (ignoreEquals && Scramble.#VisibleEqual(from[index], to[index])) {
        return;
      }

      this.timeouts.push({
        begin: setTimeout(() => {
          output[index] = wrapChar;
          this.setState((v) => ({
            ...v,
            output: output.map((e, i) => {
              // eslint-disable-next-line react/no-array-index-key
              if (typeof e === 'string') { return <span key={i}>{e}</span>; }
              if (e?.key === null) {
                // eslint-disable-next-line react/no-array-index-key
                return React.cloneElement(e, { ...e.props, key: i }, e.props.children);
              }
              return e;
            }),
          }));
        }, beginDelay),
        end: setTimeout(() => {
          output[index] = to[index] ?? null;
          this.setState((v) => ({
            ...v,
            output: output.map((e, i) => {
              // eslint-disable-next-line react/no-array-index-key
              if (typeof e === 'string') { return <span key={i}>{e}</span>; }
              if (e?.key === null) {
                // eslint-disable-next-line react/no-array-index-key
                return React.cloneElement(e, { ...e.props, key: i }, e.props.children);
              }
              return e;
            }),
          }));
        }, endDelay),
      });
    });
  };

  static #VisibleEqual(a, b) {
    const cmpA = (typeof a === 'object') ? a.props.children : a;
    const cmpB = (typeof b === 'object') ? b.props.children : b;
    return cmpA === cmpB;
  }

  // eslint-disable-next-line class-methods-use-this
  #cresize = (arr, length) => {
    const ret = [...arr];
    let delta = length - arr.length;

    // eslint-disable-next-line no-plusplus
    while (delta-- > 0) { ret.push(' '); }
    return ret;
  };

  #cmap = (i) => {
    if (Array.isArray(i)) {
      return i.reduce((acc, e) => [...acc, ...this.#cmap(e)], []);
    }
    if (typeof i === 'string') {
      return i.split('');
    }
    if (typeof i === 'object') {
      const imap = this.#cmap(i.props.children);
      return imap.map((v) => React.cloneElement(i, i.props, v));
    }
    // eslint-disable-next-line no-throw-literal
    throw `Unexpected children type: ${typeof i}`;
  };
}

Scramble.propTypes = {
  ...IEffect.propTypes,
  options: PropTypes.shape({
    duration: PropTypes.number,
    letters: PropTypes.string,
    wrapperClass: PropTypes.string,
    ignoreEquals: PropTypes.bool,
  }),
};

Scramble.defaultProps = {
  ...IEffect.defaultProps,
  options: {
    ...Scramble.DEFAULTS,
  },
};
