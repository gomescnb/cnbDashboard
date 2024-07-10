import { expand } from "/js/Index.js";

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

  const isDarkMode = document.body.classList.contains("dark-mode");
  let textColor = isDarkMode ? "#fff" : "#000";
  const gridColor = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  new Chart(canvas, {
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
          color: textColor,
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
            color: textColor,
            font: {
              size: 12,
              family:
                '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif',
            },
          },
        },
        y: {
          grid: {
            color: gridColor,
          },
          ticks: {
            beginAtZero: true,
            color: textColor,
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
}

export { createChart };
