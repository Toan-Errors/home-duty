import { Box, Container, Grid } from "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./index.scss";

export default function Dashboard() {
  return (
    <div id="layout">
      <Header />
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
}
