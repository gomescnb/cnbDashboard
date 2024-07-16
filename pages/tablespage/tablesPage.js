async function getAll(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Error("abobrinha");
  }
}

async function catchGetAll(url) {
  let responseGetAll = await getAll(url);
  if (responseGetAll instanceof Error) {
    while (responseGetAll instanceof Error) {
      responseGetAll = await getAll(url);
    }
  }
  return responseGetAll;
}

const DataHoje = new Date();

const mesesAtras = 25; // Fetch data from 25 months back to ensure we have enough data
const DataPassada = (mesesAtras) => {
  const date = new Date(DataHoje);
  date.setMonth(date.getMonth() - mesesAtras);
  date.setDate(1);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const ano = date.getFullYear();
  return `${dia}/${mes.toString().padStart(2, "0")}/${ano}`;
};
const DataPassada1 = DataPassada(mesesAtras);

const tableItems = [
  {
    title: "Tabela IGPM",
    url: `https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados/?formato=json&dataInicial=${DataPassada1}`,
    id: "tableigpm",
  },
];

async function populateTable() {
  const url = tableItems[0].url;
  const data = await catchGetAll(url);

  const tableBody = document.getElementById("table-body");

  // Parse the data into a more useful structure
  const monthlyIndices = {};
  data.forEach((entry) => {
    const [day, month, year] = entry.data.split("/").map(Number);
    const mesAno = `${month}-${year}`;
    const value = parseFloat(entry.valor);

    if (!monthlyIndices[mesAno]) {
      monthlyIndices[mesAno] = { total: 0, count: 0 };
    }

    monthlyIndices[mesAno].total += value;
    monthlyIndices[mesAno].count++;
  });

  // Initialize accumulation structures
  const accumulatedYearly = {};
  const accumulated12Months = [];
  let accumulatedIndexYear = 0;

  // Loop through the last 12 months
  for (let i = 12; i > 0; i--) {
    const date = new Date(DataHoje);
    date.setMonth(date.getMonth() - i);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const mesAno = `${month}-${year}`;
    const currentMonthData = monthlyIndices[mesAno] || { total: 0, count: 0 };
    const monthlyIndex =
      currentMonthData.count > 0
        ? (currentMonthData.total / currentMonthData.count).toFixed(4)
        : "0.0000";

    // Accumulate indices for the year
    if (!accumulatedYearly[year]) {
      accumulatedYearly[year] = { total: 0 };
    }

    accumulatedYearly[year].total += parseFloat(monthlyIndex);
    accumulatedIndexYear = accumulatedYearly[year].total.toFixed(4);

    // Add to the accumulated 12 months array
    accumulated12Months.push({ month, year, value: parseFloat(monthlyIndex) });

    // Calculate accumulated index for the last 12 months
    if (accumulated12Months.length > 12) {
      accumulated12Months.shift();
    }
    const accumulatedIndex12Months = accumulated12Months
      .reduce((acc, curr) => acc + curr.value, 0)
      .toFixed(4);

    // Get the month name
    const monthName = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    }).format(new Date(year, month - 1));

    // Create and append the table row
    const row = `<tr>
          <td>${
            monthName.charAt(0).toUpperCase() + monthName.slice(1)
          }/${year}</td>
          <td>${monthlyIndex.replace(".", ",")}</td>
          <td>${String(accumulatedIndexYear).replace(".", ",")}</td>
          <td>${String(accumulatedIndex12Months).replace(".", ",")}</td>
      </tr>`;
    tableBody.innerHTML += row;
  }
}

populateTable();
