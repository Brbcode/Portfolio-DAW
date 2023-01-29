import React from "react";
import './styles.scss';
import {Link, NavLink } from "react-router-dom";
import SVG from 'react-inlinesvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPaperclip, faGear } from '@fortawesome/free-solid-svg-icons';
import BurgerButton from '../BurgerButton/BurgerButton';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayNavOnMobile: false
        }
        this.links = [
            {
                icon: faHome,
                label: 'Home',
                path: '/'
            },
            {
                icon: faPaperclip,
                label: 'Route 1',
                path: '/route1'
            },
            {
                icon: faGear,
                label: 'Route 2',
                path: '/route2'
            },
        ]
    }

    render() {
        const {displayNavOnMobile} = this.state;
        return (
            <header>
                <Link to="/" className='logo-link'><SVG src='build/images/favicon/favicon.svg'/></Link>
                <nav>
                    <ul>
                        {this.links.map(({icon,label,path})=>
                            <li key={label}>
                                <NavLink to={path}>
                                    <FontAwesomeIcon icon={icon} />
                                    {' '}
                                    {label}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
                <BurgerButton active={displayNavOnMobile} onClick={()=>{
                    this.setState((v)=>({
                        displayNavOnMobile: !v.displayNavOnMobile
                    }));
                }} />
            </header>
        );
    }
}
