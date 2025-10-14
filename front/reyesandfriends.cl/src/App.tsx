import "./App.css";
import AppRouter from "./router/router";
import { HelmetProvider } from "react-helmet-async";
import { usePageTheme } from "./hooks/theme/usePageTheme";

function App() {
  const { theme } = usePageTheme();

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
