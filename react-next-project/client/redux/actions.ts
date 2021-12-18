import * as types from "./actionType";
// import axios from "axios";

export const getUsers = (users :any) => {
  return{
    type: types.GET_USERS,
    payload: users,
  }
  
};

export const addUsers = (user :any) => {
  return{
    type: types.ADD_USER,
    payload: user,
  }
  
};

export const editUserInfo = (id :number, user :any) => {
  return{
    type: types.EDIT_USER,
    id:id,
    payload: user,
  }
};

export const deleteUserInfo = (index :number) => {
  return{
    type: types.DELETE_USER,
    index: index,
  }
};

