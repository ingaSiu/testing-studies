import { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import axios from 'axios';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  // option type is scoops or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
