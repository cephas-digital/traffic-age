import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageRender from "./PageRender";
import Home from "./screens/home.jsx";
// import Footer from "./components/footer/footer";
// import Nav from "./components/nav/nav";
import Index from "./pages/index";
import Sidebar from "./components/sidebar/sidebar";
// import DefaultHeader from "./components/default-header/default-header";
// import ModalComponents from "./components/ModalComponents";
import { useDispatch, useSelector } from "react-redux";
import Background from "./components/mackground/background.component";
import DefaultHeader from "./components/defaultHeader/defaultHeader";
// import { clearErrors } from "./data/Reducers/ErrorReducer";

const Routers = () => {
  const location = useLocation(),
    { error, auth } = useSelector((state) => state),
    dispatch = useDispatch();
  console.log(location);

  return (
    <>
      <ToastContainer position="bottom-center" />
      <DefaultHeader />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:id" element={<PageRender />} />
        <Route path="/:page/:id/:step" element={<PageRender />} />
      </Routes>
    </>
  );
};

export default Routers;
