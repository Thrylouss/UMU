import { useState } from "react";
import styles from "./styles.module.css";
import validateAnswers from "../../../hooks/validateAnswers.jsx";

export default function DropdownQuestion({ lesson, setUserAnswers, results }) {

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `dropdown_question-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.questions}>
            <h2 className={styles.sectionTitle}>A. Duris variantti tan'lan</h2>
            {lesson.exercise.test &&
                lesson.exercise.test.dropdown_question.rows.map((test, index) => (
                    <section key={index} className={styles.dropdown_question}>
                        <p className={styles.question}>
                            {test.question.split(/_{2,}/).flatMap((part, i, arr) => [
                                part,
                                i < arr.length - 1 && (
                                    <select
                                        key={`select-${i}`}
                                        name={`dropdown_question-${index}`}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value={test.option__1}>{test.option__1}</option>
                                        <option value={test.option__2}>{test.option__2}</option>
                                        <option value={test.option__3}>{test.option__3}</option>
                                    </select>
                                ),
                            ])}
                            {results[`dropdown_question-${index}`] !== undefined && (
                                <span className={results[`dropdown_question-${index}`] ? "correct" : "incorrect"}>
                                    {results[`dropdown_question-${index}`] ? "✔" : "✘"}
                                </span>
                            )}
                        </p>
                    </section>
                ))}
        </div>
    );
}
