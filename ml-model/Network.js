import { binaryCrossEntropyLoss, binaryCrossEntropyLossDerivative, calculateOutput, sigmoidDerivative, relu, reluDerivative, sigmoid, xavierInitialization, heInitialization } from "./Operations.js";
import fs from "fs";
import Neuron from "./Neuron.js";
import { io } from "socket.io-client";

class Network {
    constructor(learningRate = 0.01, beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8) {
        this.layers = [];
        this.learningRate = learningRate;
        this.beta1 = beta1;
        this.beta2 = beta2;
        this.epsilon = epsilon;
        this.t = 0;
    }

    addLayer(neurons) {
        this.layers.push(neurons);
    }

    forwardPropagation() {
        for (let i = 1; i < this.layers.length; i++) {
            const currentLayer = this.layers[i];
            for (let j = 0; j < currentLayer.length; j++) {
                const neuron = currentLayer[j];
                const previousLayerOutputs = this.layers[i - 1].map(neuron => neuron.output);
                neuron.output = calculateOutput(previousLayerOutputs, neuron.weights, neuron.bias, i === this.layers.length - 1 ? sigmoid : relu);
            }
        }
    }

    backpropagation(targets) {
        const outputLayer = this.layers[this.layers.length - 1];

        // Calculating gradients for output layer
        for (let j = 0; j < outputLayer.length; j++) {
            const neuron = outputLayer[j];
            neuron.gradient = binaryCrossEntropyLossDerivative(neuron.output, targets[j]);
        }

        // Backpropagating to hidden layers
        for (let i = this.layers.length - 2; i > 0; i--) {
            const currentLayer = this.layers[i];
            const nextLayer = this.layers[i + 1];

            for (let j = 0; j < currentLayer.length; j++) {
                const neuron = currentLayer[j];
                const sumOfGradients = nextLayer.reduce((acc, nextNeuron, k) => acc + nextNeuron.weights[j] * nextNeuron.gradient, 0);
                neuron.gradient = sumOfGradients * (i === this.layers.length - 2 ? sigmoidDerivative(neuron.output) : reluDerivative(neuron.output));
            }
        }

        // Updating weights and biases with Adam optimizer
        for (let i = 1; i < this.layers.length; i++) {
            const layer = this.layers[i];
            const previousLayerOutputs = this.layers[i - 1].map(neuron => neuron.output);

            for (const neuron of layer) {
                this.updateWeightsAdam(neuron, previousLayerOutputs);
            }
        }
    }

    updateWeightsAdam(neuron, previousLayerOutputs) {
        this.t += 1;

        for (let k = 0; k < neuron.weights.length; k++) {
            neuron.m[k] = this.beta1 * neuron.m[k] + (1 - this.beta1) * neuron.gradient * previousLayerOutputs[k];
            neuron.v[k] = this.beta2 * neuron.v[k] + (1 - this.beta2) * Math.pow(neuron.gradient * previousLayerOutputs[k], 2);

            const mHat = neuron.m[k] / (1 - Math.pow(this.beta1, this.t));
            const vHat = neuron.v[k] / (1 - Math.pow(this.beta2, this.t));

            neuron.weights[k] -= this.learningRate * mHat / (Math.sqrt(vHat) + this.epsilon);
        }

        neuron.mBias = this.beta1 * neuron.mBias + (1 - this.beta1) * neuron.gradient;
        neuron.vBias = this.beta2 * neuron.vBias + (1 - this.beta2) * Math.pow(neuron.gradient, 2);

        const mHatBias = neuron.mBias / (1 - Math.pow(this.beta1, this.t));
        const vHatBias = neuron.vBias / (1 - Math.pow(this.beta2, this.t));

        neuron.bias -= this.learningRate * mHatBias / (Math.sqrt(vHatBias) + this.epsilon);
    }

    train(trainingData, epochs, logs = false) {
        console.log("Training initiated...");
            const socket = io(`http://localhost:3000`);

        for (let epoch = 0; epoch < epochs; epoch++) {
            let totalLoss = 0;
            let correctPredictions = 0;

            for (const { inputs, target } of trainingData) {
                this.layers[0].forEach((neuron, index) => neuron.output = inputs[index]);

                this.forwardPropagation();

                const outputLayer = this.layers[this.layers.length - 1];
                let loss = 0;
                let correct = 0;
                for (let i = 0; i < outputLayer.length; i++) {
                    loss += binaryCrossEntropyLoss(outputLayer[i].output, target[i]);
                    if (Math.round(outputLayer[i].output) === target[i]) {
                        correct++;
                    }
                }
                totalLoss += loss;
                correctPredictions += correct;

                this.backpropagation(target);
            }

            const accuracy = (correctPredictions / trainingData.length) ;
            if(logs === true){

                
                socket.emit("training-data",({
                    epoch : epoch,
                    loss : (totalLoss / trainingData.length),
                    accuracy : accuracy
                }))
                   

            }
            console.log(`Epoch ${epoch + 1}/${epochs}, Loss: ${totalLoss / trainingData.length}, Accuracy: ${accuracy.toFixed(2)}%`);
        }
    }

  

    predict(inputs) {
        // Set input layer outputs
        this.layers[0].forEach((neuron, index) => neuron.output = inputs[index]);
    
        // Forward propagation
        this.forwardPropagation();
    
        // Get output from the final layer
        const outputLayer = this.layers[this.layers.length - 1];
        return outputLayer.map(neuron => neuron.output);
    }

    saveModel(filename = "model.json") {
        const modelData = this.layers.map(layer => 
            layer.map(neuron => ({
                weights: neuron.weights,
                bias: neuron.bias
            }))
        );
    
        fs.writeFileSync(filename, JSON.stringify(modelData, null, 2));
        console.log(`Model saved to ${filename}`);
    }
    
    // Load Model Function
    loadModel(filename = "model.json") {
        const modelData = JSON.parse(fs.readFileSync(filename, 'utf8'));
        
        this.layers = modelData.map(layerData => {
            return layerData.map(neuronData => {
                const neuron = new Neuron(neuronData.weights.length);
                neuron.weights = neuronData.weights;
                neuron.bias = neuronData.bias;
                return neuron;
            });
        });
        console.log(`Model loaded from ${filename}`);
    }

    display() {
        console.log(this.layers);
    }
}

export default Network;
