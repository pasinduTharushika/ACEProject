import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const colors = ["rgba(123,104,238, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"];
const boarderColors = ["rgba(123,104,238, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"];

const BarChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: "Employee Leave Count",
            data: data,
            backgroundColor: data.map((x, i) => colors[i % 3]),
            borderColor:data.map((x, i) => boarderColors[i % 3]),
            borderWidth: 1,
          },
        ],
      }}
      height={350}
          width={350}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
    />
  );
};


export default BarChart;