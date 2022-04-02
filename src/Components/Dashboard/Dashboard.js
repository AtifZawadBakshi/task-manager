import React from "react";
import Header from "./Header";
import Form from "./Form";
import Table from "./Table";
const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <h4 className="text-blue h3 mb-4">Raw Material Kits Inawrd</h4>
        </div>
        <Form />
      </div>
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <h4 className="text-blue h3 mb-4">Raw Material Inawrd Check</h4>
        </div>
        <Table />
      </div>
    </>
  );
};

export default Dashboard;
