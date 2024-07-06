import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function Deleteitem({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <React.Fragment>
      <Button onClick={handleDeleteItem} type="small">
        Delete
      </Button>
    </React.Fragment>
  );
}

export default Deleteitem;
