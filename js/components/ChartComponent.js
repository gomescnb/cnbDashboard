import { expand } from "/js/components/shared/ExpandFunction.js";

function createChart(container, labels, data, title, id, parentDiv) {
  const chartContainer = document.createElement("div");

  const tooltiptext = document.createElement("span");
  tooltiptext.classList.add("tooltiptext");
  tooltiptext.innerHTML = "Clique para recolher";

  chartContainer.classList.add("chart-container");
  chartContainer.classList.add("desativadochart");
  chartContainer.setAttribute("id", id);
  chartContainer.addEventListener("click", () => {
    expand(chartContainer, "chart", id);
  });
  const canvas = document.createElement("canvas");
  chartContainer.appendChild(canvas);
  chartContainer.appendChild(tooltiptext);
  parentDiv.appendChild(chartContainer);

  const lightColor = "#fff";
  const darkColor = "#000";
  const lightGrid = "rgba(255, 255, 255, 0.1)";
  const darkGrid = "rgba(0, 0, 0, 0.1)";
  console.log("RAMON");

  const myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          pointBackgroundColor: "#1a8d3c",
          pointBorderColor: "#29cc6d",
          pointBorderWidth: 1,
          pointRadius: 4,
          tension: 0, // for smooth curves
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: "#000",
          font: {
            size: 20,
            family:
              '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif',
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
            color: "#000",
            font: {
              size: 12,
              family:
                '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif',
            },
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            beginAtZero: true,
            color: "#000",
            font: {
              size: 12,
              family:
                '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif',
            },
          },
        },
      },
    },
  });
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const toDarkMode = myChart.options.scales.x.ticks.color === lightColor;
    if (toDarkMode) {
      myChart.options.scales.x.ticks.color = darkColor;
      myChart.options.scales.y.ticks.color = darkColor;
      myChart.options.plugins.title.color = darkColor;
      // myBarChart.options.scales.x.grid.color = darkGrid;
      // myBarChart.options.scales.y.grid.color = darkGrid;
    } else {
      myChart.options.scales.x.ticks.color = lightColor;
      myChart.options.scales.y.ticks.color = lightColor;
      myChart.options.plugins.title.color = lightColor;
      // myBarChart.options.scales.x.grid.color = lightGrid;
      // myBarChart.options.scales.y.grid.color = lightGrid;
    }

    myChart.update();
  });
}

export { createChart };
