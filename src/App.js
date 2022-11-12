import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
const LazyFixture = React.lazy(() => import("./components/Fixture"));
const LazyMatchDetail = React.lazy(() => import("./components/MatchDetail"));

function App() {
  const today = new Date();
  let dateArr = [];
  const handleFun = () => {
    for (let i = 1; i < 8; i++) {
      dateArr.push(today.setDate(today.getDate() + 1));
    }
  };

  handleFun();

  return (
    <div className="App">
      <div className="app2">
        {dateArr.map((item, index) => {
          let date = new Date(item);

          return (
            <>
              <div key={index} className="date">
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
      {/* <Fixture /> */}
      {/* <Routes>
        <Route path="/" element={<Fixture />}></Route>
        <Route path="/bet" element={<MatchDetail />}></Route>
      </Routes> */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="Loading....">
              <LazyFixture />
            </Suspense>
          }
        ></Route>
        <Route
          path="/bet"
          element={
            <Suspense fallback="Loading....">
              <LazyMatchDetail />
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
