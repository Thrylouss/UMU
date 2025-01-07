

const validateAnswers = (lesson, userAnswers) => {
    const results = {};

    // Helper function for checking individual answers
    const checkAnswer = (userAnswer, correctAnswer) => {
        if (!userAnswer || userAnswer.trim() === "") {
            return false; // Пустой ответ всегда неверный
        }
        return (userAnswer || "").trim().toLowerCase() === (correctAnswer || "").trim().toLowerCase();
    };

    // Loop through each question type
    Object.entries(lesson.exercise.test).forEach(([questionType, data]) => {
        if (!data.rows) return; // Skip if no rows exist for this question type

        data.rows.forEach((question, index) => {
            const baseKey = `${questionType}-${index}`;

            switch (questionType) {
                case "dropdown_question":
                case "dropdown_question_dialog":
                case "multiple_choice":
                    results[baseKey] = checkAnswer(userAnswers[baseKey], question.correct_answer);
                    break;

                case "fill_in_the_blank_D":
                case "fill_in_the_blank_E":
                case "fill_in_the_blank_text":
                    results[baseKey] = checkAnswer(userAnswers[baseKey], question.correct_answer);
                    break;

                case "short_answer":
                    const questionKey = `${baseKey}-question`;
                    const answerKey = `${baseKey}-answer`;
                    results[questionKey] = checkAnswer(userAnswers[questionKey], question.question_answer);
                    results[answerKey] = checkAnswer(userAnswers[answerKey], question.correct_short_answer);
                    break;

                case "reorder_sentences":
                    results[baseKey] = checkAnswer(userAnswers[baseKey], question.sentence);
                    break;

                default:
                    console.warn(`Unknown question type: ${questionType}`);
                    break;
            }
        });
    });

    // Loop through each question type in "reading"
    const reading = lesson.exercise.reading;
    if (reading) {
        Object.entries(reading).forEach(([sectionType, sectionData]) => {
            if (!sectionData.rows) return; // Skip if no rows exist for this section

            sectionData.rows.forEach((question, index) => {
                const baseKey = `${sectionType}-${index}`;
                results[baseKey] = checkAnswer(userAnswers[baseKey], question.correct_answer);
            });
        });
    }

    // Loop through each question type in "listening"
    const listening = lesson.exercise.listening;
    if (listening) {
        Object.entries(listening).forEach(([sectionType, sectionData]) => {
            if (!sectionData.rows) return; // Skip if no rows exist for this section

            sectionData.rows.forEach((question, index) => {
                const baseKey = `${sectionType}-${index}`;
                results[baseKey] = checkAnswer(userAnswers[baseKey], question.correct_answer);
            });
        });
    }

    // Loop through each question type in "vocabulary"
    const vocabulary = lesson.exercise.vocabulary;
    if (vocabulary) {
        Object.entries(vocabulary).forEach(([sectionType, sectionData]) => {
            if (!sectionData.rows) return; // Пропускаем, если данных нет

            sectionData.rows.forEach((question, index) => {
                const baseKey = `${sectionType}-${index}`;
                const userAnswer = userAnswers[baseKey]?.trim() || ""; // Убираем лишние пробелы
                const correctAnswer = question.correct_answer.trim(); // Убираем лишние пробелы

                results[baseKey] = {
                    isCorrect: userAnswer === correctAnswer,
                    userAnswer,
                };
            });
        });
    }



    return results;
}

export default validateAnswers