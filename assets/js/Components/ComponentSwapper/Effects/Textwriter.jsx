import IEffect from "./IEffect";
import PropTypes from "prop-types";
import React from "react";

export default class Textwriter extends IEffect{
    constructor(props) {
        super(props);
    }

    static get DEFAULTS(){
        return (
            {
                speed: 100,
                textCursor: <>█</>,
                rewriteAll: true,
            }
        );
    }

    get #options(){
        return ({
            ...Textwriter.DEFAULTS,
            ...this.props.options
        });
    }

    componentWillUnmount() {
        if(this.this.timeoutEnd)
            clearTimeout(this.timeoutEnd);
        this.timeouts.forEach(t=>clearTimeout(t));
    }

    _effect = (newValue) => {
        const from = this.#cmap(this.state.output);
        const to = this.#cmap(newValue).map((e,i)=>{
            if(typeof e === 'string')
                return <span key={i}>{e}</span>
            else if(e.key===null){
                return React.cloneElement(e,{...e.props, key: i},e.props.children);
            }
            return  e;
        });
        const output = from.map((e,i)=>{
            if(typeof e === 'string')
                return <span key={i}>{e}</span>
            else if(e.key===null){
                return React.cloneElement(e,{...e.props, key: i},e.props.children);
            }
            return  e;
        });


        this.timeouts = [];

        this.setState(v=>({
            ...v,
            output: <>{output}{this.#options.textCursor}</>,
        }));

        const startIndex =  this.#options.rewriteAll?0:(()=>{
            for(let i=0;i<output.length;i++){
                if(!Textwriter.#VisibleEqual(output[i],to[i]))
                    return i;
            }
        })();

        console.log(output);

        let step = 1;
        for (let i=output.length; i>startIndex; i--){
            this.timeouts.push(
                setTimeout(()=>{
                    const slice = output.slice(0,i);

                    this.setState(v=>({
                        ...v,
                        output: <>{slice}{this.#options.textCursor}</>,
                    }));
                },step*this.#options.speed)
            );
            step++;
        }

        for(let i=startIndex;i<=to.length;i++){
            this.timeouts.push(
                setTimeout(()=>{
                    const slice = to.slice(0,i);

                    this.setState(v=>({
                        ...v,
                        output: <>{slice}{this.#options.textCursor}</>,
                    }));
                },step*this.#options.speed)
            );
            step++;
        }
        this.timeoutEnd = setTimeout(()=>{
            this.setState(v=>({
                ...v,
                output: newValue
            }),()=>this._stop());
        },step*this.#options.speed);

    }


    static #VisibleEqual(a,b){
        const cmpA = (typeof a === "object")?a.props.children:a;
        const cmpB = (typeof b === "object")?b.props.children:b;
        return cmpA===cmpB;
    }

    #cmap = (i)=>{
        if(Array.isArray(i)){
            return i.reduce((acc,e)=>[...acc,...this.#cmap(e)],[]);
        }
        else if(typeof i === 'string') {
            return i.split('');
        }
        else if(typeof i === "object"){
            const imap = this.#cmap(i.props.children);
            return imap.map(v=>React.cloneElement(i,i.props,v));
        }
        throw `Unexpected children type: ${typeof i}`;
    }
}

Textwriter.propTypes = {
    ...IEffect.propTypes,
    options: PropTypes.shape({
        duration: PropTypes.number,
        ignoreEquals: PropTypes.bool,
    })
}

Textwriter.defaultProps = {
    ...IEffect.defaultProps,
    options: {
        ...Textwriter.DEFAULTS
    }
}