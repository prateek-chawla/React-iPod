import { combineReducers } from "redux";
import appDrawerReducer from './appDrawer'
import gamesReducer from './games'
import musicReducer from './music'

const rootReducer = combineReducers({
	appDrawer: appDrawerReducer,
	music: musicReducer,
	games: gamesReducer,
});

export default rootReducer;
