
function expand(element, type, id) {
    element.classList.toggle("ativo" + type);
    let thisId = id.replace(type, "");
    let otherType = type === "card" ? "chart" : "card";
  
    switch (type) {
      case "card":
        thisId = "chart" + thisId;
        break;
      case "chart":
        thisId = "card" + thisId;
        break;
    }
  
    const otherElement = document.getElementById(thisId);
  
    if (element.classList.contains("ativo" + type)) {
      otherElement.classList.add("desativado" + otherType);
      element.classList.remove("desativado" + type);
    } else {
      otherElement.classList.remove("desativado" + otherType);
      element.classList.add("desativado" + type);
    }
  
    otherElement.classList.toggle("ativo" + otherType);
  }
  
  export { expand };