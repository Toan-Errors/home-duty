import React from "react";
// import ListGroup from "./components/ListGroup";
import "./index.scss";
import { useCustomQuery } from "hooks/useQuery";
import Loadable from "components/Loadable";
import Drawer from "components/Drawer";
import { IoIosCreate } from "react-icons/io";
import { MdGroup, MdGroups } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { PATHS_DASHBOARD } from "routes/paths";

const items = [
  {
    id: 1,
    title: "Tạo Nhóm",
    icon: <IoIosCreate />,
    link: PATHS_DASHBOARD.group.create,
  },
  {
    id: 2,
    title: "Nhóm của bạn",
    icon: <MdGroup />,
    link: PATHS_DASHBOARD.group.your,
  },
  {
    id: 3,
    title: "Nhóm đã tham gia",
    icon: <MdGroups />,
    link: PATHS_DASHBOARD.group.joined,
  },
  {
    id: 3,
    title: "Nhóm công khai",
    icon: <MdGroups />,
    link: PATHS_DASHBOARD.group.public,
  },
];

function Group() {
  return (
    <>
      <Drawer items={items} />
      <div id="group">
        <Outlet />
      </div>
    </>
  );
}

export default React.memo(Group);
