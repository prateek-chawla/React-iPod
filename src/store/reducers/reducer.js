// Combine Reducers into rootReducer

import { combineReducers } from "redux";

import appDrawerReducer from './appDrawer'
import gamesReducer from './games'
import musicReducer from './music'
import settingsReducer from './settings'

const rootReducer = combineReducers({
	appDrawer: appDrawerReducer,
	music: musicReducer,
	games: gamesReducer,
	settings:settingsReducer
});

export default rootReducer;
