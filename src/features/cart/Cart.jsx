import { useDispatch, useSelector } from "react-redux";
import LinkBtn from "../../ui/LinkBtn";
import Button from "./../../ui/Button";
import CartItem from "./CartItem";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.userName);

  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkBtn to={"/menu"}>&larr; Back to menu</LinkBtn>

      <h2 className="mt-7 text-xl font-semibold">
        Your Cart, {username.toUpperCase()}
      </h2>

      <ul className="mt-3 divide-y divide-stone-300 border-b">
        {cart.map((item, ind) => (
          <CartItem item={item} key={ind} />
        ))}
      </ul>
      <div className="mt-6 space-x-4">
        <Button to="/order/new"> Order pizzas</Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
