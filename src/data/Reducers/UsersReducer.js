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
	stat: null,
};

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		getSearchUsers: (state, { payload }) => {
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
		resetUsersSearch: state => {
			state.search = "";
			state.mainSearch = [];
			state.search_paginate = null;
			state.isFound = false;
		},
		getUsers: (state, { payload }) => {
			state.data = payload?.data || payload;
			state.paginate = payload?.paginate;
		},
		getStat: (state, { payload }) => {
			state.stat = payload?.data || payload;
		},
		usersFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutUsers: state => {
			state = initialState;
		},
	},
});
export const {
	usersFail,
	getUsers,
	getUsersOyo,
	deleteUsers,
	addUsers,
	getSearchUsers,
	getSearch,
	resetUsersSearch,
	updateUsers,
	logoutUsers,
	getStat,
} = usersSlice.actions;

export const manageUsers = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			res = await axios.get(
				`/api/v1/user?type=${data?.type || "all"}${
					data?.limit ? `&limit=${data?.limit}` : ""
				}${data?.search ? `&search=${data?.search}` : ""}`
			);
			if (data?.search) dispatch(getSearchUsers(res.data));
			else dispatch(getUsers(res.data));

			if (!data?.search) {
				let res2 = await axios.get(`/api/v1/user/stat`);
				console.log({ stat: res2?.data });
				dispatch(getStat(res2.data));
			}
		}
		if (type !== "get") toast.success(res?.data?.msg);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(usersFail());
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
