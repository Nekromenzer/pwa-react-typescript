import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Offline from "./pages/Offline";

// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Offline = lazy(() => import("./pages/Offline"));

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
      <Route
        path="/offline"
        element={
          <SuspenseWrapper>
            <Offline />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
}

export default App;
