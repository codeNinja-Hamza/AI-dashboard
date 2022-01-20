import { React, useState } from "react";
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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import credit from "../Assets/images/debit.png";
import debit from "../Assets/images/credit.png";

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
      // text: "Chart.js Line Chart",
    },
  },
};

const LineChart = (props) => {
  const [value, setValue] = useState(new Date());
  const { creditStatistics } = props;
  const { title, content } = creditStatistics;
  const { totaldebit, totalcredit, credithistory, debithistory } = content;
  const temp = credithistory.map((ele) => {
    return ele.date;
  });

  const labels = temp;

  const data = {
    labels,
    datasets: [
      {
        label: "Credit",
        data: credithistory.map((r) => {
          return Number(r.amount);
        }),
        borderColor: "rgb(202, 16, 51)",
        backgroundColor: "rgba(202, 16, 51, 0.5)",
      },
      {
        label: "Debit",
        data: debithistory.map((r) => {
          return Number(r.amount);
        }),
        borderColor: "rgb(0, 120, 44)",
        backgroundColor: "rgba(0, 120, 44, 0.5)",
      },
    ],
  };

  return (
    <div className="line-chart-wrapper">
      <div className="line-chart-header">
        <div className="lineChartHeading"> {title}</div>
        <div className="date-selection">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="MM/dd/yyyy"
              clearable={false}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              style={{ outline: "none" }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="chart-container">
        <div className="legend">
          <div className="credit-side">
            <div className="icon-side">
              <img src={credit} height="48px" width="48px" alt="" />
            </div>
            <div className="text-side">
              <Typography className="helper-text">total credit</Typography>
              <Typography className="value">
                {totalcredit}
                <sup>pkr</sup>
              </Typography>
            </div>
          </div>
          <div className="debit-side">
            <div>
              <img src={debit} alt="" height="48px" width="48px" />
            </div>
            <div>
              <Typography className="helper-text">total debit</Typography>
              <Typography className="value">
                {totaldebit}
                <sup>pkr</sup>
              </Typography>
            </div>
          </div>
        </div>
        <div className="stats-chart">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
