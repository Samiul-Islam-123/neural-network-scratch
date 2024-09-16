import { xavierInitialization, heInitialization } from "./Operations.js";

class Neuron {
    constructor(inputSize){
        this.weights = Array(inputSize).fill(0).map(() => heInitialization(inputSize));
        this.bias = Math.random();
        this.velocity = Array(this.weights.length).fill(0);
        this.m = Array(this.weights.length).fill(0);
        this.v = Array(this.weights.length).fill(0);
        this.mBias = 0;
        this.vBias = 0;
    }
}

export default Neuron;
