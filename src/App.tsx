import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Outlet, redirect, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Shell from "./components/Shell";
import { Button, Header, MantineProvider, Paper } from "@mantine/core";
import { theme } from "./styles/theme";
import Home from "./pages/Home";
import Compose from "./pages/Compose";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";
import { QueryClientProvider } from "@tanstack/react-query";
import { prefetch, queryClient } from "./services/queryClient";
import { AuthPage } from "./pages/AuthPage";
import AuthRequired, { AuthContext } from "./services/AuthRequired";
import ComposeTarget from "./components/ComposeTarget";
import NewBlogpost from "./components/targets/NewBlogpost";
import NewProject from "./pages/NewProject";
import NewNote from "./components/targets/NewNote";
import ComposeNew from "./components/targets/ComposeNew";
import ViewPost from "./components/view/ViewPost";
import { HashRouter } from "react-router-dom";

function App() {
  const authUser = useContext(AuthContext);
  const navigate = useNavigate()
  /*  const prefetchedPosts = prefetch.prefetchPosts() */

    useEffect(() => {
      !authUser.session ? navigate("/auth") : null
    }, [authUser.session])


  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    
          {authUser.session ? (
            <Shell>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dash" element={<Dashboard />} />
                <Route path="/view" element={<View />}/>
                <Route path="/compose" element={<ComposeTarget />} />
                <Route path="compose/new" element={<ComposeNew />}>
                  <Route path="blogpost/" element={<NewBlogpost />} />
                  <Route path="project/" element={<NewProject />} />
                  <Route path="note/" element={<NewNote />} />
                </Route>
              </Routes>
              <Outlet />
            </Shell>
          ) : (
            <Shell>
              <AuthPage />
            </Shell>
          )}
   
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
