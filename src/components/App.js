import React from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import LoginRegister from './loginRegister/LoginRegister'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginRegister />
      </header>
    </div>
  );
}

export default App;
