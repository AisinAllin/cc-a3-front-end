import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as apiUtils from "../../apiUtil/apiUtil";
import CartItem from "./CartItem";

const Cart = () => {
  const history = useHistory();
  const [cartList, setCartList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);

  const handleBack = () => {
    history.push("/dashboard");
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const getCartList = async () => {
    const id = localStorage.getItem("userId");

    const cartListRes = await apiUtils.getCartList({ id });
    if (cartListRes.status === 200) {
      setCartList(cartListRes.data);
    }
  };

  const getTotalPrice = async () => {
    const id = localStorage.getItem("userId");
    const totalPriceRes = await apiUtils.getTotalPrice({ id });
    if (totalPriceRes.status === 200) {
      setTotalPrice(totalPriceRes.data);
    }
  };
  useEffect(() => {
    getCartList();
    getTotalPrice();
  }, [count]);

  cartList.sort((a, b) => a.name.localeCompare(b.name, "zh"));

  return (
    <div>
      <h1>cart page</h1>
      <Button variant="contained" className="button" onClick={handleEdit}>
        {edit ? "cancel" : "Edit"}
      </Button>
      {cartList.map((e) => (
        <CartItem
          key={e}
          item={e}
          edit={edit}
          count={count}
          setCount={setCount}
        />
      ))}
      <div className="sum_area">
        <div className="sun_item">
          <Button variant="contained" className="button" onClick={handleBack}>
            Back
          </Button>
        </div>
        <div className="sun_item">
          Total Price: &nbsp;&nbsp;
          <span className="total_price">{totalPrice} $AUD &nbsp;&nbsp;</span>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleBack}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
