// === Ввод данных героя ===
const hero = {
  name: prompt("Введите имя героя: "),
  age: Number(prompt("Введите ваш возраст:")),
  hasSwordLicense: prompt("Есть ли у вас лицензия на меч? (true/false):") === "true",
  hasArmor: prompt("Есть ли у вас броня? (true/false):") === "true",
  powerLevel: Number(prompt("Введите уровень вашей силы (1-100):")),

  // Новые свойства
  level: 1,
  gold: 0,
  completedQuests: [],

  // Методы
  canFight: function () {
    return this.age >= 18 && this.hasSwordLicense && this.powerLevel >= 30;
  },

  getBattleResult: function () {
    if (this.powerLevel >= 80 && this.hasArmor) {
      return "Поздравляем! Вы победили дракона!";
    } else {
      return "Увы, вы проиграли в битве с драконом...";
    }
  },

  calculatePoints: function () {
    let points = this.powerLevel;
    if (this.hasSwordLicense) points += 10;
    if (this.hasArmor) points += 20;
    if (this.age >= 50) points -= 10;
    return points;
  },

  getTitle: function () {
    const points = this.calculatePoints();
    if (points >= 120) return "Легендарный герой";
    if (points >= 80) return "Мастер меча";
    if (points >= 50) return "Опытный воин";
    return "Новичок";
  },

  // Метод добавления квеста с шансом провала
  addQuest: function (questName, reward) {
    // Шанс успеха зависит от силы героя, максимум 95%
    const successChance = Math.min(this.powerLevel / 100, 0.95);
    if (Math.random() < successChance) {
      this.completedQuests.push(questName);
      this.gold += reward;
      console.log(`Квест выполнен: ${questName} (+${reward} золота)`);

      if (this.gold >= 50) {
        this.levelUp();
        this.gold -= 50;
      }
    } else {
      console.log(`Квест провален: ${questName} :(`);
    }
  },

  levelUp: function () {
    this.level++;
    console.log("🎉 Герой повышает уровень!");
  },

  showStats: function () {
    console.log("\n--- Результат ---");
    console.log(`Имя: ${this.name}`);
    console.log(`Возраст: ${this.age}`);
    console.log(`Уровень: ${this.level}`);
    console.log(`Уровень силы: ${this.powerLevel}`);
    console.log(`Золото: ${this.gold}`);
    console.log(`Количество выполненных квестов: ${this.completedQuests.length}`);
    console.log(`Выполненные квесты: ${this.completedQuests.join(", ")}`);
  }
};

// Квесты
const quests = [
  { name: "Убить крыс в подвале", reward: 5 },
  { name: "Спасти кота из дерева", reward: 10 },
  { name: "Сопроводить торговца", reward: 20 },
  { name: "Победить гоблинов", reward: 50 },
  { name: "Разгадать древнюю загадку", reward: 70 },
];

console.log("\n--- Герой приступает к квестам ---");
for (let quest of quests) {
  hero.addQuest(quest.name, quest.reward);
}

hero.showStats();
