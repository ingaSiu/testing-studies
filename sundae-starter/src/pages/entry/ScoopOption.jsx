import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useState } from 'react';

const ScoopOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const currentValue = e.target.value;

    // make sure we're using a number and not string to validate
    const currentValueFloat = parseFloat(currentValue);

    // check if value is valid (not negative, less than 10, doesnt have a decimal)
    const valueIsValid =
      0 <= currentValueFloat && currentValueFloat <= 10 && Math.floor(currentValueFloat) === currentValueFloat;

    // validate
    setIsValid(valueIsValid);

    updateItemCount(name, parseInt(currentValue), 'scoops');
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange} isInvalid={!isValid} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;

// isInvalid={!isValid} => this prop is going to be oppsite from isValid value
// if isValid= true, then isInvalid= false
