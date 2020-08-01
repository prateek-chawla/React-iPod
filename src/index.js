import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore} from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./store/reducers/reducer";

// import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers = composeWithDevTools({
// 	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });
// const store = createStore(
// 	reducer,
// 	/* preloadedState, */ composeEnhancers(
// 		applyMiddleware(...middleware)
// 		// other store enhancers if any
// 	)
// );

const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
