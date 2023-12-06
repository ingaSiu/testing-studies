import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useOrderDetails } from '../../contexts/OrderDetails';

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, 'toppings');
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '50%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
