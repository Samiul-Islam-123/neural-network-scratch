import Network from "../ml-model/Network.js";
import readline from "readline";

const inputSize = 2;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const network = new Network(inputSize);

console.log('Loading model...');
network.loadModel('../test.json');

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function startPrediction() {
    const command = await askQuestion('Let\'s start prediction (press y to start): ');

    if (command === 'y') {
        while (true) {
            const xC = await askQuestion("Enter x coordinate of the point: ");
            const yC = await askQuestion("Enter y coordinate of the point: ");
            
            const x = parseFloat(xC);
            const y = parseFloat(yC);

            if (!isNaN(x) && !isNaN(y)) {
                const prediction = network.predict([x, y]);
                console.log(prediction > 0.5 ? "Point exists inside the circle" : "Point is outside the circle");
            } else {
                console.log("Invalid input. Please enter numeric values.");
            }

            const choice = await askQuestion('Wanna predict more? (Y/N): ');
            if (choice.toUpperCase() !== 'Y') {
                console.log('Exiting...');
                break;
            }
        }
    } else {
        console.log('Exiting...');
    }

    rl.close();
}

startPrediction();
