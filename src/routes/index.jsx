/* eslint-disable react/display-name */
import React, { Suspense } from "react";
import Loading from "../components/Loading";
import { useRoutes } from "react-router-dom";
import { PATHS_DASHBOARD } from "./paths";
import Loadable from "../components/Loadable";

const Layout = Loadable(React.lazy(() => import("../Layout")));
const Home = Loadable(React.lazy(() => import("../features/Home")));

// Group
const Group = Loadable(React.lazy(() => import("../features/Group")));
const MyGroup = Loadable(
  React.lazy(() => import("../features/Group/features/MyGroup"))
);
const CreateGroup = Loadable(
  React.lazy(() => import("../features/Group/features/CreateGroup"))
);
const GroupDetail = Loadable(
  React.lazy(() => import("../features/Group/features/GroupDetail"))
);
const RootGroupDetail = Loadable(
  React.lazy(() =>
    import("../features/Group/features/GroupDetail/features/Root")
  )
);
const CreateTask = Loadable(
  React.lazy(() =>
    import("../features/Group/features/GroupDetail/features/Task")
  )
);

const Task = Loadable(React.lazy(() => import("../features/Task")));
const HomeMoney = Loadable(React.lazy(() => import("../features/HomeMoney")));

export default function Routes() {
  return useRoutes([
    {
      path: PATHS_DASHBOARD.root,
      element: <Layout />,
      children: [
        {
          path: PATHS_DASHBOARD.root,
          element: <Home />,
        },
        {
          path: PATHS_DASHBOARD.group.root,
          element: <Group />,
          children: [
            {
              path: PATHS_DASHBOARD.group.root,
              element: <MyGroup />,
            },
            {
              path: PATHS_DASHBOARD.group.create,
              element: <CreateGroup />,
            },
            {
              path: PATHS_DASHBOARD.group.edit,
              element: <CreateGroup />,
            },
            {
              path: PATHS_DASHBOARD.group.your,
              element: <MyGroup />,
            },
            {
              path: PATHS_DASHBOARD.group.joined,
              element: <div>Joined</div>,
            },
            {
              path: PATHS_DASHBOARD.group.public,
              element: <div>Public</div>,
            },
          ],
        },
        {
          path: PATHS_DASHBOARD.detail.root,
          element: <GroupDetail />,
          children: [
            {
              path: PATHS_DASHBOARD.detail.root,
              element: <RootGroupDetail />,
            },
            {
              path: PATHS_DASHBOARD.detail.task.create,
              element: <CreateTask />,
            },
            {
              path: PATHS_DASHBOARD.detail.member,
              element: <div>Member</div>,
            },
          ],
        },
        {
          path: PATHS_DASHBOARD.task.root,
          element: <Task />,
        },
        {
          path: PATHS_DASHBOARD.homeMoney,
          element: <HomeMoney />,
        },
        {
          path: "*",
          element: <Suspense fallback={<Loading />}>Not Found</Suspense>,
        },
      ],
    },
  ]);
}
