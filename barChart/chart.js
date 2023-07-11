import barChartData from './barChartData.js'

let { newBarChartData, newBarChartDataLabel, daysArr, newBarChartLabel, maxYAxis } = barChartData;

const ctx1 = document.getElementById("myBarChart");

new Chart(ctx1, {
  type: "bar",
  data: {
    labels: newBarChartLabel,
    datasets: [
      {
        label: "Overall duration in days:247 Days",
        data: newBarChartData,
        endLabelData: newBarChartDataLabel,
        daysData: daysArr,
        fill: false,
        backgroundColor: [
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
        ],
        borderColor: [
          "rgba(890, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
          "rgba(252, 248, 176, 1)",
        ],
        hoverBackgroundColor: "rgba(200, 201, 213, 0.65)",
        hoverBorderColor: "rgba(200, 201, 213, 0.65)",
        borderWidth: 1,
        borderSkipped: false,
      },
    ],
  },
  plugins: [ChartDataLabels],
  options: {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "Avenir Next regular",
          },
        },
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        anchor: 'end',
        align: 'right',
        formatter: (value, context) => {
          return `${context.dataset.daysData[context.dataIndex]} Days | ₹ ${context.dataset.endLabelData[context.dataIndex]}`
        }
      }
    },
    indexAxis: "y",
    scales: {
      x: {
        max: maxYAxis,
        grid: {
          drawOnChartArea: false
        }
      },
      y: {
        max: maxYAxis,
        grid: {
          drawOnChartArea: false
        }
      },
    },
  },
});
