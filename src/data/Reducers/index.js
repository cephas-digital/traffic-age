import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { errorSlice } from "./ErrorReducer";
import { playerSlice } from "./PlayerReducer";
import { usersSlice } from "./UsersReducer";

const rootReducer = combineReducers({
	auth: UserReducer,
	error: errorSlice.reducer,
	player: playerSlice.reducer,
	user: usersSlice.reducer,
});

export default rootReducer;
