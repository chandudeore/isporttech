import React, { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Fixture.css";

function Fixture() {
  const [data, setData] = useState([]);
  // const [newData, setNewData] = useState([]);

  const sortData = (arr) => {
    let tempArr = [];
    arr.map((item) => {
      let count = 0;
      tempArr.map((item2) => {
        if (
          item2.LeagueName == item.LeagueName ||
          item2.Country == item.Country
        ) {
          item2.obj.push(item);
          count++;
        }
      });
      if (count == 0) {
        let obj1 = {
          LeagueName: item.LeagueName,
          Country: item.Country,
          obj: [item],
        };
        tempArr.push(obj1);
      }
    });
    setData(tempArr);
    //console.log(tempArr);
  };

  const navigate = useNavigate();

  const getData = async () => {
    try {
      await fetch(
        "http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1"
      )
        .then((res) => res.json())
        .then((res) => {
          //setData(res);
          sortData(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (index1) => {
    //console.log(index1);
    localStorage.setItem("bet", JSON.stringify(index1));
    navigate("/bet");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <div className="football">FootBall</div>
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
      </div>
    </>
  );
}

export default memo(Fixture);
