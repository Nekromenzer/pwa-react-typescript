import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

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
