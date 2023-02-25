import PropTypes from 'prop-types';
import React from 'react';
import IEffect from './IEffect';

export default class Textwriter extends IEffect {
  static get DEFAULTS() {
    return (
      {
        speed: 100,
        textCursor: <>█</>,
        rewriteAll: true,
      }
    );
  }

  get #options() {
    return ({
      ...Textwriter.DEFAULTS,
      ...this.props.options,
    });
  }

  componentWillUnmount() {
    if (this.timeoutEnd) { clearTimeout(this.timeoutEnd); }
    this.timeouts?.forEach((t) => clearTimeout(t));
  }

  _effect = (newValue) => {
    const from = this.#cmap(this.state.output);
    const to = this.#cmap(newValue).map((e, i) => {
      // eslint-disable-next-line react/no-array-index-key
      if (typeof e === 'string') { return <span key={i}>{e}</span>; }
      if (e?.key === null) {
        // eslint-disable-next-line react/no-array-index-key
        return React.cloneElement(e, { ...e.props, key: i }, e.props.children);
      }
      return e;
    });
    const output = from.map((e, i) => {
      // eslint-disable-next-line react/no-array-index-key
      if (typeof e === 'string') { return <span key={i}>{e}</span>; }
      if (e?.key === null) {
        // eslint-disable-next-line react/no-array-index-key
        return React.cloneElement(e, { ...e.props, key: i }, e.props.children);
      }
      return e;
    });

    this.timeouts = [];

    this.setState((v) => ({
      ...v,
      output: <>
        {output}
        {this.#options.textCursor}
        {/* eslint-disable-next-line react/jsx-closing-tag-location */}
      </>,
    }));

    // eslint-disable-next-line consistent-return
    const startIndex = this.#options.rewriteAll ? 0 : (() => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < output.length; i++) {
        if (!Textwriter.#VisibleEqual(output[i], to[i])) { return i; }
      }
    })();

    let step = 1;
    // eslint-disable-next-line no-plusplus
    for (let i = output.length; i > startIndex; i--) {
      this.timeouts.push(
        setTimeout(() => {
          const slice = output.slice(0, i);

          this.setState((v) => ({
            ...v,
            output: <>
              {slice}
              {this.#options.textCursor}
              {/* eslint-disable-next-line react/jsx-closing-tag-location */}
            </>,
          }));
        }, step * this.#options.speed),
      );
      // eslint-disable-next-line no-plusplus
      step++;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = startIndex; i <= to.length; i++) {
      this.timeouts.push(
        setTimeout(() => {
          const slice = to.slice(0, i);

          this.setState((v) => ({
            ...v,
            output: <>
              {slice}
              {this.#options.textCursor}
              {/* eslint-disable-next-line react/jsx-closing-tag-location */}
            </>,
          }));
        }, step * this.#options.speed),
      );
      // eslint-disable-next-line no-plusplus
      step++;
    }
    this.timeoutEnd = setTimeout(() => {
      this.setState((v) => ({
        ...v,
        output: newValue,
        // eslint-disable-next-line no-underscore-dangle
      }), () => this._stop());
    }, step * this.#options.speed);
  };

  static #VisibleEqual(a, b) {
    const cmpA = (typeof a === 'object') ? a.props.children : a;
    const cmpB = (typeof b === 'object') ? b.props.children : b;
    return cmpA === cmpB;
  }

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

Textwriter.propTypes = {
  ...IEffect.propTypes,
  options: PropTypes.shape({
    duration: PropTypes.number,
    ignoreEquals: PropTypes.bool,
  }),
};

Textwriter.defaultProps = {
  ...IEffect.defaultProps,
  options: {
    ...Textwriter.DEFAULTS,
  },
};
