import { useState } from 'react';

type ChildProps = {
  parentCounter: number;
};

const ChildCounter = (props: ChildProps) => {
  const [childCounter, setChildCounter] = useState<number>(0);
  const handleClickIncrement = () => {
    setChildCounter(childCounter + 1);
  };
  console.log('Rendering child component');
  return (
    <div style={{ border: '1px dashed red' }}>
      <button onClick={handleClickIncrement}>Increment child counter</button>
      <p>ChildCounter: {childCounter}</p>
      <p>ParentCounter: {props.parentCounter}</p>
    </div>
  );
};

const ParentCounter = () => {
  const [parentCounter, setParentCounter] = useState<number>(0);
  const handleClickIncrement = () => {
    setParentCounter(parentCounter + 1);
  };
  console.log('Rendering parent component');
  return (
    <div style={{ border: '1px dashed blue' }}>
      <button onClick={handleClickIncrement}>Increment parent counter</button>
      <ChildCounter parentCounter={parentCounter} />
    </div>
  );
};

const Example = () => {
  return (
    <div className="App">
      app works
      <br />
      <ParentCounter />
    </div>
  );
};

export default Example;
