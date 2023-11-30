import './App.css';

import { kebabCaseToTitleCase } from './helpers';
import { useState } from 'react';

const App = () => {
  const [buttonColor, setButtonColor] = useState('medium-violet-red');
  const [disabled, setDisabled] = useState(false);

  const nextColorClass = buttonColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const classname = disabled ? 'gray' : buttonColor;
  return (
    <div>
      <button className={classname} onClick={() => setButtonColor(nextColorClass)} disabled={disabled}>
        Change to {kebabCaseToTitleCase(nextColorClass)}
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
