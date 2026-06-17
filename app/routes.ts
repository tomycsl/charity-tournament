import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/canteen", "routes/canteen.tsx"),
  route("/cause", "routes/cause.tsx"),
  route("/rules", "routes/rules.tsx"),
  layout("./fixture-layout/fixture-layout.tsx", [
    route("fixture/men/:groupId", "routes/fixture-men-group.tsx"),
    route("fixture/men/playoffs", "routes/fixture-men-playoffs.tsx"),
    route("fixture/women/group", "routes/fixture-women-group.tsx"),
    route("fixture/women/playoffs", "routes/fixture-women-playoffs.tsx")
  ]),
  route("/timeline", "routes/timeline.tsx"),
] satisfies RouteConfig;

