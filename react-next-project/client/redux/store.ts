import {createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import reduxThunk from "redux-thunk";

const middlewares = [reduxThunk];

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;