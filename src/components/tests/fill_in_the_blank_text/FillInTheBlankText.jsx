import React, { useState } from "react";
import styles from "./styles.module.css";

export default function FillInTheBlankText({ lesson, setUserAnswers, results }) {
    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `fill_in_the_blank_text-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    // Собираем общий список уникальных ответов из correct_answer
    const getAllCorrectAnswers = () => {
        const answers = lesson.exercise.test.fill_in_the_blank_text.rows
            .map((row) => row.correct_answer)
            .filter((answer) => answer !== ""); // Убираем пустые ответы
        return [...new Set(answers)]; // Убираем дубликаты
    };

    const allCorrectAnswers = getAllCorrectAnswers();

    const renderTextWithInputs = () => {
        return lesson.exercise.test.fill_in_the_blank_text.rows.map((row, rowIndex) => {
            const parts = row.question.split(/(\(\d+\)\s*_{3,})/); // Разделяем текст по шаблону "(номер) ______________"
            return (
                <div key={`row-${rowIndex}`} className={styles.row}>
                    {parts.map((part, partIndex) =>
                        part.match(/(\(\d+\)\s*_{3,})/) ? (
                            <React.Fragment key={`input-${rowIndex}-${partIndex}`}>
                                <select
                                    className={styles.blankInput}
                                    onChange={(e) => handleAnswerChange(rowIndex, e.target.value)}
                                >
                                    <option value=""></option>
                                    {allCorrectAnswers.map((answer, answerIndex) => (
                                        <option key={`option-${rowIndex}-${answerIndex}`} value={answer}>
                                            {answer}
                                        </option>
                                    ))}
                                </select>
                                {results[`fill_in_the_blank_text-${rowIndex}`] !== undefined && (
                                    <span
                                        className={
                                            results[`fill_in_the_blank_text-${rowIndex}`]
                                                ? "correct"
                                                : "incorrect"
                                        }
                                    >
                                        {results[`fill_in_the_blank_text-${rowIndex}`] ? "✔" : "✘"}
                                    </span>
                                )}
                            </React.Fragment>
                        ) : (
                            <span key={`text-${rowIndex}-${partIndex}`}>{part}</span>
                        )
                    )}
                </div>
            );
        });
    };

    return (
        <div className={styles.fillInTheBlankTextContainer}>
            <h2 className={styles.sectionTitle}>G. Berilgen so’zlerden paydalanıp bos orınlardı toltırıń'</h2>
            <div className={styles.textContainer}>{renderTextWithInputs()}</div>
        </div>
    );
}
