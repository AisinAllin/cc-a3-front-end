import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import * as apiUtils from "../../apiUtil/apiUtil";
import "./ItemCard.css";

const ItemCard = ({ item, flag, setFlag }) => {
  const {
    added,
    musicId,
    userId,
    type,
    name,
    num_left,
    price,
    count,
    description,
  } = item;

  const [add, setAdd] = useState({
    status: added,
  });
  const [url, setUrl] = useState();

  const numRequire = 1;
  const imgUrl = "https://cc-a3-img.s3.ap-southeast-2.amazonaws.com/2";

  const addCart = async () => {
    const cartRes = await apiUtils.addToCart({ musicId, userId, numRequire });
    if (cartRes.status === 200) {
      setFlag(flag + 1);
      updateStatus();
    }
  };
  const updateStatus = async () => {
    const upDateAddedRes = await apiUtils.updateCartStatus({ musicId });
    if (upDateAddedRes.status === 200) {
      setAdd({ status: true });
      setFlag(flag + 1);
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
  }, [flag]);

  return (
    <div className="Item_box">
      <div className="card_item">
        <h3>{name}</h3>
      </div>
      <div className="card_item">
        <div className="img_box">
          <img className="imgItem" src={url}></img>
        </div>
      </div>
      <div className="card_item">
        <div>
          {price}
          <span className="price_tag"> $AUD</span>
        </div>
      </div>
      <div className="card_item">
        <div>{description}</div>
      </div>
      <div className="card_item">
        <Button
          disabled={add.status}
          onClick={addCart}
          variant="contained"
          color="primary"
        >
          Add to Cart
        </Button>
        <span className="instock_content">
          &nbsp;&nbsp;&nbsp;&nbsp;In Stock: {num_left}
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
