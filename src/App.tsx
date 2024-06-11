import { Outlet } from "react-router-dom";
import Progress from "./components/layout/Progress";
import { AppProvider } from "./services/context";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/layout/ErrorFallback";

const App = () => {
  return (
    <AppProvider>
      <main className="h-screen w-full relative bg-zinc-800 overflow-hidden selection:bg-violet-300 selection:text-zinc-950">
        <Progress />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <section className="absolute inset-0 pt-20">
            <div className="h-full overflow-hidden">
              <Outlet />
            </div>
          </section>
        </ErrorBoundary>
      </main>
    </AppProvider>
  );
};

export default App;
