import { getAll } from "/js/services/CardServices.js";
import { CardItems } from "/js/setups/CardSetup.js";
import { createChart } from "/js/components/ChartComponent.js";
import { createCard } from "/js/components/CardComponent.js";

async function renderData(
  fetchDataFunction,
  titleText,
  container,
  percOrNot,
  id,
  divId
) {

  const data = await fetchDataFunction;
  const parentDiv = document.getElementById(divId);


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

async function renderDatas() {
  CardItems.forEach(async (element) => {
    const container = document.querySelector(element.containerSelect);
    let divId = element.id.substring(element.id, 4);
    // console.log(divId);
    if (divId === "card") {
      let parentDiv = document.createElement("div");
      divId = element.id.replace(divId, "");
      parentDiv.setAttribute("id", divId);
      container.appendChild(parentDiv);
    }else {
      divId = element.id.replace(divId + "t", "");
    }
    console.log(divId);
    
    await renderData(
      getAll(element.url),
      element.title,
      container,
      element.percOrNot,
      element.id,
      divId
    );
  });
}

export { renderDatas };
