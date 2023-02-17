import React from "react";
import './styles.scss';
import {Link, NavLink } from "react-router-dom";
import SVG from 'react-inlinesvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faGear, faPenNib } from '@fortawesome/free-solid-svg-icons';
import BurgerButton from '../BurgerButton/BurgerButton';
import classNames from "classnames";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: false,
            displayNavOnMobile: false
        }
        this.links = [
            {
                icon: faHome,
                label: 'Home',
                path: '/'
            },
            {
                icon: faPenNib,
                label: 'Projects',
                path: '/projects'
            },
            {
                icon: faGear,
                label: 'Route 2',
                path: '/route2'
            },
        ]

        this.updateSticky = this.updateSticky.bind(this);
    }

    updateSticky() {
        this.setState(v=>({
            sticky: window.scrollY > 5,
            displayNavOnMobile: v.displayNavOnMobile
        }));
    }


    componentDidMount(){
        window.addEventListener('scroll', this.updateSticky);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.updateSticky);
    }

    render() {
        const {sticky, displayNavOnMobile} = this.state;
        return (
            <header className={classNames({sticky})}>
                <Link to="/" className='logo-link'><SVG src='build/images/favicon/favicon.svg'/></Link>
                <nav className={classNames({active: displayNavOnMobile})}>
                    <ul>
                        {this.links.map(({icon,label,path})=>
                            <li key={label}>
                                <NavLink to={path}
                                         onClick={()=>this.setState(v => ({
                                             sticky: v.sticky,
                                             displayNavOnMobile: false
                                         }))}
                                >
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
