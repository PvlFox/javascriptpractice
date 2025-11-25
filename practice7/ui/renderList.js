export function renderList(items, container) {
	container.innerHTML = items
		.map((i) => `<li class="item" data-id="${i.index}">${i.name}</li>`) 
		.join("");
}