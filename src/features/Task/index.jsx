import Drawer from "components/Drawer";
import React from "react";
import { BsListTask } from "react-icons/bs";
import { MdAddTask } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import { PATHS_DASHBOARD } from "routes/paths";

const items = [
  {
    id: 1,
    title: "Tạo Nhiệm vụ",
    icon: <MdAddTask />,
    link: PATHS_DASHBOARD.task.create,
  },
  {
    id: 2,
    title: "Danh sách nhiệm vụ của bạn",
    icon: <BsListTask />,
    link: PATHS_DASHBOARD.task.your,
  },
  {
    id: 3,
    title: "Danh sách nhiệm vụ tham gia",
    icon: <GrTasks />,
    link: PATHS_DASHBOARD.task.joined,
  },
];

export default function Task() {
  return (
    <>
      <Drawer items={items} />
    </>
  );
}
