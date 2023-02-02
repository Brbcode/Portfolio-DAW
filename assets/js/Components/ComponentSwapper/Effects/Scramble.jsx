import IEffect from "./IEffect";

export default class Scramble extends IEffect{
    constructor(options={}) {
        super(options);
    }

    _effect(from, to){
        console.log(from);
        this._end();
    }
}