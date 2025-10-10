import "./App.css";
import "./index.css";
import { AppRoutes } from "./routes";
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from "./context/ErrorBoundary";

import { AuthProvider } from "./context/AuthProvider/AuthContext";
import { SideBarProvider } from "./context/switchContext";
import { ThemeProvider } from "./context/themeContext";
import { SearchProvider } from "./context/useSearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; 

const queryClient = new QueryClient();

function App() {
  return (
    <>
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>
           <SideBarProvider>
         <AppRoutes />
         <Toaster position="top-right" reverseOrder={false} />
          </SideBarProvider>
         </ThemeProvider>
       </SearchProvider>
     </AuthProvider>
   </QueryClientProvider>
 </ErrorBoundary>


    </>
  );
}
export default App;
