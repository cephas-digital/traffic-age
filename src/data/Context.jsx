/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  let handleCapitalize = (word) => {
    let splitter = word.trim().split(" ");
    let firstCap = splitter[0].split("");
    let remaining = splitter.slice(1, splitter.length).join(" ");

    let firstCapOne = firstCap[0].toUpperCase();
    let firstCapTwo = firstCap.slice(1, firstCap.length).join("");

    let joinFirst = `${firstCapOne}${firstCapTwo}`;

    return `${joinFirst} ${remaining}`;
  };

  let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  let { auth } = useSelector((state) => state);

  let headerList = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Users",
      url: "/users",
    },
    {
      name: "Players",
      url: "/players",
    },
  ];

  const state = {
    handleCapitalize,

    numberWithCommas,

    headerList,
    auth,
    nav,
    toggleNav,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
