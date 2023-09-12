import { useContext, useState } from "react";
import { GlobalState } from "../../data/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Brand from "../brand/brand";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../data/Reducers/UserReducer";

const DefaultHeader = () => {
	const { headerList } = useContext(GlobalState),
		dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [showNav, setShowNav] = useState(false);
	const closeNav = () => {
		setShowNav(false);
	};
	return (
		<nav className="shadow-lg -shadow-sm fixed inset-x-0 top-4 p-4 h-14 rounded-2xl mx-8 flex items-center bg-white z-50">
			<div className="absolute inset-0 flex items-center justify-between mx-4">
				<Brand />

				<div className="md:hidden" onClick={() => setShowNav(!showNav)}>
					<GiHamburgerMenu />
				</div>
			</div>
			<div
				className={`md:flex gap-x-8 w-fit mx-auto font-medium hidden relative z-20`}>
				{headerList.map(list => (
					<Link
						to={list.url}
						className={`${
							location.pathname === list.url && "text-blue-700"
						} hover:text-blue-600`}>
						{list.name}
					</Link>
				))}
				<div
					className="mr-4 cursor-pointer"
					onClick={() => {
						dispatch(logout());
						navigate("/");
					}}>
					Logout
				</div>
			</div>
			<aside
				id="logo-sidebar"
				className={`fixed top-0 left-0 md:hidden z-40 w-full h-screen transition-transform bg-gray-50  ${
					showNav ? "translate-x-0" : "-translate-x-full md:translate-x-0"
				}`}
				aria-label="Sidebar">
				<div class="h-full px-3 py-4 overflow-y-auto">
					<ul className="space-y-2 font-medium">
						<li className="mb-8 md:hidden flex items-center justify-between">
							<Brand />
							<div className="mr-8" onClick={closeNav}>
								<MdClose size={30} />
							</div>
						</li>
						{/* {headerList.map((link) => (
              <ScrollIntoView selector={link.url} onClick={toggleNav}>
                <li className="block py-8 pl-3 pr-4 text-white text-4xl rounded md:bg-transparent decoration-transparent md:p-0 ">
                  {link.name}
                </li>
              </ScrollIntoView>
            ))} */}
						<div className="flex flex-col gap-y-8">
							{headerList.map(list => (
								<Link
									to={list.url}
									className={`${
										location.pathname === list.url && "text-blue-700"
									} hover:text-blue-600 text-4xl`}
									onClick={closeNav}>
									{list.name}
								</Link>
							))}
							<div
								className="mr-4 cursor-pointer"
								onClick={() => {
									dispatch(logout());
									navigate("/");
								}}>
								Logout
							</div>
						</div>
					</ul>
				</div>
			</aside>
		</nav>
	);
};

export default DefaultHeader;
