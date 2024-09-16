import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Set up the app and server
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

import Neuron from "../ml-model/Neuron.js";
import Network from "../ml-model/Network.js";

// Sample dataset to tell wheather a point is inside or outside a triangle or not
const trainingData = [
  { inputs: [0.5, 0.2], target: [1] },
  { inputs: [-0.7, 0.8], target: [1] },
  { inputs: [1.5, 0.6], target: [0] },
  { inputs: [-1.8, -0.2], target: [0] },
  { inputs: [0.1, -0.5], target: [1] },
  { inputs: [1.0, 0.9], target: [0] },
  { inputs: [-0.6, -0.7], target: [1] },
  { inputs: [-1.5, 1.5], target: [0] },
  { inputs: [0.3, 0.4], target: [1] },
  { inputs: [-1.9, -1.0], target: [0] }
];

// Define network architecture
const inputSize = 2;
const hiddenLayerSize = 10;  // Increased hidden layer size
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

const hiddenLayer2 = [];
for (let i = 0; i < hiddenLayerSize; i++) {
    const neuron = new Neuron(hiddenLayerSize);
    hiddenLayer2.push(neuron);
}

const outputLayer = [];
for (let i = 0; i < outputSize; i++) {
    const neuron = new Neuron(hiddenLayerSize);
    outputLayer.push(neuron);
}

const network = new Network();
network.addLayer(inputLayer);
network.addLayer(hiddenLayer);
network.addLayer(hiddenLayer2);

network.addLayer(outputLayer);



//network.saveModel("myModel.json");



io.on('connection', (socket) => {
    console.log('Client connected');
    // Start training simulation when a client connects
    socket.on('send-logs', () => {
        console.log("received.......")
        network.train(trainingData, 1000, true)
        //network.saveModel();
  })

  socket.on("save", (name)=>{
    console.log(name)
    if(name)
    network.saveModel(name);

    else
    network.saveModel();
  })

  socket.on('training-data', (logs) => {
    //console.log(`Received from Network class : ${logs}`)
    io.emit('training-logs', logs)
  })

  socket.on('disconnect', (socket)=>{
    console.log("Client disconnected")
  })

});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});


