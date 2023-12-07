import Button from 'react-bootstrap/Button';
import Options from './Options';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  // disable order button if there aren't any scoops in order
  const orderDisabled = totals.scoops === 0;
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
