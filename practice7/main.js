import { state } from "./state.js";

import { getSpells, getSpellInfo } from "./api/spells.js";
import { getMonsters, getMonsterInfo } from "./api/monsters.js";
import { getEquipment, getEquipmentInfo } from "./api/equipment.js";
import { getClasses, getClassInfo } from "./api/classes.js";
import { getConditions, getConditionInfo } from "./api/conditions.js";

import { renderList } from "./ui/renderList.js";
import { renderDetails } from "./ui/renderDetails.js";
import { showLoader, hideLoader } from "./ui/loader.js";

const categoryEl = document.getElementById("category");
const searchEl = document.getElementById("search");
const listEl = document.getElementById("list");
const detailsEl = document.getElementById("details");
const loaderEl = document.getElementById("loader");

const API_MAP = {
    spells: [getSpells, getSpellInfo],
    monsters: [getMonsters, getMonsterInfo],
    equipment: [getEquipment, getEquipmentInfo],
    classes: [getClasses, getClassInfo],
    conditions: [getConditions, getConditionInfo],
};

async function loadList() {
    showLoader(loaderEl);
    try {
        const [fetchList] = API_MAP[state.category];
        const data = await fetchList();
        state.list = Array.isArray(data?.results) ? data.results : [];

        const term = (searchEl.value || "").toLowerCase();
        const filtered = !term
            ? state.list
            : state.list.filter((i) => (i.name || "").toLowerCase().includes(term));

        renderList(filtered, listEl);
    } catch (e) {
        renderList([], listEl);
        detailsEl.innerHTML = `<p>Ошибка загрузки: ${String(e)}</p>`;
    } finally {
        hideLoader(loaderEl);
    }
}

async function loadDetails(id) {
    try {
        const [, fetchDetails] = API_MAP[state.category];
        const data = await fetchDetails(id);
        state.selected = data;
        renderDetails(data, detailsEl);
    } catch (e) {
        renderDetails({ name: "Ошибка", desc: String(e) }, detailsEl);
    }
}

categoryEl.addEventListener("change", () => {
    state.category = categoryEl.value;
    loadList();
});

searchEl.addEventListener("input", () => {
    loadList();
});

listEl.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    loadDetails(item.dataset.id);
});

loadList();