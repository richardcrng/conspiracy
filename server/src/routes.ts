import {ActivityController} from "./controller/ActivityController";

export const Routes = [{
  method: "get",
  route: "/activities",
  controller: ActivityController,
  action: "all"
}, {
  method: "get",
  route: "/activities/:id",
  controller: ActivityController,
  action: "one"
}, {
  method: "post",
  route: "/activities",
  controller: ActivityController,
  action: "save"
}, {
  method: "delete",
  route: "/activities/:id",
  controller: ActivityController,
  action: "remove"
}];