import LinkBtn from "../../ui/LinkBtn";

function EmptyCart() {
  return (
    <div className="flex justify-center gap-9 px-4 py-3 pt-20">
      <LinkBtn to={"/menu"}>&larr; Back to menu</LinkBtn>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
