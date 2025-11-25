
export function renderDetails(data, container) {
    if (!data) {
        container.innerHTML = "<em>Нет данных</em>";
        return;
    }

    const name = data.name ?? "Без имени";


    let descHtml = "<p>Нет описания</p>";
    if (Array.isArray(data.desc)) {
        descHtml = data.desc.map((p) => `<p>${p}</p>`).join("");
    } else if (typeof data.desc === "string") {
        descHtml = `<p>${data.desc}</p>`;
    }


    const meta = [];

    addMeta(meta, "Тип", data.type);
    addMeta(meta, "Размер", data.size);
    addMeta(meta, "Уровень", data.level);
    addMeta(meta, "Школа", data.school?.name);
    addMeta(meta, "Дистанция", data.range);
    addMeta(meta, "Класс доспеха", data.armor_class);
    addMeta(meta, "Хиты", data.hit_points);
    addMeta(meta, "Стоимость", data.cost?.quantity && data.cost?.unit
        ? `${data.cost.quantity} ${data.cost.unit}`
        : null);
    addMeta(meta, "Вес", data.weight);

    const metaHtml =
        meta.length > 0
            ? `<div class="meta">${meta
                  .map((m) => `<div><div class="k">${m.k}</div><div class="v">${escapeHtml(m.v)}</div></div>`)
                  .join("")}</div>`
            : "";


    const tags = [];

    if (Array.isArray(data.components)) tags.push(...data.components);
    if (Array.isArray(data.damage_types)) tags.push(...data.damage_types.map((d) => d.name));
    if (Array.isArray(data.classes)) tags.push(...data.classes.map((c) => c.name));

    const tagsHtml =
        tags.length > 0
            ? `<div class="tags">${tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>`
            : "";

    container.innerHTML = `
        <div class="card">
            <h2>${escapeHtml(name)}</h2>

            ${metaHtml}
            ${tagsHtml}

            <div class="desc">${descHtml}</div>

            <details>
                <summary>Показать сырой JSON</summary>
                <pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>
            </details>
        </div>
    `;
}


function addMeta(arr, k, v) {
    if (v != null && v !== "") arr.push({ k, v: String(v) });
}

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
