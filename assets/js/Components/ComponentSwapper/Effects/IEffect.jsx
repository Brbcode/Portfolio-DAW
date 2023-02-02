export default class IEffect{
    #endSwapping;
    constructor(options) {
        this.options = options;
        this.#endSwapping = false;
    }

    #start(){
        const ref = this;
        this.swapping(true,()=>{
            new Promise((resolve)=> {
                (function waitForEnd(){
                    if(ref.#endSwapping) return resolve();
                    setTimeout(waitForEnd,30);
                })();
            }).then(()=>{
                this.swapping(false,()=>{
                    ref.#endSwapping=false;
                });
            });
        });
    }

    swap(from, to){
        this.#start();
        this._effect(from,to);
    }

    _end(){
        this.#endSwapping = true;
    }

    _effect(from, to){
        throw new Error("Abstract Method has no implementation");
    }
}