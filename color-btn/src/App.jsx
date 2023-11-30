import './App.css';

import { useState } from 'react';

const App = () => {
  const [buttonColor, setButtonColor] = useState('red');
  const [disabled, setDisabled] = useState(false);

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  const classname = disabled ? 'gray' : buttonColor;
  return (
    <div>
      <button className={classname} onClick={() => setButtonColor(newButtonColor)} disabled={disabled}>
        Change to {newButtonColor}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
};

export default App;
