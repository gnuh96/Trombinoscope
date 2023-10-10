import { schemeSet3 } from "d3-scale-chromatic";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./styles.css";
import { valsCount } from "../../utils/constant";

Chart.register(ArcElement, Tooltip);

function DonutDet({ data, title }) {
  const valueCounts = {};
  Object.keys(data).forEach((key) => {
    if (valueCounts[key]) {
      valueCounts[key] += valsCount[data[key]];
    } else {
      valueCounts[key] = valsCount[data[key]];
    }
  });
  const colorScale = schemeSet3;
  const colors = colorScale.slice(0, Object.keys(valueCounts).length);

  const chartData = {
    labels: Object.keys(valueCounts),
    datasets: [
      {
        data: Object.values(valueCounts),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  return (
    <div className="donutDet">
      <Doughnut data={chartData} />
      <span>{title}</span>
    </div>
  );
}

export default DonutDet;
