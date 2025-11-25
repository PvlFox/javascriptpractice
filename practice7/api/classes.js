const ROOT = "https://www.dnd5eapi.co/api/classes";

export async function getClasses() {
	const res = await fetch(ROOT);
	return res.json();
}

export async function getClassInfo(id) {
	const res = await fetch(`${ROOT}/${id}`);
	return res.json();
}