import React, { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Detail from "./Detail";
import "./Fixture.css";

function Fixture() {
  const today = new Date();
  let dateArr = [];
  const handleFun = () => {
    dateArr.push(today.setDate(today.getDate()));
    for (let i = 1; i < 7; i++) {
      dateArr.push(today.setDate(today.getDate() + 1));
    }
  };
  handleFun();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

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
  };

  const handleDate = (date) => {
    let today = new Date(date);
    let date1 = today.toLocaleDateString();
    getNewDate(date1, newData);
  };

  const getNewDate = (date1, arr) => {
    let tempArr = [];
    arr.map((item) => {
      let date = new Date(item.MatchDate);
      if (date.toLocaleDateString() === date1) {
        tempArr.push(item);
      }
    });
    //console.log(tempArr);
    sortData(tempArr);
  };

  const filterdata = (arr) => {
    let tempArr = [];
    arr.map((item) => {
      let date = new Date(item.MatchDate);
      let todayDate = new Date();
      if (date.toLocaleDateString() === todayDate.toLocaleDateString()) {
        tempArr.push(item);
      }
    });

    sortData(tempArr);
  };

  const getData = async () => {
    try {
      await fetch(
        "https://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1"
      )
        .then((res) => res.json())
        .then((res) => {
          setNewData(res);
          filterdata(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="app1">
        <div className="app2">
          {dateArr.map((item, index) => {
            let date = new Date(item);

            return (
              <>
                <div
                  key={index}
                  className="date"
                  onClick={() => {
                    handleDate(item);
                  }}
                >
                  {date.getDate() +
                    "/" +
                    date.getMonth() +
                    "/" +
                    date.getFullYear()}
                </div>
              </>
            );
          })}
        </div>
        <div className="football1">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930__340.png"
            alt=""
            className="img1"
            width="20px"
            height="20px"
          />
          <span className="football">FootBall</span>
        </div>
        <div>
          <Detail data={data} />
        </div>
      </div>
    </>
  );
}

export default memo(Fixture);
