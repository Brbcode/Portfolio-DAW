import React from "react";
import './style.scss'
import Project from "../../Components/Project/Project";

export default class Projects extends React.Component{
    render() {
        return <section id='projects'>
            <Project image={''} description={'desc'} />
        </section>;
    }
}