import Drawer from "components/Drawer";
import React from "react";
import { BsListTask } from "react-icons/bs";
import { GrTasks } from "react-icons/gr";
import { MdAddTask } from "react-icons/md";
import { Outlet, useParams } from "react-router-dom";
import { PATHS_DASHBOARD } from "routes/paths";
import "./index.scss";

export default function GroupDetail() {
  const { id } = useParams();

  const items = [
    {
      id: 1,
      title: "Tạo Nhiệm vụ",
      icon: <MdAddTask />,
      link: `${PATHS_DASHBOARD.detail.link}/${id}/task/create`,
    },
    {
      id: 2,
      title: "Danh sách nhiệm vụ của bạn",
      icon: <BsListTask />,
    },
    {
      id: 3,
      title: "Danh sách nhiệm vụ tham gia",
      icon: <GrTasks />,
    },
  ];
  return (
    <>
      <Drawer items={items} />
      <div id="group-detail">
        <Outlet />
      </div>
    </>
  );
}
