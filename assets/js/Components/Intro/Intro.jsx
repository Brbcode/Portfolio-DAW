import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand } from '@fortawesome/free-solid-svg-icons';
import LazyImage, {LoadMode} from "../LazyImage";
import './style.scss';
import classNames from "classnames";
import ComponentSwapper, {Effects} from "../ComponentSwapper/ComponentSwapper";

const desk = require.context('../../../images/sets/',true,/desk-(300|768|1280)w\.png$/);
const plant = require.context('../../../images/sets/', true, /plant-(300|768|1280)w\.png$/);
const floatWeb = require.context('../../../images/sets/', true, /float-web-(300|768|1280)w\.png$/);
const floatCode = require.context('../../../images/sets/', true, /float-code-(300|768|1280)w\.png$/);
const contexts = {desk,plant,floatWeb,floatCode};

export default class Intro extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            illustrationState: Object.keys(contexts).reduce((acc,key)=>({
                ...acc,
                [key]: false
            }),{}),
            illustrationLandscape: null,
            msgIndex: 0
        }

        this.swapper = React.createRef();
        this.secRef = React.createRef();
        this.picRef = React.createRef();
    }

    get #swapperData(){
        return ([
            {
                message: <>Developer Front End</>,
                effect: {effect: Effects.Scramble, options:{wrapperClass: 'letter'}}
            },
            {
                message: <>Developer Back End</>,
                effect: {effect: Effects.Textwriter, options:{speed: 100, rewriteAll: false, textCursor:<span className='cursor'>█</span>}}
            },
            {
                message: <>Developer Full Stack</>,
                effect: {effect: Effects.Textwriter, options:{speed: 100, rewriteAll: false, textCursor:<span className='cursor'>█</span>}}
            },
            {
                message: <>Open Source Contributor</>,
                effect: {effect: Effects.Scramble, options:{wrapperClass: 'letter'}}
            }
        ]);
    }

    static #unpackContext(context){
        return context.keys().map((i) => ({
            path: i,
            size: ~~i.match(/([0-9]+w)(?!.*\1)/g)[0].slice(0, -1),
        })).sort((a, b) => a.size - b.size);
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

        this.interval = setInterval(()=>{
            //console.log(this.#swapperData[this.state.msgIndex]);
            this.setState(v=>({
                ...v,
                msgIndex: (v.msgIndex+1)%this.#swapperData.length,
            }),()=>{
                this.swapper.current.swap(this.#swapperData[this.state.msgIndex].message);
            });
        },4000);
    }

    componentWillUnmount() {
        this.resizeObserver?.disconnect();
        clearInterval(this.interval);
    }

    render() {
        const landscape = this.state.illustrationLandscape;
        const loading = !Object.keys(this.state.illustrationState)
            .reduce((acc,key)=>acc||this.state.illustrationState[key],false);
        return (<>
            <section id='intro'>
                <section className='text'>
                    <h1>
                        <em>Hi</em>
                        &nbsp;
                        There <FontAwesomeIcon icon={faHand} className='fa-wave'/>
                    </h1>
                    <h2>
                        I
                        <em>&apos;</em>
                        m
                        {' '}
                        <em>Bruno García</em>
                    </h2>
                    <p>
                        <ComponentSwapper ref={this.swapper} {...this.#swapperData[this.state.msgIndex].effect} >
                            {this.#swapperData[0].message}
                        </ComponentSwapper>
                    </p>
                </section>
                <section ref={this.secRef} className={classNames('illustration',{loading},{landscape})}>
                    <picture ref={this.picRef} >
                        {Object.keys(contexts).map((key)=>{
                            const context = contexts[key];
                            const unpack = Intro.#unpackContext(context);
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
        </>);
    }
}