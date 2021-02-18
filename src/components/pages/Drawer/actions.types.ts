export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

export interface ToggleDrawerAction {
  type: typeof TOGGLE_DRAWER;
  open?: boolean;
}

export type ActionTypes = ToggleDrawerAction;
