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
  // console.log("antes do if" + responseGetAll);
  if (responseGetAll instanceof Error) {
    while (responseGetAll instanceof Error) {
      responseGetAll = await getAll(url);
    }
    // console.log(responseGetAll);
  }
  return responseGetAll;
}
//data de hoje
const DataHoje = new Date();

//
// * Calcula a data que está um certo número de meses atrás e a retorna no formato "DD/MM/AAAA".
// * @param {number} mesesAtras - O número de meses atrás da data atual.
// * @return {string} A data calculada no formato "DD/MM/AAAA".
//
const mesesAtras = 12;
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

  let monthlyIndices = {};
  data.forEach((entry) => {
    const dateParts = entry.data.split("/");
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    const mesAno = `${month}-${year}`;
    const value = parseFloat(entry.valor);

    if (!monthlyIndices[mesAno]) {
      monthlyIndices[mesAno] = { total: 0, count: 0, year: year };
    }

    monthlyIndices[mesAno].total += value;
    monthlyIndices[mesAno].count++;
  });

  const currentYear = DataHoje.getFullYear();
  const accumulatedYearly = {};
  const accumulated12Months = [];

  // Loop from December to January
  for (let month = 12; month >= 1; month--) {
    const mesAno = `${month}-${currentYear}`;
    const currentMonthData = monthlyIndices[mesAno] || { total: 0, count: 0 };
    const monthlyIndex = currentMonthData.count > 0
      ? (currentMonthData.total / currentMonthData.count).toFixed(4)
      : 0;

    if (!accumulatedYearly[currentYear]) {
      accumulatedYearly[currentYear] = { total: 0 };
    }

    accumulatedYearly[currentYear].total += parseFloat(monthlyIndex);
    const accumulatedIndexYear = accumulatedYearly[currentYear].total.toFixed(4);

    accumulated12Months.push(parseFloat(monthlyIndex));
    if (accumulated12Months.length > 12) {
      accumulated12Months.shift();
    }
    const accumulatedIndex12Months = accumulated12Months
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(4);

    const monthName = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    }).format(new Date(0, month - 1));

    const row = `<tr>
          <td>${monthName.charAt(0).toUpperCase() + monthName.slice(1)}/${currentYear}</td>
          <td>${String(monthlyIndex).replace(".", ",")}</td>
          <td>${String(accumulatedIndexYear).replace(".", ",")}</td>
          <td>${String(accumulatedIndex12Months).replace(".", ",")}</td>
      </tr>`;

    tableBody.innerHTML += row;
  }
}

populateTable();

