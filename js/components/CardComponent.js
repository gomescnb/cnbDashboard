import { expand } from "/js/components/shared/ExpandFunction.js";
function createCard(titleText, subtitleText, bodyText, id) {
  const card = document.createElement("div");
  const tooltiptext = document.createElement("span");
  tooltiptext.classList.add("tooltiptext");
  tooltiptext.innerHTML = "Clique para expandir";

  card.classList.add("card");
  card.classList.add("ativocard");

  card.addEventListener("click", () => {
    expand(card, "card", id);
  });
  card.setAttribute("id", id);

  const title = document.createElement("h2");
  title.textContent = titleText;

  const subtitle = document.createElement("h3");
  subtitle.textContent = subtitleText;

  const body = document.createElement("p");
  body.textContent = bodyText;

  card.appendChild(title);
  card.appendChild(subtitle);
  card.appendChild(body);

  card.appendChild(tooltiptext);

  return card;
}

export { createCard };
