import { ActionTypes, TOGGLE_DRAWER } from "./actions.types";

interface DrawerState {
  open: boolean;
  width: number
}

const DrawerInitialState: DrawerState = {
  open: true,
  width: 300
};

export const drawerReducer = (
  state: DrawerState = DrawerInitialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case TOGGLE_DRAWER: {
      return {
        ...state,
        open: action.open !== undefined ? action.open : !state.open,
      };
    }

    default:
      return state;
  }
};
