import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import CardList from './components/CardList';
import Editor from './components/Editor';
import Preview from './components/Preview';

function App() {
  return (
    <div className="App">
      <Navigation />
      <CardList />
      <Editor />
      <Preview />
    </div>
  );
}

export default App;
