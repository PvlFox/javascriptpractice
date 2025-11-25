const ROOT = "https://www.dnd5eapi.co/api/spells";

export async function getSpells() {
	const res = await fetch(ROOT);
	return res.json();
}

export async function getSpellInfo(id) {
	const res = await fetch(`${ROOT}/${id}`);
	return res.json();
}