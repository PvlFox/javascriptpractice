const hero = {
  name: prompt("Введите имя героя: "),
  age: Number(prompt("Введите ваш возраст:")),
  hasSwordLicense: prompt("Есть ли у вас лицензия на меч? (true/false):") === "true",
  hasArmor: prompt("Есть ли у вас броня? (true/false):") === "true",
  powerLevel: Number(prompt("Введите уровень вашей силы (1-100):")),

  // Метод проверки допуска к бою
  canFight: function () {
    return this.age >= 18 && this.hasSwordLicense && this.powerLevel >= 30;
  },

  // Метод результата боя
  getBattleResult: function () {
    if (this.powerLevel >= 80 && this.hasArmor) {
      return "Поздравляем! Вы победили дракона!";
    } else {
      return "Увы, вы проиграли в битве с драконом...";
    }
  },

  // Метод расчета очков героя
  calculatePoints: function () {
    let points = this.powerLevel;

    if (this.hasSwordLicense) points += 10;
    if (this.hasArmor) points += 20;
    if (this.age >= 50) points -= 10;

    return points;
  },

  // Метод получения титула героя
  getTitle: function () {
    const points = this.calculatePoints();

    if (points >= 120) return "Легендарный герой";
    if (points >= 80) return "Мастер меча";
    if (points >= 50) return "Опытный воин";
    return "Новичок";
  }
};

// Запуск сценария 

if (!hero.canFight()) {
  console.log(`${hero.name}, вы слишком слабы и не можете участвовать в бою!`);
} else {
  console.log(`${hero.name}, вы допущены к бою с драконом!`);
  console.log(hero.getBattleResult());
}

// Подсчет очков и титула
const heroPoints = hero.calculatePoints();
const title = hero.getTitle();

console.log(`Ваши очки героя: ${heroPoints}`);
console.log(`Ваш титул: ${title}`);
