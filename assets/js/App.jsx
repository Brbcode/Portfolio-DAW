import React, {Suspense} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';


import '../styles/styles.scss';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

export default class App extends React.Component {
    render() {
        return (<>
                <Header />
                <main>
                    <Suspense fallback={<FontAwesomeIcon icon={faSpinner} className='fa-spin app-inner-load' />}>
                        <Outlet />
                    </Suspense>
                </main>
            <Footer />
        </>);
    }
}