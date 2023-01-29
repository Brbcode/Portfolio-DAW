import React, {Suspense} from "react";
import {Link} from "react-router-dom";
import { Outlet } from 'react-router-dom';

import '../styles/styles.scss';
import Header from "./Components/Header/Header";

export default class App extends React.Component {
    render() {
        return (<>
                <Header />
                <h1>Hello World!!</h1>
                <hr />
                    <ul>
                        <li><Link to='/' >Home</Link></li>
                        <li><Link to='route1' >Route 1</Link></li>
                        <li><Link to='route2' >Route 2</Link></li>
                    </ul>
                <hr />
                <Suspense fallback='inner loading'>
                    <Outlet />
                </Suspense>
        </>);
    }
}