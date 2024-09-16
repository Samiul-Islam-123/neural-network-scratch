## Neural Network Scratch: Building and Visualizing Neural Networks from Scratch

This codebase provides a comprehensive exploration of building and visualizing neural networks from scratch. It's designed to be both educational and practical, allowing you to learn the fundamentals of neural networks and experiment with them in a real-world context.

**Project Structure:**

The project is divided into three main components:

1. **Client-Browser:** A React application responsible for the user interface, allowing you to interact with and visualize the neural network.
2. **Client-Terminal:** A command-line interface (CLI) for interacting with the neural network model (more on this below).
3. **ML-Model:** The core of the project, where the neural network is implemented in JavaScript.

**Client-Browser (client-browser folder):**

* **`eslint.config.js`:** Configuration file for ESLint, a linter for JavaScript code.
* **`index.html`:** The entry point for the React application.
* **`package-lock.json`:**  A file that locks down the dependencies of the project, ensuring consistent behavior across different machines.
* **`package.json`:** Contains metadata about the project, such as dependencies, scripts, and author information.
* **`public/vite.svg`:** A simple SVG icon used in the client-browser application.
* **`README.md`:** A README file with information about the client-browser application.
* **`src/App.css`:** CSS styles for the React application.
* **`src/App.jsx`:** The main component of the React application, handling user interactions and displaying the neural network.
* **`src/assets/react.svg`:** An SVG icon of the React logo.
* **`src/index.css`:** Global CSS styles for the React application.
* **`src/main.jsx`:** The entry point for the React application.
* **`src/Visualizer.jsx`:** A React component responsible for visualizing the neural network's structure and activation values.
* **`vite.config.js`:**  Configuration file for Vite, a fast development server and build tool for front-end development.

**Client-Terminal (client-terminal folder):**

* **`index.js`:** The entry point for the client-terminal application.
* **`test.js`:**  An example file demonstrating how to use the neural network model from the command line.

**ML-Model (ml-model folder):**

* **`Network.js`:** Defines the `Network` class, which represents a complete neural network. It handles layer creation, forward propagation, backpropagation, and training.
* **`Neuron.js`:** Defines the `Neuron` class, representing an individual neuron within a neural network. It manages activation functions and weights.
* **`Operations.js`:** Defines helper functions for common mathematical operations used in neural networks, such as matrix multiplication, dot products, and activation function calculations.

**Server (server folder):**

* **`index.js`:**  A simple server that serves the client-browser application. It may also handle communication with the client-terminal, depending on the implementation.

**Package-lock.json and package.json:**

* **`package-lock.json`:** This file ensures consistent project dependencies across development environments.
* **`package.json`:** This file contains details about the project's dependencies, scripts (like `npm start` for running the client-browser application), and other metadata.

**Overall Functionality:**

This codebase allows you to build and experiment with neural networks from scratch. The client-browser application provides a visual interface to:

* **Define the neural network architecture:** Specify the number of layers, neurons in each layer, and activation functions.
* **Train the network:** Provide training data and observe the learning process.
* **Visualize the network:** Observe the structure and activation values of the network during training and prediction.

The client-terminal application allows you to interact with the neural network model from the command line:

* **Create and configure a network.**
* **Train the network on data.**
* **Make predictions with the trained network.**

This codebase aims to offer a practical understanding of how neural networks function, providing you with the tools to explore and experiment with their capabilities. It is intended for anyone wanting to gain a deeper understanding of neural networks and machine learning.
