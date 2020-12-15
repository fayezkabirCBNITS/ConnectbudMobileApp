import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import {
  loaderDataReducer,
  userDataReducer,
} from "./reducers";
import AsyncStorage from "@react-native-community/async-storage";

const rootReducer = combineReducers({
  userData: userDataReducer,
  loaderData: loaderDataReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  keyPrefix: "",
  stateReconciler: hardSet,
  blacklist: [],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  pReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
