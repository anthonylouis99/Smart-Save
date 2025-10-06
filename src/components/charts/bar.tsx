
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar,
  // Line,
  Pie,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Bubble, } from "react-chartjs-2";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function AnimatedBarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 79, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Monthly Sales" },
    },
  };

  return <Bar data={data} options={options} />;
}

export function AnimatedPieChart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#71f89cff", "#fabf60ff", "#15b9faff"],
      },
    ],
  };

  return <Pie data={data} />;
}


export function AnimatedDoughnutChart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#71f89cff", "#fabf60ff", "#15b9faff"],
      },
    ],
  };

  return <Doughnut data={data} />;
}

export function AnimatedPolarAreaChart() {
  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(201, 203, 207, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Polar Area Chart" },
    },
  };

  return <PolarArea data={data} options={options} />;
}

export function AnimatedRadarChart() {
  const data = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Radar Chart" },
    },
    elements: {
      line: { borderWidth: 3 },
    },
  };

  return <Radar data={data} options={options} />;
}

export function AnimatedScatterChart() {
  const data = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: Array.from({ length: 20 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Scatter Chart" },
    },
    scales: {
      x: { type: "linear" as const, position: "bottom" as const },
    },
  };

  return <Scatter data={data} options={options} />;
}

export function AnimatedBubbleChart() {
  const data = {
    datasets: [
      {
        label: "Bubble Dataset",
        data: Array.from({ length: 20 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 20 + 5,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Bubble Chart" },
    },
    scales: {
      x: { type: "linear" as const, position: "bottom" as const },
    },
  };

  return <Bubble data={data} options={options} />;
}

// export const AnimatedLineChart = () => {
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],

//     datasets: [
//       {
//         label: "My First dataset",
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         borderCapStyle: "butt" as const,
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: "miter" as const,
//         pointBorderColor: "rgba(75,192,192,1)",
//         pointBackgroundColor: "#fff",
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: "rgba(75,192,192,1)",
//         pointHoverBorderColor: "rgba(220,220,220,1)",
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [65, 59, 80, 81, 56, 55, 40],
//       },
//       {
//         label: "My Second dataset",
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: "rgba(153,102,255,0.4)",
//         borderColor: "rgba(153,102,255,1)",
//         borderCapStyle: "butt",
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: "miter",
//         pointBorderColor: "rgba(153,102,255,1)",
//         pointBackgroundColor: "#fff",
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: "rgba(153,102,255,1)",
//         pointHoverBorderColor: "rgba(220,220,220,1)",
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [28, 48, 40, 19, 86, 27, 90],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Line Chart Example" },
//     },
//   };

//   return <Line data={data} options={options} />;
// };  



