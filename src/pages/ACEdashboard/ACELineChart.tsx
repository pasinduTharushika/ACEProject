import React from "react";

import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
const LineChart = ({ labels, data }: { labels: string[]; data: number[] }) => {

  const lineChartdata = {
    labels: labels,
    datasets: [
      {
        label: "New Recruitment Count",
        data: data,
        fill: true,
        backgroundColor: "rgba(152,251,152,0.2)",
        borderColor: "rgba(152,251,152,1)",
      }
    ]
  };
  

    return(
        <div>
          <Line data={lineChartdata} />
        </div>
    );
}

export default LineChart;