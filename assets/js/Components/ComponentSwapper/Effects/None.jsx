import IEffect from './IEffect';

export default class None extends IEffect {
  _effect = (newValue) => {
    this.setState((v) => ({
      ...v,
      output: newValue,
      running: false,
    }));
  };
}
