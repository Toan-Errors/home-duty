import { AppBar, Avatar, Icon, Toolbar, styled } from "@mui/material";
import React, { useCallback } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import navs from "../NavConfig";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";

import "./index.scss";
import Notifications from "./components/Notifications";
import { useCustomQuery } from "hooks/useQuery";

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { data: notifications, refetch: refetchNotifications } =
    useCustomQuery("invitations");

  const IsActive = useCallback(
    (path) => {
      if (location.pathname.split("/")[1] === path.split("/")[1]) {
        return true;
      }
      return false;
    },
    [location]
  );

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          <Logo width={50} height={50} />
        </a>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            {navs.map((nav, index) => {
              const isActive = IsActive(nav.path);
              return (
                <li className="nav__item" key={index}>
                  <Link
                    to={nav.path}
                    className={`nav__link ${isActive ? "active-link" : ""}`}
                  >
                    <i className={nav.icon} />
                    <span className="nav__name">{nav.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav__user">
          <div className="nav__user-notifications">
            <IoMdNotificationsOutline
              className="nav__user-notifications-icon"
              size={30}
              onClick={() => {
                setOpen(!open);
                refetchNotifications();
              }}
            />
            <span className="nav__user-notifications-number">
              {notifications?.length}
            </span>

            <Notifications
              visible={open}
              setVisible={setOpen}
              notifications={notifications}
            />
          </div>
          <img
            className="nav__user-avatar"
            src="https://picsum.photos/200"
            alt=""
          />
        </div>
      </nav>
    </header>
  );
}
