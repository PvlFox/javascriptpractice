// Задание 4
let book = {
  title: "1984",
  author: "Джордж Оруэлл",
  year: 1949,
  isRead: false,

  toggleReadStatus: function() {
    this.isRead = !this.isRead;
  }
};

console.log("Информация о книге:");
for (let key in book) {
  if (typeof book[key] !== "function") {
    console.log(`${key}: ${book[key]}`);
  }
}

book.toggleReadStatus();

console.log("\nИнформация о книге:");
for (let key in book) {
  if (typeof book[key] !== "function") {
    console.log(`${key}: ${book[key]}`);
  }
}

console.log("\n\n\n     ")

// Задание 5 
const quadEq = {
 
  // Проверка на нулевые коэффициенты
  solve: function(a, b, c) {
    if (a === 0) {
      if (b === 0) {
        return {
          D: null,
          roots: [],
          message: "Это не уравнение"
        };
      } else {
        const x = -c / b;
        return {
          D: null,
          roots: [x],
          message: "Линейное уравнение"
        };
      }
    }

    const discriminant = b * b - 4 * a * c;
    let roots = [];

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      roots = [x1, x2];
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      roots = [x];
    }

    return {
      D: discriminant,
      roots: roots
    };
  },


   // Метод форматирования уравнения

  formatEquation: function(a, b, c) {
    let parts = [];

    if (a !== 0) {
      parts.push(`${a === 1 ? "" : a === -1 ? "-" : a}x²`);
    }

    if (b !== 0) {
      const sign = b > 0 ? "+" : "-";
      parts.push(`${sign} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`);
    }

    if (c !== 0) {
      const sign = c > 0 ? "+" : "-";
      parts.push(`${sign} ${Math.abs(c)}`);
    }

    if (parts.length === 0) return "0";

    return parts.join(" ").replace(/\+ -/g, "- ") + " = 0";
  },


  showResult: function(a, b, c) {
    const result = this.solve(a, b, c);
    const equationStr = this.formatEquation(a, b, c);

    console.log(`Уравнение: ${equationStr}`);
    if (result.message) {
      console.log(result.message);
      if (result.roots.length > 0) {
        console.log(`Решение: x = ${result.roots[0]}`);
      }
      return;
    }

    console.log(`Дискриминант: ${result.D}`);

    if (result.roots.length === 2) {
      console.log(`Два корня: x₁ = ${result.roots[0]}, x₂ = ${result.roots[1]}`);
    } else if (result.roots.length === 1) {
      console.log(`Один корень: x = ${result.roots[0]}`);
    } else {
      console.log("Действительных корней нет");
    }
  }
};

// Примеры
quadEq.showResult(1, -3, 2);   // x² - 3x + 2 = 0
quadEq.showResult(1, 2, 1);    // x² + 2x + 1 = 0
quadEq.showResult(1, 1, 1);    // x² + x + 1 = 0
quadEq.showResult(2, -4, -6);  // 2x² - 4x - 6 = 0
quadEq.showResult(0, 5, -10);  // линейное уравнение
quadEq.showResult(0, 0, 0);    // не уравнение


