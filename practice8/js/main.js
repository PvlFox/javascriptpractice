

import { getList, getByUrl } from "./apiClient.js";
import { abilityMod, calcHP, presetStandardArray, presetRandomStats, renderCard } from "./characterCreator.js";
import { saveCharacter, loadCharacter } from "./storage.js";

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const raceSelect = document.getElementById("race-select");
const classSelect = document.getElementById("class-select");
const statsContainer = document.getElementById("stats");
const card = document.getElementById("card");

const statNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
statNames.forEach(s => {
  const label = document.createElement("label");
  label.innerHTML = `${s}: <input id="stat-${s}" type="number" min="3" max="18" value="10">`;
  statsContainer.append(label);
});


init();

async function init() {
  try {
    error.classList.add("hidden");
    loading.classList.remove("hidden");

    const races = await getList("races");
    const classes = await getList("classes");

    fillSelect(raceSelect, races);
    fillSelect(classSelect, classes);
  } catch (e) {
    showError("Ошибка загрузки списков: " + e.message);
    console.error(e);
  } finally {
    loading.classList.add("hidden");
  }
}


function fillSelect(select, items) {
  select.innerHTML = "";
  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.index;
    opt.textContent = item.name;
    opt.dataset.url = item.url; 
    select.append(opt);
  });
}

function showError(msg) {
  error.textContent = msg;
  error.classList.remove("hidden");
}

async function buildCharacter() {
  const name = document.getElementById("char-name").value;
  const level = Number(document.getElementById("level").value);

  if (!name.trim()) throw new Error("Введите имя персонажа");

  const raceOption = raceSelect.selectedOptions[0];
  const classOption = classSelect.selectedOptions[0];

  const raceUrl = raceOption.dataset.url;
  const classUrl = classOption.dataset.url;

  const race = await getByUrl(raceUrl);
  const clazz = await getByUrl(classUrl);

  const stats = {};
  statNames.forEach(s => {
    const val = Number(document.getElementById(`stat-${s}`).value);
    if (val < 3 || val > 18) throw new Error(`Значение ${s} должно быть от 3 до 18`);
    stats[s] = val;
  });

  const conMod = abilityMod(stats.CON);
  const hp = calcHP(clazz.hit_die, level, conMod);
  const profBonus = Math.ceil(level / 4) + 1;
  const attackBonus = profBonus + abilityMod(stats.STR);

  return {
    name,
    level,
    stats,
    race,
    class: clazz,
    hp,
    attackBonus
  };
}


document.getElementById("save-btn").addEventListener("click", async () => {
  try {
    const char = await buildCharacter();
    saveCharacter(char);
    renderCard(card, char);
  } catch (e) {
    showError(e.message);
    console.error(e);
  }
});


document.getElementById("load-last-btn").addEventListener("click", () => {
  const data = loadCharacter();
  if (data) renderCard(card, data);
  else showError("Нет сохранённых персонажей");
});


document.getElementById("preset-standard").addEventListener("click", () => {
  const arr = presetStandardArray();
  statNames.forEach((s, i) => {
    document.getElementById(`stat-${s}`).value = arr[i];
  });
});

document.getElementById("preset-random").addEventListener("click", () => {
  const arr = presetRandomStats();
  statNames.forEach((s, i) => {
    document.getElementById(`stat-${s}`).value = arr[i];
  });
});
