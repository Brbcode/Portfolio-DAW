import React from "react";
import './styles.scss'

export default class Footer extends React.Component{
    render(){
        return (
          <footer>
              <section id="author">
                  Designed and Developed by <b>Bruno García Trípoli</b>
              </section>
              <section id="copyright">
                  Copyright © 2022
              </section>
          </footer>
        );
    }
}