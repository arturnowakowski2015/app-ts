import Home from "./pages/Home";
import { useState } from "react";
import { MyGlobalContext } from "./ctx/MyGlobalContext";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({});
{
  /* The rest of your application */
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home /> <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}
export default App;
