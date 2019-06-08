import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './reduxStore';
import HomeScreen from './pages/HomeScreen';

function App() {

  
  return (
   <Provider store={reduxStore}>
      <HomeScreen style={{ width: '100vw', height: '100vh'}} />
   </Provider>
  );
}

export default App;
