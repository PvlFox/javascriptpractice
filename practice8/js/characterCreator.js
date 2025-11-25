
export function abilityMod(score) {
  return Math.floor((score - 10) / 2);
}


export function calcHP(hitDie, level, conMod) {
  const first = hitDie + conMod;
  if (level === 1) return first;
  const avg = Math.floor((hitDie / 2) + 1); 
  return first + (level - 1) * (avg + conMod);
}


export function presetStandardArray() {ы
  return [15, 14, 13, 12, 10, 8];
}

function roll4d6() {
  let rolls = [1,1,1,1].map(() => Math.floor(Math.random()*6)+1);
  rolls.sort((a,b)=>a-b);
  return rolls[1] + rolls[2] + rolls[3];
}

export function presetRandomStats() {
  return Array.from({length:6}, () => roll4d6());
}



export function renderCard(dom, data) {
  dom.textContent = `
Имя: ${data.name}
Раса: ${data.race.name}
Класс: ${data.class.name}
Уровень: ${data.level}

Характеристики:
STR ${data.stats.STR} (mod ${abilityMod(data.stats.STR)})
DEX ${data.stats.DEX} (mod ${abilityMod(data.stats.DEX)})
CON ${data.stats.CON} (mod ${abilityMod(data.stats.CON)})
INT ${data.stats.INT} (mod ${abilityMod(data.stats.INT)})
WIS ${data.stats.WIS} (mod ${abilityMod(data.stats.WIS)})
CHA ${data.stats.CHA} (mod ${abilityMod(data.stats.CHA)})

HP: ${data.hp}

Бонус атаки: ${data.attackBonus}
`;
}
