import { ActionTypes, TOGGLE_DRAWER } from "./actions.types";

export const toggleDrawerAction = (open?: boolean): ActionTypes => ({
  type: TOGGLE_DRAWER,
  open,
});
