import { combineReducers } from "redux";
import initialState from "./state";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
      break;
    case "LOGOUT_USER":
      return {
        ...state,
        user: {
          id: null,
          img: null,
          name: null,
          email: null,
        },
      };
      break;
    default:
      return state;
      break;
  }
};

const rootReducers = combineReducers({
    user : userReducer
})

export default rootReducers
