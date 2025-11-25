const ROOT = "https://www.dnd5eapi.co/api/equipment";

export async function getEquipment() {
	const res = await fetch(ROOT);
	return res.json();
}

export async function getEquipmentInfo(id) {
	const res = await fetch(`${ROOT}/${id}`);
	return res.json();
}