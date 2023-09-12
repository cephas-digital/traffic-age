import React, { useEffect, useState } from "react";
import Brand from "../components/brand/brand";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { authFail, loadUser, login } from "../data/Reducers/UserReducer";
import { returnErrors } from "../data/Reducers/ErrorReducer";
import Input from "../components/input/input";
import Button from "../components/button/button";

const Login = () => {
	const navigate = useNavigate(),
		init = {
			email: "",
			password: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{ auth } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		if (auth?.isLoggedIn && submit) {
			navigate("/");
		}
	}, [auth, submit, navigate]);

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.email || !state?.password) return;
		setLoading(true);
		try {
			let res = await axios.post(`/api/v1/admin/login`, { ...state });
			console.log({ resp: res?.data });
			toast.success(res?.data?.msg);
			dispatch(login(res?.data));
			dispatch(loadUser());
		} catch (err) {
			if (err?.response?.status === 429 || err?.response?.status === 405)
				toast.error(err?.response?.data ? err?.response?.data : err?.message);
			console.log({ err });
			let error = err.response?.data?.data;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			} else {
				toast.error(err?.response?.data?.message);
			}
			dispatch(authFail());
		}
		setLoading(false);
		setSubmit(true);
	};
	return (
		<ReuseBox>
			<form className="p-3 py-7">
				<h2 className="mb-4 text-center uppercase font-semibold">Login</h2>
				<div className="mb-4">
					<Input
						type={"email"}
						value={state?.email}
						onChange={textChange}
						name="email"
						placeholder="example@xyz.com"
						label={"Email address"}
						// eslint-disable-next-line react/style-prop-object
						style={"bg-gray-100 border-0"}
					/>
				</div>
				<div className="mb-4">
					<Input
						type={"password"}
						value={state?.password}
						onChange={textChange}
						name="password"
						placeholder="*******"
						label={"Password"}
						// eslint-disable-next-line react/style-prop-object
						style={"bg-gray-100 border-0"}
					/>
				</div>
				<div className="mb-4">
					<Button
						title={"sign in"}
						buttonType={"primary"}
						width={"w-full"}
						// eslint-disable-next-line react/style-prop-object
						style={"text-center capitalize justify-center rounded-0 mt-10"}
						loading={loading}
						onClick={handleSubmit}
						type="submit"
					/>
				</div>
			</form>
		</ReuseBox>
	);
};

export default Login;

export const ReuseBox = ({ children }) => {
	return (
		<>
			<div className="bg-[#07634233] min-h-screen flex justify-center items-center">
				<div className="fixed inset-x-0 top-0">
					<NonAuthHeader />
				</div>
				<div
					style={{
						maxWidth: "500px",
					}}
					className="bg-white rounded-sm shadow-sm w-full">
					{children}
				</div>
			</div>
		</>
	);
};

export const NonAuthHeader = () => {
	return (
		<div className="bg-white flex justify-center items-center py-3">
			<Brand />
		</div>
	);
};
