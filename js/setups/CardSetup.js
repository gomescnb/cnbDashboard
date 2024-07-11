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

const CardItems = [
  {
    title: "Gráfico - IGP-M",
    url: `https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados/?formato=json&dataInicial=${DataPassada1}`,
    containerSelect: ".container",
    percOrNot: "%",
    id: "chartigpm", //"chart"+ "nome do objeto" serve pra fazer o toggle, se nao colocar os nomes de card e chart correspondentes, não vai funcionar!
  },
  {
    title: "Gráfico - CDI Anual",
    url: `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/?formato=json&dataInicial=${DataPassada1}`,
    containerSelect: ".container",
    percOrNot: "%",
    id: "chartcdianual",
  },
  {
    title: "Gráfico - CDI Diário",
    url: `https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/?formato=json&dataInicial=${DataPassada1}`,
    containerSelect: ".container",
    percOrNot: "%",
    id: "chartcdidiario",
  },
  {
    title: "IGP-M",
    url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados/ultimos/?formato=json",
    containerSelect: ".container",
    percOrNot: "%",
    id: "cardigpm",
  },
  {
    title: "CDI - Diário",
    url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/ultimos/?formato=json",
    containerSelect: ".container",
    percOrNot: "%",
    id: "cardcdidiario",
  },
  {
    title: "CDI - Anual",
    url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/?formato=json",
    containerSelect: ".container",
    percOrNot: "%",
    id: "cardcdianual",
  },
];

export { CardItems };
