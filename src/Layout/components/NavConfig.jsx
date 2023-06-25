import { PATHS_DASHBOARD } from "routes/paths";

const navConfig = [
  {
    title: "Trang chủ",
    path: PATHS_DASHBOARD.root,
    icon: "bx bx-home-alt nav__icon",
  },
  {
    title: "Nhóm",
    path: PATHS_DASHBOARD.group.root,
    icon: "bx bx-group nav__icon",
  },
  {
    title: "Công việc",
    path: PATHS_DASHBOARD.task.root,
    icon: "bx bx-task nav__icon",
  },
  {
    title: "Thu chi",
    path: PATHS_DASHBOARD.homeMoney,
    icon: "bx bx-money nav__icon",
  },
];

export default navConfig;
