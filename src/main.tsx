import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "./context/ErrorBoundary";
// import {
//   ErrorBoundaryContext
// } from "react-use-error-boundary";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider/AuthContext";
import { SideBarProvider } from "./context/switchContext";
import { ThemeProvider } from "./context/themeContext";
import { SearchProvider } from "./context/useSearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; 

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <AuthProvider>
     <ErrorBoundary>
    <SearchProvider>
    <ThemeProvider>
        <SideBarProvider>
     
      <App/>
     
    </SideBarProvider>
    </ThemeProvider>
  </SearchProvider>
    </ErrorBoundary>
     </AuthProvider>
     </QueryClientProvider>
  </React.StrictMode>,
);
