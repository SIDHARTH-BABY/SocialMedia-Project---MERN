import React from "react";

import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CChart } from "@coreui/react-chartjs";

const AdminDashboardChart = () => {
  // const userCount = async
  return (
    <div>
      {/* <ColumnGroupingTable /> */}
      <CChart
        type="bar"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Users Count",
              backgroundColor: "#blue",
              data: [12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            },
          ],
        }}
        labels="months"
      />
    </div>
  );
};

export default AdminDashboardChart;
