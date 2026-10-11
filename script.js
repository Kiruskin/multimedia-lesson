// Вопросы квиза. Правильный ответ — индекс в массиве options (0-based).
const questions = [
  {
    q: "Что является минимальным элементом растрового изображения?",
    options: ["Вектор", "Пиксель", "Контур", "Слой"],
    correct: 1
  },
  {
    q: "Какой формат чаще всего используется для фотографий?",
    options: ["SVG", "CDR", "JPEG", "AI"],
    correct: 2
  },
  {
    q: "Почему векторное изображение не теряет качество при увеличении?",
    options: [
      "Оно хранится в облаке",
      "Оно описано математическими формулами",
      "Оно состоит из мелких пикселей",
      "Оно всегда чёрно-белое"
    ],
    correct: 1
  },
  {
    q: "Какая программа предназначена для векторной графики?",
    options: ["Photoshop", "GIMP", "CorelDRAW", "Paint"],
    correct: 2
  },
  {
    q: "В каком случае лучше использовать растровую графику?",
    options: [
      "Для логотипа компании",
      "Для чертежа здания",
      "Для обработки фотографии",
      "Для схемы алгоритма"
    ],
    correct: 2
  }
];

const form = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");

// Рендер вопросов
questions.forEach((item, i) => {
  const div = document.createElement("div");
  div.className = "q";
  div.dataset.index = i;
  div.innerHTML = `
    <p>${i + 1}. ${item.q}</p>
    ${item.options.map((opt, j) => `
      <label>
        <input type="radio" name="q${i}" value="${j}">
        ${opt}
      </label>
    `).join("")}
  `;
  form.appendChild(div);
});

// Проверка
checkBtn.addEventListener("click", () => {
  let score = 0;
  let answered = 0;

  questions.forEach((item, i) => {
    const block = form.querySelector(`.q[data-index="${i}"]`);
    block.classList.remove("correct", "wrong");
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      answered++;
      if (Number(selected.value) === item.correct) {
        score++;
        block.classList.add("correct");
      } else {
        block.classList.add("wrong");
      }
    }
  });

  if (answered < questions.length) {
    resultEl.className = "result err";
    resultEl.textContent = `Ответь на все вопросы (отвечено ${answered} из ${questions.length}).`;
    return;
  }

  const percent = Math.round((score / questions.length) * 100);
  resultEl.className = "result " + (score === questions.length ? "ok" : "err");
  resultEl.textContent = `Правильных ответов: ${score} из ${questions.length} (${percent}%).`;
});

// === Сохранение рефлексии в .txt ===
const saveBtn = document.getElementById("saveReflect");
const reflectMsg = document.getElementById("reflectMsg");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const a1 = document.getElementById("r1").value.trim();
    const a2 = document.getElementById("r2").value.trim();
    const a3 = document.getElementById("r3").value;

    if (!a1) {
      reflectMsg.className = "result err";
      reflectMsg.textContent = "Заполни хотя бы первый вопрос.";
      return;
    }

    const date = new Date().toLocaleString("ru-RU");
    const content =
      `Рефлексия по занятию «Компьютерная графика»\n` +
      `Дата: ${date}\n\n` +
      `1. Что нового узнал:\n${a1}\n\n` +
      `2. Что было сложным:\n${a2 || "—"}\n\n` +
      `3. Самооценка: ${a3}\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reflection.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    reflectMsg.className = "result ok";
    reflectMsg.textContent = "✅ Файл reflection.txt сохранён. Отправь его учителю.";
  });
}
