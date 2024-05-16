import React, { useEffect } from "react";
import CustomersTable from "../Components/Customers/CustomersTable";
import staffStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const staff = staffStore((state) => state.staff);
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null) {
      navigate("/login");
    }
  }, [staff]);

  return (
    <div className="w-full bg-LightGrey items-center mt-16 pt-2">
      <CustomersTable />
    </div>
  );
};

export default Customers;
