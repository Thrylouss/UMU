import React, { useState } from "react";
import styles from "./styles.module.css";

export default function FillInTheBlankE({ lesson, setUserAnswers, results }) {

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `fill_in_the_blank_E-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.fillInTheBlankContainer}>
            <h2 className={styles.sectionTitle}>
                E. Fill in the blanks with appropriate answers:
            </h2>
            <div className={styles.wordBank}>
                {lesson.exercise.test.fill_in_the_blank_E.rows.map((test, index) => (
                    <span key={index}>{test.correct_answer}</span>
                ))}
            </div>
            <div className={styles.questions}>
                {lesson.exercise.test.fill_in_the_blank_E.rows.map((row, index) => {
                    // Разбиваем текст на части с помощью регулярного выражения для поиска подчеркиваний
                    const parts = row.question.split(/_+/);

                    return (
                        <div key={index} className={styles.questionRow}>
                            <span className={styles.questionIndex}>{index + 1}.</span>
                            <span className={styles.questionText}>{parts[0]}</span>
                            <input
                                type="text"
                                className={styles.blankInput}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                            <span className={styles.questionText}>{parts[1]}</span>
                            {results[`fill_in_the_blank_E-${index}`] !== undefined && (
                                <span className={results[`fill_in_the_blank_E-${index}`] ? "correct" : "incorrect"}>
                                    {results[`fill_in_the_blank_E-${index}`] ? "✔" : "✘"}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
