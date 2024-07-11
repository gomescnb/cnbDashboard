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
export { catchGetAll };
