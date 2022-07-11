export function createDialog(components) {
  const alertDialog = document.createElement("div");
  alertDialog.setAttribute("class", "alert-dialog");
  alertDialog.setAttribute("id", "alert-dialog");

  window.onclick = function (event) {
    if (event.target == alertDialog) {
      alertDialog.remove();
    }
  };

  const alertContent = document.createElement("div");
  alertContent.setAttribute("class", "alert-content");

  const rowEndEl = document.createElement("div");
  rowEndEl.setAttribute("class", "row-end");

  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("id", "close-btn");
  closeBtn.innerText = "Zamknij";
  closeBtn.addEventListener("click", () => {
    alertDialog.remove();
  });
  rowEndEl.appendChild(closeBtn);

  for (let component of components) {
    const el = document.createElement(component.el);
    for (key in component) {
      if (key === "el") {
        continue;
      }
      if (key === "attributes") {
        for (atrKey in component[key]) {
          el.setAttribute(atrKey, component[key][atrKey]);
        }
      } else if (key === "eventListeners") {
        for (atrKey in component[key]) {
          el.addEventListener(atrKey, component[key][atrKey]);
        }
      } else {
        el[key] = component[key];
      }
    }
    if (component.el === "button") {
      rowEndEl.appendChild(el);
      continue;
    }
    alertContent.appendChild(el);
  }
  alertContent.appendChild(rowEndEl);
  alertDialog.appendChild(alertContent);
  document.body.appendChild(alertDialog);

  return alertDialog;
}
