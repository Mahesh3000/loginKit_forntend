import React, { memo } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state?.auth?.userData);
  console.log("userData from signup", userData);

  return (
    <div>
      <Header user={userData} />
    </div>
  );
};

export default Dashboard;
