import React from "react";
import classNames from "classnames";
import LazyImage, {LoadMode} from "../LazyImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faHouse } from '@fortawesome/free-solid-svg-icons';
import './notfound.scss';
import {Link, useNavigate} from "react-router-dom";

const messyDesk = require.context('../../../images/sets/', true, /messy-desk-(300|768|1280)w\.png$/);
const plant = require.context('../../../images/sets/', true, /plant-(300|768|1280)w\.png$/);
const floatWeb = require.context('../../../images/sets/', true, /float-web-(300|768|1280)w\.png$/);
const floatCode = require.context('../../../images/sets/', true, /float-code-(300|768|1280)w\.png$/);
const paperFall = require.context('../../../images/sets/', true, /paper-fall-(300|768|1280)w\.gif$/);
const contexts = {messyDesk,plant,floatWeb,floatCode,paperFall};

class NotFoundComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            illustrationState: Object.keys(contexts).reduce((acc,key)=>({
                ...acc,
                [key]: false
            }),{}),
            illustrationLandscape: null,
        }

        this.secRef = React.createRef();
        this.picRef = React.createRef();
    }

    componentDidMount() {
        this.resizeObserver = new ResizeObserver((entries)=>{
            const [entry] = entries;
            const landscape = entry.target.offsetWidth > entry.target.offsetHeight;
            if(this.state.illustrationLandscape!==landscape){
                this.setState((v)=>({
                    ...v,
                    illustrationLandscape: landscape
                }));
            }
        });

        this.resizeObserver.observe(this.secRef.current);
    }

    componentWillUnmount() {
        this.resizeObserver?.disconnect();
    }

    static #unpackContext(context){
        return context.keys().map((i) => ({
            path: i,
            size: ~~i.match(/([0-9]+w)(?!.*\1)/g)[0].slice(0, -1),
        })).sort((a, b) => a.size - b.size);
    }

    render(){

        const landscape = this.state.illustrationLandscape;
        const loading = !Object.keys(this.state.illustrationState)
            .reduce((acc,key)=>acc||this.state.illustrationState[key],false);
        return (
          <section id='not-found'>
              <section className='text'>
                  <h1>
                      <em>Whoops!</em>
                      <br />
                      I can<em>'</em>t find what are you looking for.
                  </h1>
                  <nav>
                      <button onClick={() => this.props.navigation(-1)}>
                          <span>Back</span>
                          {' '}
                          <FontAwesomeIcon icon={faReply} />
                      </button>
                      <Link to='/'>
                          <span>Go Home</span>
                          {' '}
                          <FontAwesomeIcon icon={faHouse} />
                      </Link>
                  </nav>
              </section>
              <section ref={this.secRef} className={classNames('illustration',{loading},{landscape})}>
                  <picture ref={this.picRef} >
                      {Object.keys(contexts).map((key)=>{
                          const context = contexts[key];
                          const unpack = NotFoundComponent.#unpackContext(context);
                          return <LazyImage
                              key={key}
                              className={key}
                              sources={
                                  unpack.map(({path,size})=>({
                                      label: `${size}w`,
                                      path: context(path)
                                  }))
                              }
                              onLoad={()=>{
                                  this.setState(v=>{
                                      const illustrationState = v.illustrationState;
                                      illustrationState[key] = true;
                                      return ({
                                          ...v,
                                          illustrationState
                                      });
                                  });
                              }}
                              loadMode={LoadMode.LAZY}
                          />;
                      })}
                  </picture>
              </section>
          </section>
        );
    }
}


function NotFound(){
    const navigation = useNavigate();
    return <NotFoundComponent navigation={navigation} />
}

export default NotFound;