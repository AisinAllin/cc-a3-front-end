import React, { useState, useEffect } from "react";
import * as apiUtils from "../../apiUtil/apiUtil";
import ItemCard from "../itmeCard/ItemCard";
import "./HomePage.css";

const HomePage = () => {
  const [popMusIns, setPopMusIns] = useState([]);
  const [flag, setFlag] = useState(0);

  const getMusicIns = async () => {
    try {
      const getPopularMusicInsRes = await apiUtils.getPopularMusicIns();
      if (getPopularMusicInsRes.status === 200) {
        setPopMusIns(getPopularMusicInsRes.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMusicIns();
  }, [flag]);

  popMusIns.sort((a, b) => a.name.localeCompare(b.name, "zh"));

  return (
    <div>
      <h1>Popular Product</h1>
      <div className="pop_muisic_ins_box">
        {popMusIns.map((e) => (
          <ItemCard item={e} flag={flag} setFlag={setFlag} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
