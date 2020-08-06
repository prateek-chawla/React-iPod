import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./store/reducers/reducer";
import App from "./App";

import "./index.css";

const customThunkMiddleWare = ({ dispatch, getState }) => next => action => {
	if (typeof action === "function") return action(dispatch, getState);

	const state = getState();
	action.isAppDrawerOpen = state.appDrawer.isAppDrawerOpen;
	action.currentMenuItem = state.appDrawer.currentMenuItem;
	return next(action);
};

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(customThunkMiddleWare))
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
