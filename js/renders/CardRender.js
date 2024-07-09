import { getAll } from "/js/services/CardServices.js";
import { CardItems } from "/js/setups/CardSetup.js";

function createCard(titleText, subtitleText, bodyText) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = titleText;

  const subtitle = document.createElement("h3");
  subtitle.textContent = subtitleText;

  const body = document.createElement("p");
  body.textContent = bodyText;

  card.appendChild(title);
  card.appendChild(subtitle);
  card.appendChild(body);

  return card;
}

function createChart(container, labels, data, title) {
  const chartContainer = document.createElement("div");
  chartContainer.classList.add("chart-container");

  const canvas = document.createElement("canvas");
  chartContainer.appendChild(canvas);
  container.appendChild(chartContainer);

  const isDarkMode = document.body.classList.contains("dark-mode");
  const textColor = isDarkMode ? "#fff" : "#000";
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

async function renderData(
  fetchDataFunction,
  titleText,
  containerSelector,
  percOrNot
) {
  const container = document.querySelector(containerSelector);
  const data = await fetchDataFunction;

  if (!data) {
    return;
  }

  if (data.length >= 3) {
    const labels = data.map((item) => item.data);
    const values = data.map((item) => parseFloat(item.valor).toFixed(3));
    createChart(container, labels, values, titleText);
  } else {
    data.forEach((item) => {
      const subtitleText = item.data;
      const bodyText = `${parseFloat(item.valor).toFixed(3)}${percOrNot}`;
      const card = createCard(titleText, subtitleText, bodyText);
      container.appendChild(card);
    });
  }
}

async function renderDatas() {
  CardItems.forEach(async (element) => {
    await renderData(
      getAll(element.url),
      element.title,
      element.containerSelect,
      element.percOrNot
    );
  });
}

export { renderDatas };
