// Reducer for Games
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	gameMoveUp: 0,
	gameMoveDown: 0,
	gameSelectPressed: 0,
};

const gamesReducer = (state = initialState, action) => {
	if (!action.isAppDrawerOpen && action.currentMenuItem === "Games") {
		switch (action.type) {
			case actionTypes.MOVE_FORWARD:
				return {
					...state,
					gameMoveUp: state.gameMoveUp + 1,
				};
			case actionTypes.MOVE_BACKWARD:
				return {
					...state,
					gameMoveDown: state.gameMoveDown + 1,
				};
			case actionTypes.SELECT_PRESSED:
				return {
					...state,
					gameSelectPressed: state.gameSelectPressed + 1,
				};
			default:
				return state;
		}
    }
    return state
};

export default gamesReducer;
