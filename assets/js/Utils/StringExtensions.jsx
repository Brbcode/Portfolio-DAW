String.prototype.randomChar = function(){
    return this[~~(Math.random() * this.length)];
}