import { useSelector } from "react-redux";
import { formatCurrency } from "./../../utils/helpers";
import Deleteitem from "./Deleteitem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuatityByID } from "./cartSlice";

function CartItem({ item }) {
  // import { formatCurrency } from './../../../starter/helpers';
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuatityByID(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-5">
        <p className=" pt-4 text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <Deleteitem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
