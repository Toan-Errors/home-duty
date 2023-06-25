import "./App.css";
// import Auth from "./features/Auth";
// import Dashboard from "./features/Dashboard";
import useAuth from "./hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loadable from "./components/Loadable";
import React from "react";
import { styled } from "@mui/material";
import Routes from "./routes";

const Auth = Loadable(React.lazy(() => import("./features/Auth")));

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <ToastContainer />
        <Auth />
      </>
    );
  }

  return (
    <Main className="App">
      <ToastContainer />
      <Routes />
    </Main>
  );
}

export default App;

const Main = styled("main")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f4f6f8",
});
