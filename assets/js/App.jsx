import React, {Suspense} from "react";
import {Link} from "react-router-dom";
import { Outlet } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (<>
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