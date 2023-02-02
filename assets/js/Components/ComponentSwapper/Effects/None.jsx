import IEffect from "./IEffect";

export default class None extends IEffect{
    constructor() {
        super({});
    }

    _effect(from, to) {
        this.output(to);
        this._end();
    }
}