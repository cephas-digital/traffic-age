import { createSlice } from "@reduxjs/toolkit";
import { clearErrors, returnErrors } from "./ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";

let initialState = {
	data: [],
	isAdded: false,
	isDeleted: null,
	search: "",
	mainSearch: null,
	isFound: null,
	isUpdated: null,
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		getSearchPlayer: (state, { payload }) => {
			state.mainSearch =
				payload?.search === state?.search
					? payload?.data || payload
					: state?.mainSearch;
			state.search_paginate =
				payload?.search === state?.search
					? payload?.paginate || null
					: state?.search_paginate;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetPlayerSearch: state => {
			state.search = "";
			state.mainSearch = [];
			state.search_paginate = null;
			state.isFound = false;
		},
		getPlayer: (state, { payload }) => {
			state.data = payload?.data || payload;
			state.paginate = payload?.paginate;
		},
		playerFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutPlayer: state => {
			state = initialState;
		},
	},
});
export const {
	playerFail,
	getPlayer,
	getPlayerOyo,
	deletePlayer,
	addPlayer,
	getSearchPlayer,
	getSearch,
	resetPlayerSearch,
	updatePlayer,
	logoutPlayer,
} = playerSlice.actions;

export const managePlayer = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			res = await axios.get(
				`/api/v1/player?type=${data?.type || "all"}${
					data?.limit ? `&limit=${data?.limit}` : ""
				}${data?.search ? `&search=${data?.search}` : ""}`
			);
			if (data?.search) dispatch(getSearchPlayer(res.data));
			else dispatch(getPlayer(res.data));
		}
		if (type !== "get") toast.success(res?.data?.msg);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(playerFail());
		if (type && type !== "get") {
			let error = err.response?.data?.data;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			} else {
				toast.error(err?.response?.data?.message || err?.message);
			}
		}
	}
};
