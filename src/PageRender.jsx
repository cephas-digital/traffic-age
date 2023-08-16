/* eslint-disable no-undef */
import { createElement, useEffect } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { ErrorPage } from "./components";
import { GlobalState } from "./data/Context";

const generatePage = (pageName, folder) => {
	const component = () => require(`./${folder}/${pageName}`).default;
	try {
		return createElement(component());
	} catch (error) {
		// return <ErrorPage />;
	}
};

const PageRender = () => {
	const { auth } = useContext(GlobalState);
	const { page, id, step } = useParams();
	const escape2 = [],
		navigate = useNavigate();

	useEffect(() => {
		// if (!auth?.isAuth) {
		// 	if (!error?.errorText) {
		// 		if (page !== "login" && page !== "register") {
		// 			navigate("/");
		// 		}
		// 		clearErrors();
		// 	}
		// }
		if (auth?.isAuth) {
			if (["register", "login", "create-account"]?.includes(page)) {
				navigate("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, auth?.isAuth, navigate]);

	// if (auth.token && auth.loading) return <></>;
	// if (general?.isLoading && users.isLoading) return <Loader />;

	let pageName = "";
	if (step) {
		pageName = `${page}/${id}/${"[id]"}`;
	} else if (id) {
		if (
			(page === "students" && escape2.includes(id)) ||
			(page === "tutors" && escape2.includes(id))
		) {
			pageName = `${page}/${id}`;
		} else {
			pageName = `${page}/${"[id]"}`;
		}
	} else {
		pageName = `${page}`;
	}
	return generatePage(pageName, auth?.isAuth ? "pages" : "screens");
};

export default PageRender;
