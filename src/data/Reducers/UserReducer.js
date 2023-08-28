import { createSlice } from "@reduxjs/toolkit";
import { SetAuthToken } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";
import { managePlayer } from "./PlayerReducer";
import { manageUsers } from "./UsersReducer";

export const TOKEN = "TRAFFIC_AGE_LOGIN";

let initialState = {
	user: null,
	isAuth: false,
	role: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, { payload }) => {
			localStorage.setItem(TOKEN, payload?.token);
			state.isLoggedIn = true;
			state.token = payload?.token;
			state.user = payload?.data;
		},
		register: state => {
			state.isRegistered = true;
		},
		setUser: (state, { payload }) => {
			state.isUpdated = true;
			state.user = payload?.data;
		},
		getUser: (state, { payload }) => {
			if (payload?.token) {
				localStorage.setItem(TOKEN, payload?.token);
			}
			state.user = payload?.data || null;
			state.isAuth = payload?.data ? true : false;
			state.loading = false;
		},
		getUserFail: state => {
			state.isAuth = false;
			state.loading = false;
		},
		getUserLoading: state => {
			state.loading = true;
		},
		setPassword: state => {
			state.isPassword = true;
		},
		authFail: state => {
			state.isUpdated = false;
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isPassword = false;
		},
		logout: state => {
			localStorage.removeItem(TOKEN);
			state.isAuth = false;
			state.user = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	login,
	logout,
	getUser,
	setUser,
	setAuth,
	authFail,
	setPassword,
	getUserFail,
	getUserLoading,
	register,
} = authSlice.actions;

export default authSlice.reducer;

export const loadUser = () => async dispatch => {
	let token = localStorage.getItem(TOKEN);
	if (token) SetAuthToken(token);

	try {
		let res = await axios.get(`/api/v1/admin`);
		if (res?.data?.data) {
			dispatch(getUser(res?.data));
			dispatch(managePlayer("get"));
			dispatch(manageUsers("get"));
		} else {
			dispatch(authFail());
		}
	} catch (err) {
		if (err) console.log(err.response?.data?.data, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(authFail());
	}
};

export const MergedData = (data, payload) => {
	let ids = new Set(payload.map(d => d._id));
	let updatateData = [...payload, ...data.filter(d => !ids.has(d._id))];
	return updatateData?.sort((a, b) => a?.createdAt - b?.createdAt);
};

export const EditData = (data, payload) => {
	let updatateData =
		data?.length > 0
			? data.map(item => (item._id !== payload._id ? item : payload))
			: data;
	return updatateData;
};

export const DeleteData = (data, payload) => {
	let filterItem =
		data?.length > 0 ? [...data.filter(item => item._id !== payload._id)] : [];
	return filterItem;
};

export const imageUpload = async images => {
	let imgArr = [];
	for (const item of images) {
		// console.log({ item });
		let post = new FormData();
		post.append(`file`, item);

		let res = await axios.post(`/api/file`, post, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const data = await res?.data?.data;
		// console.log({ data });
		Array.isArray(data) ? (imgArr = [...imgArr, ...data]) : imgArr.push(data);
	}
	return imgArr;
};
