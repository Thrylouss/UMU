import React, { useState } from "react";
import styles from "./styles.module.css";

export default function DropdownQuestionDialog({ lesson, setUserAnswers, results }) {

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `dropdown_question_dialog-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.dialogContainer}>
            <h2 className={styles.sectionTitle}>C. Duris variantti tan'lan</h2>
            {lesson.exercise.test.dropdown_question_dialog.rows.map((row, index) => (
                <div key={index} className={styles.dialogRow}>
                    <p className={styles.dialogSpeaker}>{row.dialog}:</p>
                    <p className={styles.dialogQuestion}>
                        {row.question.split(/_{2,}/).flatMap((part, i, arr) => [
                            part,
                            i < arr.length - 1 && (
                                <select
                                    key={`${index}-${i}`}
                                    name={`dropdown_question_dialog-${index}`}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                >
                                    <option value=""></option>
                                    <option value={row.option__1}>{row.option__1}</option>
                                    <option value={row.option__2}>{row.option__2}</option>
                                    <option value={row.option__3}>{row.option__3}</option>
                                </select>
                            ),
                        ])}
                        {results[`dropdown_question_dialog-${index}`] !== undefined && (
                            <span className={results[`dropdown_question_dialog-${index}`] ? "correct" : "incorrect"}>
                                    {results[`dropdown_question_dialog-${index}`] ? "✔" : "✘"}
                                </span>
                        )}
                    </p>
                </div>
            ))}
        </div>
    );
}