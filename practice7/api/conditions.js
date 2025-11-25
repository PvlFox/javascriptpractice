const ROOT = "https://www.dnd5eapi.co/api/conditions";

export async function getConditions() {
	const res = await fetch(ROOT);
	return res.json();
}

export async function getConditionInfo(id) {
	const res = await fetch(`${ROOT}/${id}`);
	return res.json();
}