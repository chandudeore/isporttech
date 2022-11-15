import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./MatchDetail.css";

function MatchDetail() {
  // const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [betSlip, setBetSlip] = useState([]);
  const [leg, setLeg] = useState([]);
  const data = JSON.parse(localStorage.getItem("bet"));
  const { MatchDate } = data;

  const today = new Date(MatchDate);

  const navigate = useNavigate();
  const handleClick = () => {
    fetch("https://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1")
      .then((res) => res.json())
      .then((res) => setBetSlip(res))
      .catch((err) => console.log(err));
  };

  const getLeg = () => {
    fetch("https://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1")
      .then((res) => res.json())
      .then((res) => setLeg(res))
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    handleClick();
    getLeg();
  }, []);

  return (
    <>
      <div className="backMain">
        <div onClick={handleBack}>
          <img
            className="back"
            src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
            width="20px"
            height="20px"
            alt=""
          />
        </div>
      </div>
      <div className="makeMain">
        <div className="make">Make It A Builder?</div>
      </div>
      <div>
        <div className="match">
          <span className="detail1">
            <div className="date3">
              {month[today.getMonth()] +
                " " +
                today.getDate() +
                "," +
                today.getFullYear()}
            </div>
            <div className="date3">{today.toLocaleTimeString()}</div>
          </span>
          <span className="detail2">
            <div>{data.MatchName}</div>
            <div>{data.LeagueName}</div>
          </span>
        </div>
        <div className="mainDiv">
          <div className="selectTag">
            <label htmlFor="bet" className="betName">
              Betslip Selection:&nbsp;&nbsp;
            </label>
            <select name="bet" className="selectMain">
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
      <div>
        <div className="betBuilder">Bet Builder Odds: ---</div>
      </div>
    </>
  );
}

export default memo(MatchDetail);
