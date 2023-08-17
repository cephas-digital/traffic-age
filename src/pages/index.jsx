import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../data/Context";

const Index = () => {
  const { headerList } = useContext(GlobalState);
  console.log(headerList);
  let navigate = useNavigate();
  useEffect(() => {
    navigate(headerList[0].url);
  }, [navigate]);
  return <></>;
};

export default Index;
