export function dotProduct(vectorA, vectorB){
    if(vectorA.length !== vectorB.length){
        throw new Error("Vectors should have the same length for dot product");
    }
    return vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
}

export function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

export function relu(x) {
    return Math.max(0, x);
}

export function xavierInitialization(inputsLength) {
    return Math.random() * (2 / Math.sqrt(inputsLength)) - (1 / Math.sqrt(inputsLength));
}

export function heInitialization(inputsLength) {
    return Math.random() * Math.sqrt(2 / inputsLength);
}

export function sigmoidDerivative(x) {
    const sigmoidValue = sigmoid(x);
    return sigmoidValue * (1 - sigmoidValue);
}

export function reluDerivative(x) {
    return x > 0 ? 1 : 0;
}

export function binaryCrossEntropyLoss(predicted, original) {
    const epsilon = 1e-15;
    predicted = Math.max(epsilon, Math.min(1 - epsilon, predicted));
    return -original * Math.log(predicted) - (1 - original) * Math.log(1 - predicted);
}

export function binaryCrossEntropyLossDerivative(predicted, original) {
    const epsilon = 1e-15;
    predicted = Math.max(epsilon, Math.min(1 - epsilon, predicted));
    return (predicted - original) / (predicted * (1 - predicted));
}

export function calculateOutput(inputs, weights, bias, activationFunction) {
    const product = dotProduct(inputs, weights);
    return activationFunction(product + bias);
}
