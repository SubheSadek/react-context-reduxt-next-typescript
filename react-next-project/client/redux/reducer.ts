import * as types from "./actionType";

const initialState = {
  users: [],
};

export const usersReducers = (state = initialState, action :any) => {

  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case types.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
      
    case types.EDIT_USER:
      let index = state.users.findIndex((user :any) => user.id === action.id);
      let users :any= [...state.users];
      users[index] = action.payload;
      return {...state, users}
      
    case types.DELETE_USER:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.index),
          ...state.users.slice(action.index + 1)
        ],
      };
    
    default:
      return state;
  }
};

