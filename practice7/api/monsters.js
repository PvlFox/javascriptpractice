const ROOT = "https://www.dnd5eapi.co/api/monsters";

export async function getMonsters() {
	const res = await fetch(ROOT);
	return res.json();
}

export async function getMonsterInfo(id) {
	const res = await fetch(`${ROOT}/${id}`);
	return res.json();
}