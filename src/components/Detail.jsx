import React from "react";
import { useNavigate } from "react-router-dom";
import "./Detail.css";

export default function Detail({ data }) {
  const navigate = useNavigate();
  const handleClick = (index1) => {
    //console.log(index1);
    localStorage.setItem("bet", JSON.stringify(index1));
    navigate("/bet");
  };
  return (
    <>
      <div className="main">
        {data.map((item) => {
          return (
            <>
              <div className="container">
                <div className="sortData">
                  <span className="item1">{item.Country}</span>
                  <span className="item1">{item.LeagueName}</span>
                </div>
                <div className="main1">
                  {item.obj.map((item2, index) => {
                    return (
                      <>
                        <div
                          className="main2"
                          onClick={() => handleClick(item2)}
                        >
                          <div className="main3">{item2.MatchName}</div>
                          <div className="main3"></div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
