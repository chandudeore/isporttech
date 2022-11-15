import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header";
const LazyFixture = React.lazy(() => import("./components/Fixture"));
const LazyMatchDetail = React.lazy(() => import("./components/MatchDetail"));

function App() {
  return (
    <div className="App">
      <Header />
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
