import { Link } from "react-router-dom";

const Brand = ({ height, white }) => {
  return (
    <Link to={"/"}>
        <img
          src={require("../../assets/sdg_logo.png")}
          alt=""
          className={`${height || "h-10"}`}
        />
    </Link>
  );
};

export default Brand;
