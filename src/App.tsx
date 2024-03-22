import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const SuspenseWrapper = ({ children }: any) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
}

export default App;
