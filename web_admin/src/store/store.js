import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accessToken", "theme"],
  // blacklist: [
  //   "scroll",
  //   "header",
  //   "slider",
  //   "showLightBox",
  //   "getMe",
  //   "table",
  //   "login",
  //   "createTable",
  //   "updateTable",
  //   "statusTable",
  //   "deleteTable",
  //   "location",
  //   "valueTable",
  // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());
let persistor = persistStore(store);

// then run the saga

export { store, persistor };
