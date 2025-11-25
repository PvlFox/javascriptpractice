

const BASE = "https://www.dnd5eapi.co/api/"; 

const memoryCache = {
  classes: null,
  races: null
};


async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error("Ресурс не найден (404)");
      if (res.status >= 500) throw new Error("Ошибка сервера, попробуйте позже");
      throw new Error("Ошибка запроса");
    }
    return await res.json();
  } catch (err) {
    throw new Error("Сетевая ошибка: " + err.message);
  }
}


export async function getList(resource) {
  if (memoryCache[resource]) return memoryCache[resource];

  const url = BASE + resource;
  const data = await fetchJSON(url);

  memoryCache[resource] = data.results;
  return data.results;
}


export async function getByUrl(url) {
  if (url.startsWith("http")) return await fetchJSON(url);
  if (url.startsWith("/")) return await fetchJSON("https://www.dnd5eapi.co" + url);
  return await fetchJSON(BASE + url);
}
