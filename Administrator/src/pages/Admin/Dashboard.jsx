import React from 'react';
import Sidebar from '../../components/SideBar/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-72  p-6 w-full"> {/* Adjust margin-left based on sidebar width */}
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
