import React from 'react';
import './App.css';
import SkillContainer from './components/SkillContainer';

function App() {
  return (
    <div className="tasks">
      
      <div className="App">
        <div className="header">The Skill you have</div>
        <SkillContainer/>
      </div>
    </div>
  );
}

export default App;
