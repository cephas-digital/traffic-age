import { useContext } from "react";
import { GlobalState } from "../../data/Context";
import { Link, useLocation } from "react-router-dom";
import Brand from "../brand/brand";

const DefaultHeader = () => {
  const { headerList } = useContext(GlobalState);
  const location = useLocation();
  return (
    <nav className="shadow-lg -shadow-sm fixed inset-x-0 top-4 p-4 rounded-2xl mx-8 flex items-center bg-white z-50">
      <div className="absolute left-4">
        <Brand />
      </div>
      <div className={`flex gap-x-8 w-fit mx-auto font-medium`}>
        {headerList.map((list) => (
          <Link
            to={list.url}
            className={`${
              location.pathname === list.url && "text-blue-700"
            } hover:text-blue-600`}
          >
            {list.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DefaultHeader;
