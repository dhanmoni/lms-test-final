import React, {useEffect} from "react";
import Departments from "./Departments";
import Hostels from "./Hostels";

function SystemAdminDashboard() {
  
  return (
    <>
      <Departments />
      <Hostels />
    </>
  );
}

export default SystemAdminDashboard;
