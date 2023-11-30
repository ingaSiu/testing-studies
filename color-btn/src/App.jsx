import './App.css';

import { useState } from 'react';

const App = () => {
  const [buttonColor, setButtonColor] = useState('red');
  const [disabled, setDisabled] = useState(false);

  const nextColor = buttonColor === 'red' ? 'blue' : 'red';
  return (
    <div>
      <button className={buttonColor} onClick={() => setButtonColor(nextColor)} disabled={disabled}>
        Change to {nextColor}
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
