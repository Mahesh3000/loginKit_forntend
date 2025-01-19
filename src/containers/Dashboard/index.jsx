import React, { memo } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state?.auth?.userData);
  console.log("userData", userData);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Dashboard;
