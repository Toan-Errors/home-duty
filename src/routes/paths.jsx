function path(root, sublink) {
  return `${root}${sublink}`;
}

export const PATHS_DASHBOARD = {
  root: "/",
  group: {
    root: "/group",
    create: path("/group", "/create"),
    edit: path("/group", "/create/:id/edit"),
    your: path("/group", "/your"),
    joined: path("/group", "/joined"),
    public: path("/group", "/public"),
  },
  detail: {
    link: "/detail",
    root: "/detail/:id",
    task: {
      root: path("/detail/:id", "/task"),
      create: path("/detail/:id", "/task/create"),
      edit: path("/detail/:id", "/task/create/:id/edit"),
    },
    member: path("/detail/:id", "/member"),
  },
  task: {
    root: "/task",
    create: path("/task", "/create"),
    edit: path("/task", "/create/:id/edit"),
    your: path("/task", "/your"),
  },
  homeMoney: "/home-money",
};
