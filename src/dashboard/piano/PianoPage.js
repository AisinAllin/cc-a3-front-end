import React, { useState, useEffect } from "react";
import * as apiUtils from "../../apiUtil/apiUtil";
import ItemCard from "../itmeCard/ItemCard";
import "./PianoPage.css";

const DrumPage = () => {
  const [popMusIns, setPopMusIns] = useState([]);
  const [flag, setFlag] = useState(0);

  const type = "Piano";
  const getMusicInsByType = async () => {
    try {
      const getPopularMusicInsRes = await apiUtils.getMusicInsByType({ type });
      if (getPopularMusicInsRes.status === 200) {
        setPopMusIns(getPopularMusicInsRes.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMusicInsByType();
  }, [flag]);
  return (
    <div>
      <h1>Piano</h1>
      <div className="pop_muisic_ins_box">
        {popMusIns.map((e) => (
          <ItemCard item={e} flag={flag} setFlag={setFlag} />
        ))}
      </div>
    </div>
  );
};

export default DrumPage;
