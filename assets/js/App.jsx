import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/styles.scss';
import SVG from 'react-inlinesvg';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    return (
      <>
        <section id="modal-wrapper" />
        <Header />
        <main>
          <Suspense
            fallback={(
              <section id="route-inner-load">
                <SVG src="build/images/favicon/favicon.svg" />
              </section>
            )}
          >
            <Outlet />
            {/* eslint-disable-next-line react/prop-types,react/destructuring-assignment */}
            {this.props.children}
          </Suspense>
        </main>
        <Footer />
      </>
    );
  }
}
