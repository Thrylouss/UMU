import React, { useState } from "react";
import styles from "./styles.module.css";

export default function FillInTheBlankD({ lesson, setUserAnswers, results }) {

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `fill_in_the_blank_D-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
        console.log(answer)
    };

    return (
        <div className={styles.fillInTheBlankContainer}>
            <h2 className={styles.sectionTitle}>
                D. Berilgen so’zlerden paydalanıp bos orınlardı toltıruń':
            </h2>
            <div className={styles.wordBank}>
                {lesson.exercise.test.fill_in_the_blank_D.rows.map((test, index) => (
                    <span key={index}>{test.correct_answer}</span>
                ))}
            </div>
            <div className={styles.questions}>
                {lesson.exercise.test.fill_in_the_blank_D.rows.map((row, index) => (
                    <div key={index} className={styles.questionRow}>
                        <span className={styles.questionIndex}>{index + 1}.</span>
                        <input
                            type="text"
                            className={styles.blankInput}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                        <span className={styles.questionText}>{row.question.replace("____", "")}</span>
                        {results[`fill_in_the_blank_D-${index}`] !== undefined && (
                            <span className={results[`fill_in_the_blank_D-${index}`] ? "correct" : "incorrect"}>
                                {results[`fill_in_the_blank_D-${index}`] ? "✔" : "✘"}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
