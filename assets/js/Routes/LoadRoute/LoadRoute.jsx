import React from 'react';
import './styles.scss';
import SVG from 'react-inlinesvg';

// eslint-disable-next-line react/prefer-stateless-function
export default class LoadRoute extends React.Component {
  render() {
    return (
      <div id="load-wrapper">
        <SVG src="build/images/favicon/favicon.svg" />
        <p>wait please</p>
      </div>
    );
  }
}
