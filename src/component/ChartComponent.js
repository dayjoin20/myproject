import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,);

export default function ChartComponent({
  title = '',
  showTitle = true,
  legendPosition = 'top',
  labels = [],
  datasets = [],
}) {

  const chartRef = useRef();
  const [chartData, setChartData] = useState({ datasets: [], });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      responsive: true,
      plugins: {
        title: {
          display: showTitle,
          text: title,
          font: {
            size: 18,
            family: 'tahoma',
            weight: 'normal',
            style: 'italic',
            color: 'red',
          },
          padding: {
            top: 10,
            bottom: 15
          },
        },
      },
      legend: {
        position: legendPosition,
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          },
          suggestedMin: -10,
          suggestedMax: 200
        }
      }
    });
  }, []);

  useEffect(() => {
    setChartData({
      labels,
      datasets,
    });

    chartRef.current.update?.();
  }, [labels, datasets]);

  return (
    <Line ref={chartRef} options={chartOptions} data={chartData} />
  );
}