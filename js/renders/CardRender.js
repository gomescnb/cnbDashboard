import { getAll } from "/js/services/CardServices.js";
import { CardItems } from "/js/setups/CardSetup.js";
function createCard(titleText, bodyText) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = titleText;

  const body = document.createElement("p");
  body.textContent = bodyText;

  card.appendChild(title);
  card.appendChild(body);

  return card;
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

  data.forEach((item) => {
    const bodyText = `Último valor: ${parseFloat(item.valor).toFixed(
      3
    )}${percOrNot} - (${item.data})`;
    const card = createCard(titleText, bodyText);
    container.appendChild(card);
  });
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
