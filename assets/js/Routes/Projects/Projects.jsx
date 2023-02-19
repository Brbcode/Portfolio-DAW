import React from "react";
import './style.scss'
import Project from "../../Components/Project/Project";

export default class Projects extends React.Component{
    render() {
        return <section id='projects'>
            <Project to={'/example'} title={'Example'} image={''} badges={['one','two']} >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et magna sit amet metus venenatis
                    semper sit amet in dolor. Donec venenatis purus vestibulum sodales semper. Vivamus et porta erat.
                    Phasellus in dapibus dolor, vel sagittis lacus. Mauris egestas sed tortor quis feugiat. Praesent ac
                    odio arcu. Etiam vitae pretium mi, vitae porttitor est.
                </p>
                <p>
                    Vestibulum purus turpis, blandit vitae consectetur ut, vulputate et lorem. Curabitur pellentesque
                    aliquam scelerisque. Suspendisse eu erat odio. Sed nec tristique dolor, ac cursus urna. Etiam eu
                    cursus felis. Morbi pretium diam quis lectus tempor, sit amet tincidunt neque finibus. Curabitur at
                    velit accumsan, commodo velit nec, aliquet ex. Phasellus vestibulum ultricies dui, sed eleifend nunc
                    volutpat sed. Nunc sit amet imperdiet libero, in vehicula justo. Donec eu porta nisl. Mauris
                    consectetur ut magna nec dictum. Sed vel feugiat massa, sit amet blandit ligula. Pellentesque mollis
                    neque venenatis, egestas lacus eu, venenatis lacus. In dapibus faucibus vestibulum. Pellentesque
                    venenatis erat sed rutrum gravida.
                </p>
            </Project>
        </section>;
    }
}