import IEffect from "./IEffect";
import PropTypes from "prop-types";
import React from "react";
import '../../../Utils/StringExtensions';

export default class Scramble extends IEffect{

    constructor(props) {
        super(props);
    }

    static get DEFAULTS(){
        return (
            {
                duration: 1000,
                letters: '!<>-_\\/[]{}—=+*^?#@!·()$~_',
                wrapperClass: '',
                ignoreEquals: false,
            }
        );
    }

    get #options(){
        return ({
            ...Scramble.DEFAULTS,
            ...this.props.options
        });
    }

    componentWillUnmount() {
        if(this.timeoutEnd){
            clearTimeout(this.timeoutEnd);
        }
        this.timeouts?.forEach(({begin,end})=>{
           clearTimeout(begin);
           clearTimeout(end);
        });
    }

    _effect = (newValue)=>{
        const from = this.#cmap(this.state.output);
        const to = this.#cmap(newValue);
        const maxLength = Math.max(from.length,to.length);
        const output = this.#cresize(from,maxLength);
        const {duration,wrapperClass,ignoreEquals} = this.#options;

        this.timeoutEnd = setTimeout(()=>{
            this.setState(v=>({
                ...v,
                output: newValue
            }),()=>this._stop());
        },duration+1);
        this.timeouts = [];

        output.forEach((element,index)=>{
            const beginDelay = (Math.random() * duration) / 2;
            const endDelay = beginDelay + (Math.random() * (duration - beginDelay));
            const char = this.#options.letters.randomChar();

            const wrapChar = <span key={index} className={wrapperClass} >{char}</span>

            if(ignoreEquals && Scramble.#VisibleEqual(from[index],to[index])){
                return;
            }


            this.timeouts.push({
               begin: setTimeout(()=>{
                   output[index] = wrapChar;
                   this.setState(v=>({
                       ...v,
                       output: output.map((e,i)=> {
                           if(typeof e === 'string')
                               return <span key={i}>{e}</span>
                           else if(e?.key===null){
                               return React.cloneElement(e,{...e.props, key: i},e.props.children);
                           }
                           return  e;
                       }),
                   }));
               },beginDelay),
               end: setTimeout(()=>{
                   output[index] = to[index]??null;
                   this.setState(v=>({
                       ...v,
                       output: output.map((e,i)=> {
                           if(typeof e === 'string')
                               return <span key={i}>{e}</span>
                           else if(e?.key===null){
                               return React.cloneElement(e,{...e.props, key: i},e.props.children);
                           }
                           return  e;
                       }),
                   }));
               },endDelay)
            });
        })
    }

    static #VisibleEqual(a,b){
        const cmpA = (typeof a === "object")?a.props.children:a;
        const cmpB = (typeof b === "object")?b.props.children:b;
        return cmpA===cmpB;
    }

    #cresize = (arr,length)=>{
        const ret = [...arr];
        let delta = length - arr.length;

        while (delta-- > 0){ret.push(' ');}
        return ret;
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

Scramble.propTypes = {
    ...IEffect.propTypes,
    options: PropTypes.shape({
        duration: PropTypes.number,
        letters: PropTypes.string,
        wrapperClass: PropTypes.string,
        ignoreEquals: PropTypes.bool,
    })
}

Scramble.defaultProps = {
    ...IEffect.defaultProps,
    options: {
        ...Scramble.DEFAULTS
    }
}