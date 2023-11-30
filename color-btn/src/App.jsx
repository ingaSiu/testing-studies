import './App.css';

import { useState } from 'react';

const App = () => {
  const [buttonColor, setButtonColor] = useState('red');

  const nextColor = buttonColor === 'red' ? 'blue' : 'red';
  return (
    <div>
      <button className={buttonColor} onClick={() => setButtonColor(nextColor)}>
        Change to {nextColor}
      </button>
    </div>
  );
};

export default App;
