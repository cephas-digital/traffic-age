import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageRender from "./PageRender";
import Home from "./screens/home.jsx";
import Index from "./pages/index";
import { useDispatch, useSelector } from "react-redux";
import DefaultHeader from "./components/defaultHeader/defaultHeader";
import ModalContainer from "./components/modal-container/modal-container";
import { clearErrors } from "./data/Reducers/ErrorReducer";

const Routers = () => {
	const { auth, error } = useSelector(state => state);

	let dispatch = useDispatch();

	return (
		<>
			<ToastContainer position="bottom-center" />
			{auth?.isAuth && <DefaultHeader />}
			<Routes>
				<Route path="/" element={auth?.isAuth ? <Index /> : <Home />} />
				<Route path="/:page" element={<PageRender />} />
				<Route path="/:page/:id" element={<PageRender />} />
				<Route path="/:page/:id/:step" element={<PageRender />} />
			</Routes>
			<ModalContainer
				show={error?.error?.length > 0}
				title="Error"
				width={"max-w-md"}
				close={() => dispatch(clearErrors())}>
				<div className="downH2 flex flex-col">
					{error?.error?.map((item, i) => (
						<p key={i} className="fw-bold Lexend text-center w-100">
							<span className="fontInherit me-2">
								{error?.error?.length !== 1 && <>{i + 1}.</>}
							</span>{" "}
							{item?.msg}
						</p>
					))}
					<button
						onClick={() => dispatch(clearErrors())}
						className="inline-block w-52 mx-auto rounded bg-main px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-main hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-main focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-main active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mt-5">
						close
					</button>
				</div>
			</ModalContainer>
		</>
	);
};

export default Routers;
