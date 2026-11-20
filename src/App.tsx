import { useState, useEffect, type ChangeEvent } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('#9921ff');
  const [result, setResult] = useState('rgb(153, 33, 255)');
  const [backgroundColor, setBackgroundColor] = useState('#9921ff');

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor; 
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [backgroundColor]);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newColor = event.target.value;
    setColor(newColor);

    if (newColor.length < 7) {
      return;
    } else if (newColor.length === 7 && isValidHex(newColor)) {
      setResult(hexToRgb(newColor));
      setBackgroundColor(newColor);
      return;
    } else {
      setResult('Ошибка!');
      setBackgroundColor('#FF0000');
      return;
    }
  }

  function hexToRgb(hex: string): string {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);  

    return `rgb(${red}, ${green}, ${blue})`;

  }

  function isValidHex(hex: string): boolean {
    const hexPattern = /^#[0-9a-fA-F]{6}$/;

    return hexPattern.test(hex)
  }

  return (
    <label className="container">
      <input 
        type="text" 
        className="input-field"
        placeholder="Введите код цвета..."
        value={color}
        onChange={handleColorChange}
      />

      <span className={result === 'Ошибка!' ? 'result error' : 'result'}>
        {result}
      </span>
    </label>
  )
}

export default App
