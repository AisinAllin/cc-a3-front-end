import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as apiUtils from "../../apiUtil/apiUtil";
import "./CartItem.css";

const ItemCard = ({ item, edit, count, setCount }) => {
  const { cartId, musicId, userId, name, numRequire, price, numLeft } = item;
  const [num, setNum] = useState({
    numReq: numRequire,
  });
  const [warn, setWarn] = useState({
    show: false,
    info: "",
  });
  const [url, setUrl] = useState();

  const { numReq } = num;

  const imgUrl =
    "https://cc-a3-img.s3.ap-southeast-2.amazonaws.com/DW+COLLECTORS+-+CREME+OYSTER.png";

  const handledelete = async () => {
    const removeItemRes = await apiUtils.removeCart({ cartId });
    if (removeItemRes.status === 200) {
      handledRemoveStatus();
      setCount(count + 1);
    }
  };

  const handledRemoveStatus = async () => {
    const removeStatusRes = await apiUtils.updateCartStatusToFalse({ musicId });

    if (removeStatusRes.status === 200) {
      setCount(count + 1);
    }
  };

  const updateNumReq = async () => {
    const updateNum = await apiUtils.updateNum({ cartId, numReq });
    if (updateNum.status === 200) {
    }
  };

  const getMusicImgUrl = async () => {
    try {
      const getMusicImgUrlRes = await apiUtils.getMusicImgUrl({ musicId });
      if (getMusicImgUrlRes.status === 200) {
        setUrl(getMusicImgUrlRes.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMusicImgUrl();
  }, []);

  const handleAdd = () => {
    if (numReq < numLeft) {
      setCount(count + 1);

      setNum({
        numReq: num.numReq + 1,
      });
    } else {
      setWarn({
        show: true,
        info: "The maximum inventory has been reached!",
      });
    }
  };

  const handleRemove = () => {
    setWarn({
      show: false,
      info: "",
    });
    if (num.numReq > 1) {
      setCount(count - 1);

      setNum({
        numReq: num.numReq - 1,
      });
    }
  };

  useEffect(() => {
    updateNumReq();
  }, [numReq, count]);

  return (
    <div className="cart_item_box">
      <div className="cart_item">
        <div className="instock_content">Name: </div>
        <div>{name}</div>
      </div>
      <div className="cart_item">
        <div className="cart_img">
          <img className="cartimgItem" src={url}></img>
        </div>
      </div>
      <div className="cart_item">
        <div>
          <div className="instock_content">Unit Price: </div>
          {price} <span className="price_tag"> $AUD</span>
        </div>
      </div>

      <div className="cart_item">
        <div className="instock_content">Number: </div>
        <AddIcon className="num_icon" onClick={handleAdd} />
        &nbsp;&nbsp;
        <span className="num">{numReq}</span>
        &nbsp;&nbsp;
        <RemoveIcon className="num_icon" onClick={handleRemove} />
        {warn ? <div className="warn_info">{warn.info}</div> : null}
      </div>
      <div className="cart_item">
        <div className="instock_content">Total Price: </div>
        <div>{price * numReq} $AUD</div>
      </div>
      <div className="cart_item">
        {edit ? (
          <Button variant="contained" className="button" onClick={handledelete}>
            <DeleteTwoToneIcon color="secondary" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ItemCard;
