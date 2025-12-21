import "./App.css";
import AppRouter from "./router/router";
import { HelmetProvider } from "react-helmet-async";
import { usePageTheme } from "./hooks/theme/usePageTheme";

function App() {
  const { theme, loading } = usePageTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-lg text-gray-700 dark:text-gray-200">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
