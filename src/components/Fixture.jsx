import React, { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Fixture.css";

function Fixture() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      await fetch(
        "http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1"
      )
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (index) => {
    localStorage.setItem("bet", JSON.stringify(data[index]));
    navigate("/bet");
  };
  const duplicate = () => {
    ///console.log(data);
  };

  useEffect(() => {
    getData();
    duplicate();
  }, []);

  return (
    <>
      <div>
        <table>
          <tr>
            <th>{""}</th>
            <th>League</th>
            <th>Match</th>
            <th>Kick Off (base on local)</th>
          </tr>

          <tbody>
            {data.map((item, index) => {
              return (
                <tr onClick={() => handleClick(index)}>
                  <td>{item.Country}</td>
                  <td>{item.LeagueName}</td>
                  <td>{item.MatchName}</td>
                  <td>{item.KickOffUtc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default memo(Fixture);
