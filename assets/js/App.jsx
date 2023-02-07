import React, {Suspense} from "react";
import { Outlet } from 'react-router-dom';


import '../styles/styles.scss';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SVG from "react-inlinesvg";

export default class App extends React.Component {
    render() {
        return (<>
                <Header />
                <main>
                    <Suspense
                        fallback={
                        <section id='route-inner-load'>
                            <SVG src='build/images/favicon/favicon.svg'/>
                        </section>
                    }>
                        <Outlet />
                        {this.props.children}
                    </Suspense>
                </main>
            <Footer />
        </>);
    }
}