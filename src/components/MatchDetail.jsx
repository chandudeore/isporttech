import React, { memo, useEffect } from "react";
import { useState } from "react";
import "./MatchDetail.css";

function MatchDetail() {
  const [betSlip, setBetSlip] = useState([]);
  const [leg, setLeg] = useState([]);
  const data = JSON.parse(localStorage.getItem("bet"));

  const handleClick = () => {
    fetch("http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1")
      .then((res) => res.json())
      .then((res) => setBetSlip(res))
      .catch((err) => console.log(err));
  };

  const getLeg = () => {
    fetch("http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1")
      .then((res) => res.json())
      .then((res) => setLeg(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleClick();
    getLeg();
  }, []);

  return (
    <>
      <div>
        <div className="match">
          <div className="detail">{data.MatchName}</div>
          <div className="detail">{data.MatchDate}</div>
        </div>
        <div className="mainDiv">
          <div className="selectTag">
            <label htmlFor="bet" className="betName">
              Betslip Selection:&nbsp;&nbsp;
            </label>
            <select name="bet" id="" className="selectMain">
              {betSlip.map((item) => {
                return (
                  <>
                    <option value={item.MarketName} className="optionTag">
                      {item.MarketName}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="leg" className="betName">
              Legs: &nbsp;&nbsp;
            </label>
            <select name="leg" id="" className="selectMain">
              {leg.map((item) => {
                return (
                  <>
                    <option value={item.selectionValue}>
                      {item.selectionValue}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(MatchDetail);
