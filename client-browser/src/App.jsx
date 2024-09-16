import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Visualizer from './Visualizer';

const App = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [displayNetwork ,setDisplayNetwork] = useState(true);

  const socket = io('http://localhost:3000');
  useEffect(() => {

    // if (confirm("start ? ") === true)
    //   socket.emit('send-logs');

    // Listen for training data
    socket.on('training-logs', (data) => {
      //console.log('Received training data:', data);
      // Store the received data in state
      setTrainingData(prevData => [...prevData, data]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  // Helper function to format x-axis ticks
  const formatXAxis = (tickItem) => {
    // Display every 500 epochs or as per your data
    return tickItem % 500 === 0 ? tickItem : '';
  };

  return (
    <>
    <div style={styles.container}>

      <h1 style={styles.header}>Real-Time Training Chart</h1>
      <button onClick={() => {
        const modelName = prompt("Enter model name")
        socket.emit('save', modelName);
      }}>Save model</button>

      <button onClick={() => {
        //  socket.emit('save', modelName);
        setTrainingData([])
        socket.emit('send-logs');
      }}>Train</button>

      <button onClick={()=>{
        setDisplayNetwork(!displayNetwork)
      }}>Show network</button>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={trainingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="epoch"
            tickFormatter={formatXAxis}
            angle={-45}
            textAnchor="end"
            interval={0} // Adjust based on the range and need
            />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="loss" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

    </div>
      {
        displayNetwork && (<>
          <Visualizer />
        </>)
      }
      </>
  );
};

// Simple styles to center content
const styles = {
  container: {
    height: '100vh',  // 100% of the viewport height
    width: '100vw',   // 100% of the viewport width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
};

export default App;
