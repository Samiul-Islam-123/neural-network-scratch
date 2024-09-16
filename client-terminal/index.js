import Neuron from "../ml-model/Neuron.js";
import Network from "../ml-model/Network.js";

// Sample dataset for XOR problem
const trainingData = [
    { inputs: [0, 0], target: [0] },
    { inputs: [0, 1], target: [1] },
    { inputs: [1, 0], target: [1] },
    { inputs: [1, 1], target: [0] }
];

// Define network architecture
const inputSize = 2;
const hiddenLayerSize = 4;  // Increased hidden layer size
const outputSize = 1;

// Initialize layers
const inputLayer = [];
for (let i = 0; i < inputSize; i++) {
    const neuron = new Neuron(0);  // No input weights for input layer neurons
    inputLayer.push(neuron);
}

const hiddenLayer = [];
for (let i = 0; i < hiddenLayerSize; i++) {
    const neuron = new Neuron(inputSize);
    hiddenLayer.push(neuron);
}

const outputLayer = [];
for (let i = 0; i < outputSize; i++) {
    const neuron = new Neuron(hiddenLayerSize);
    outputLayer.push(neuron);
}

const network = new Network();
// network.addLayer(inputLayer);
// network.addLayer(hiddenLayer);
// network.addLayer(outputLayer);

//network.train(trainingData, 10000); // Increase epochs if needed


network.loadModel("myModel.json");
console.log(network.predict([1,0]) > 0.5 ? 1 : 0);

//network.saveModel("myModel.json");