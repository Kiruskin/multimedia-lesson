// === Сохранение результатов диагностики в .txt ===
const saveBtn = document.getElementById("saveDiag");
const msg = document.getElementById("diagMsg");

// Правильные ответы для автопроверки
const answers = {
  q1: null,
  q2: "jpeg",
  q3: ["coreldraw", "illustrator", "inkscape"],
  q4: null,
  q5: null,
  q6: null,
  q7: null,
  q8: null,
  q9: null
};

function getRadio(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : "";
}

function getCheckbox(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(el => el.value);
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    // Проверка: заполнены ли ключевые поля
    if (!getRadio("q1") || !getRadio("q2")) {
      msg.className = "result err";
      msg.textContent = "Ответь хотя бы на вопросы 1 и 2.";
      return;
    }

    // Проверка правильности ответов 2 и 3
    const q2 = getRadio("q2");
    const q3 = getCheckbox("q3");

    const q2correct = q2 === answers.q2;

    const q3correct =
      q3.length === answers.q3.length &&
      q3.every(v => answers.q3.includes(v));

    // Итоговый балл (0–2)
    let score = 0;
    if (q2correct) score++;
    if (q3correct) score++;

    const date = new Date().toLocaleString("ru-RU");

    const content =
`====================================================
  РЕЗУЛЬТАТЫ ДИАГНОСТИКИ
  Тема: «Компьютерная графика», 7 класс
  Дата: ${date}
====================================================

1. Класс: ${getRadio("q1") || "—"}

2. Формат растровой графики (вопрос с одним ответом):
   Ответ ученика: ${q2 || "—"}
   Правильный:    jpeg
   Результат:     ${q2correct ? "✅ верно" : "❌ неверно"}

3. Программы векторной графики (множественный выбор):
   Ответ ученика: ${q3.join(", ") || "—"}
   Правильный:    coreldraw, illustrator, inkscape
   Результат:     ${q3correct ? "✅ верно" : "❌ неверно"}

4. Частота работы с графикой на уроках: ${document.getElementById("q4").value || "—"}

5. Интерес к теме (1–5): ${getRadio("q5") || "—"}

6. Желание учиться работать в редакторе: ${getRadio("q6") || "—"}

7. Пример векторной графики в жизни:
   ${document.getElementById("q7").value.trim() || "—"}

8. Что было сложным:
   ${document.getElementById("q8").value.trim() || "—"}

9. Оценка занятия: ${getRadio("q9") || "—"}

----------------------------------------------------
ИТОГ ПО ТЕСТОВОЙ ЧАСТИ: ${score} из 2 правильных ответов.
----------------------------------------------------
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagnostics-result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    msg.className = "result ok";
    msg.textContent =
      `✅ Ответы сохранены. Тестовая часть: ${score} из 2. Файл diagnostics-result.txt скачан.`;
  });
}