import React from "react";
import { Grid } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    line: {
      lineTension: 0.4,
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      text: "Week Of Year",
      position: "bottom",
    },
  },
};

const SalesChart = (props) => {
  const { saleStatistics } = props;
  const { title, content } = saleStatistics;
  const { data, history } = content;
  const dates = history.map((el) => {
    return el.date;
  });

  const labels = dates;

  const dataChart = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: history.map((curr) => {
          return Number(curr.amount);
        }),

        borderColor: "rgb(0, 120, 44)",
        backgroundColor: "rgba(0, 120, 44, 0.5)",
      },
    ],
  };
  const salesChartStyle = {
    padding: "10px 20px",
    backgroundColor: "white",
    border: "1px solid #ebebeb",
    borderRadius: "5px",
  };

  return (
    <div className="sales-chart-wrapper">
      <Grid container>
        <Grid item xl={4} lg={4} md={4} className="content">
          <div className="salesChartHeading">{title}</div>
          <div className="sale-info">
            {data.map((curr) => {
              const { key, value, sup } = curr;
              return (
                <div className="info-container">
                  <div className="text-side">
                    <div className="helper-text">{key}</div>
                    <div className="amount-value">
                      {value}
                      <sup>{sup}</sup>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid item xl={8} lg={8} md={8} className="saleChart-section">
          <div className="chart">
            <Line options={options} data={dataChart} style={salesChartStyle} />
          </div>
          <div className="chart-bottom-heading">Sales trend/month</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SalesChart;
