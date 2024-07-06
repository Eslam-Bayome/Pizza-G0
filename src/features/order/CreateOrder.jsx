import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Loader from "../../ui/Loader";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import Button from "./../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddresss = addressStatus === "loading";
  const [firstName] = useState(username || "");

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="my-20 px-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let s go!</h2>
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center">
          <label className="md:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={firstName}
            // onChange={(e) => {
            //   setFirstName(e.target.value);
            // }}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center">
          <label className="md:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" className="input w-full" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-xl bg-red-100 p-2 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" mb-5 flex flex-col justify-center gap-2 md:flex-row md:items-center">
          <label className="md:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddresss}
              defaultValue={address}
              className="input w-full "
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-xl bg-red-100 p-2 text-xs text-red-600 ">
                {errorAddress}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[3px] top-[-15px] z-20 md:top-[-13px] ">
                <Button
                  disabled={isLoadingAddresss}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-10 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 accent-yellow-300 focus:outline-none focus:ring focus:ring-yellow-200  focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          {isSubmitting || isLoadingAddresss ? (
            <Loader />
          ) : (
            <Button>Order now for {formatCurrency(totalPrice)}</Button>
          )}
        </div>
      </Form>
    </div>
  );
}
//eslint-disable-next-line
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please Give Us A Valid Phone Number To Place You Order";

  if (Object.keys(errors).length > 0) return errors;
  // Id everthing is okay , create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
