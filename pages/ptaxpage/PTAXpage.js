document.addEventListener("DOMContentLoaded", function () {
  fetch("https://cnbnode.vercel.app/proxy")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n");

      // Extract the "Data" field from the first row
      const firstRow = rows[1].split(";");
      const dataField = firstRow[0];

      // Create an <h1> element and set its content
      const h1 = document.createElement("h3");
      h1.textContent = `Data: ${dataField}`;
      document.getElementById("content").innerHTML = "";
      document.getElementById("content").appendChild(h1);

      const table = document.createElement("table");
      table.classList.add("styled-table");

      // Create table header
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      const headers = [
        "Cod Moeda",
        "Tipo",
        "Moeda",
        "Taxa Compra",
        "Taxa Venda",
        "Paridade Compra",
        "Paridade Venda",
      ]; // Adjust headers based on your CSV format
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");

      const currencies = [
        "USD",
        "EUR",
        "JPY",
        "GBP",
        "DKK",
        "NOK",
        "AUD",
        "CHF",
        "SEK",
        "CAD",
      ];

      rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row if present in CSV
        const cells = row.split(";");
        if (currencies.includes(cells[3])) {
          // Check if the 4th cell is in the list of currencies
          const tr = document.createElement("tr");
          cells.slice(1).forEach((cell) => {
            // Remove the first cell (Data field)
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        }
      });

      table.appendChild(tbody);
      document.getElementById("content").appendChild(table);
    })
    .catch((error) => {
      document.getElementById("content").innerHTML = "Error loading content.";
      console.error("Error fetching the CSV content:", error);
    });
});
