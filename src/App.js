import React from 'react';
import './App.css';
import ImageEditor from './components/ImageEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10">Image Editor</h1>
      <ImageEditor />
    </div>
  );
}

export default App;
