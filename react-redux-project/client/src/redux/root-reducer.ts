import { combineReducers } from "redux";
import {usersReducers} from "./reducer";

const rootReducer = combineReducers({
  allUsers: usersReducers,
  // addNewUser: addUserReducers,
});

export default rootReducer;
