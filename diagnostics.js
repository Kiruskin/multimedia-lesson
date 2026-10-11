// === Сохранение результатов диагностики в .txt ===
const saveBtn = document.getElementById("saveDiag");
const msg = document.getElementById("diagMsg");

// Правильные ответы для автопроверки
const CORRECT_Q6 = "jpeg";
const CORRECT_Q7 = ["coreldraw", "illustrator", "inkscape"];

function getRadio(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : "";
}

function getCheckboxes(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(el => el.value);
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    // Проверка минимальной заполненности
    if (!getRadio("q1") || !document.getElementById("q2").value) {
      msg.className = "result err";
      msg.textContent = "Заполни хотя бы вопросы 1 и 2.";
      return;
    }

    // Автопроверка тестовых вопросов
    const q6 = getRadio("q6");
    const q7 = getCheckboxes("q7");

    const q6correct = q6 === CORRECT_Q6;
    const q7correct =
      q7.length === CORRECT_Q7.length &&
      q7.every(v => CORRECT_Q7.includes(v));

    let score = 0;
    if (q6correct) score++;
    if (q7correct) score++;

    const date = new Date().toLocaleString("ru-RU");

    const content =
`====================================================
  РЕЗУЛЬТАТЫ ДИАГНОСТИКИ
  Тема: «Компьютерная графика», 7 класс
  Дата: ${date}
====================================================

1. Класс:                          ${getRadio("q1") || "—"}
2. Возраст (полных лет):           ${document.getElementById("q2").value || "—"}
3. Частота работы с графикой:      ${document.getElementById("q3").value || "—"}
4. Желание учиться в редакторе:    ${getRadio("q4") || "—"}
5. Интерес к теме (1–5):           ${getRadio("q5") || "—"}

6. Формат растровой графики:
   Ответ ученика:                  ${q6 || "—"}
   Правильный ответ:               jpeg
   Результат:                      ${q6correct ? "✅ верно" : "❌ неверно"}

7. Программы векторной графики:
   Ответ ученика:                  ${q7.join(", ") || "—"}
   Правильный ответ:               coreldraw, illustrator, inkscape
   Результат:                      ${q7correct ? "✅ верно" : "❌ неверно"}

8. Формат для логотипов и схем:    ${document.getElementById("q8").value.trim() || "—"}

9. Пример векторной графики в жизни:
   ${document.getElementById("q9").value.trim() || "—"}

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
      `✅ Ответы сохранены. Тестовая часть: ${score} из 2. ` +
      `Файл diagnostics-result.txt скачан.`;
  });
}
