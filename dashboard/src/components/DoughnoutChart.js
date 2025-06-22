import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
<<<<<<< HEAD
=======

>>>>>>> a74997075c113219cec9ec343c9a1ed4c2a84c09
export function DoughnutChart({ data }) {
  return <Doughnut data={data} />;
}
