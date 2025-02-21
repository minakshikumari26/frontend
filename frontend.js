import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "ABCD123"; // Set your roll number here
  }, []);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      const res = await fetch('https://your-backend-url/bfhi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
        {selectedOptions.includes('Highest Alphabet') && <div>Highest Alphabet: {highest_alphabet.join(', ')}</div>}
      </div>
    );
  };

  const options = [
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Highest Alphabet', label: 'Highest Alphabet' },
  ];

  return (
    <div>
      <h1>API Input</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON here'
        rows="4"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <Select
          isMulti
          options={options}
          onChange={(selected) => setSelectedOptions(selected.map(option => option.value))}
        />
      )}
      {renderResponse()}
    </div>
  );
}

export default App;