import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

//  for offline support
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import OfflineBanner from "./components/OfflineBanner";
// custom hook for check online status
import { useIsAppOnline } from "./hooks/useIsAppOnline";

import Home from "./pages/Home";
import About from "./pages/About";
import Offline from "./pages/Offline";
import WebSockets from "./pages/WebSockets";
import InfiniteQueries from "./pages/InfiniteQueries";
import ParallelSerial from "./pages/ParallelSerial";
import Test from "./pages/Test";

// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Offline = lazy(() => import("./pages/Offline"));

function App() {
  const isOnline = useIsAppOnline();
  const queryClient = new QueryClient();

  // Create the persister
  const persister = createAsyncStoragePersister({
    storage: AsyncStorage,
    throttleTime: 3000,
  });

  const SuspenseWrapper = ({ children }: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      {!isOnline && <OfflineBanner />}
      {children}
    </Suspense>
  );

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
        path="about"
        element={
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        }
      />
      <Route
        path="offline"
        element={
          <SuspenseWrapper>
            <PersistQueryClientProvider
              persistOptions={{ persister }}
              onSuccess={() =>
                queryClient
                  .resumePausedMutations()
                  .then(() => queryClient.invalidateQueries())
              }
              client={queryClient}
            >
              <Offline />
            </PersistQueryClientProvider>
          </SuspenseWrapper>
        }
      />
      <Route
        path="websockets"
        element={
          <SuspenseWrapper>
            <WebSockets />
          </SuspenseWrapper>
        }
      />
      <Route
        path="infinitqueries"
        element={
          <SuspenseWrapper>
            <InfiniteQueries />
          </SuspenseWrapper>
        }
      />
      <Route
        path="parallelSerial"
        element={
          <SuspenseWrapper>
            <ParallelSerial />
          </SuspenseWrapper>
        }
      />
      <Route
        path="test"
        element={
          <SuspenseWrapper>
            <Test />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
}

export default App;
