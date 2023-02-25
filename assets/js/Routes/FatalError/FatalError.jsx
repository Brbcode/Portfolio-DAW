import React from 'react';
import { Link } from 'react-router-dom';
import './fatalerror.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class FatalError extends React.Component {
  render() {
    return (
      <section id="fatal-error">
        <h1>500</h1>
        <p>Oops, there seems to be a problem.</p>
        <p>
          Let me help you
          <Link to="/">a way out</Link>
        </p>
      </section>
    );
  }
}
