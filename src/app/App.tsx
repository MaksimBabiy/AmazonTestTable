import "./styles/App.css";
import { AppRoutesProps, routeConfig } from "@/shared/routes/routes";
import { Route, Routes } from "react-router-dom";
import { Suspense, useCallback } from "react";

function App() {
  const renderWithWrapper = useCallback(({ path, element }: AppRoutesProps) => {
    return <Route key={path} path={path} element={element} />;
  }, []);

  return (
    <main className="w-3/4 m-auto">
      <Suspense fallback={"Loading..."}>
        <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
      </Suspense>
    </main>
  );
}

export default App;
