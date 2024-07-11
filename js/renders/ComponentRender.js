import { catchGetAll } from "/js/services/CardServices.js";
import { CardItems } from "/js/setups/CardSetup.js";
import { createChart } from "/js/components/ChartComponent.js";
import { createCard } from "/js/components/CardComponent.js";

async function renderComponent(
  fetchDataFunction,
  titleText,
  container,
  percOrNot,
  id,
  divId
) {
  const data = await fetchDataFunction;
  let parentDiv = document.getElementById(divId);
  // console.log(data);
  if (!parentDiv) {
    let parentNewDiv = document.createElement("div");
    parentNewDiv.setAttribute("id", divId);
    container.appendChild(parentNewDiv);
    parentDiv = document.getElementById(divId);
  }

  if (!data) {
    return;
  }
  if (data.length >= 3) {
    const labels = data.map((item) => item.data);
    const values = data.map((item) => parseFloat(item.valor).toFixed(3));
    createChart(container, labels, values, titleText, id, parentDiv);
  } else {
    data.forEach((item) => {
      const subtitleText = item.data;
      const bodyText = `${parseFloat(item.valor).toFixed(3)}${percOrNot}`;
      const card = createCard(titleText, subtitleText, bodyText, id);
      parentDiv.appendChild(card);
    });
  }
}

// async function renderDatas() {

//   CardItems.forEach(async (element) => {
//     const container = document.querySelector(element.containerSelect);
//     let divId = element.id.substring(element.id, 4);
//     // console.log(divId);
//     if (divId === "card") {
//       let parentDiv = document.createElement("div");
//       divId = element.id.replace(divId, "");
//       parentDiv.setAttribute("id", divId);
//       container.appendChild(parentDiv);
//     } else {
//       divId = element.id.replace(divId + "t", "");
//     }

//     await renderData(
//       getAll(element.url),
//       element.title,
//       container,
//       element.percOrNot,
//       element.id,
//       divId
//     );
//   });
// }

async function renderData() {
  const loadingElement = document.getElementById("loading");
  const contentElement = document.getElementById("content");

  // Show the loading overlay
  loadingElement.style.display = "flex";
  contentElement.style.display = "none";

  await Promise.all(
    CardItems.map(async (element) => {
      const container = document.querySelector(element.containerSelect);
      let divId = element.id.substring(0, 4);
      // console.log(divId);
      if (divId === "char") {
        divId = element.id.replace(divId + "t", "");
      } else {
        divId = element.id.replace(divId, "");
      }
      const awaitGetAll = await catchGetAll(element.url);

      await renderComponent(
        awaitGetAll,
        element.title,
        container,
        element.percOrNot,
        element.id,
        divId
      );
    })
  ).then(() => {
    loadingElement.style.display = "none";
    contentElement.style.display = "flex";
  });
}

export { renderData };
