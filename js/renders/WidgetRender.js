import { widgets } from "/js/setups/WidgetSetup.js";
const reloadWidgets = (theme) => {
  widgets.forEach((widget) => {
    const container = document.getElementById(`${widget.id}-widget`);
    container.innerHTML = "";
    const script = document.createElement("script");
    script.id = `${widget.id}-script`;
    script.type = "text/javascript";
    script.src = widget.url;
    script.async = true;
    script.innerHTML = JSON.stringify(widget.getConfig(theme));
    container.appendChild(script);
  });
};

export { reloadWidgets };
