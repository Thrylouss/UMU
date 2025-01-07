import styles from "../styles.module.css";
import React, { useState } from "react";

export default function ListeningQuestions({ questions, setUserAnswers, results }) {
    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `listening_questions-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.questionsContainer}>
            <h3 className={styles.sectionTitle}>Answer the Questions</h3>
            {questions.rows.map((question, index) => (
                <div key={index} className={styles.questionBlock}>
                    <div className={styles.questionBox}>
                        <p className={styles.questionText}>{question.question}</p>
                        {results[`listening_questions-${index}`] !== undefined && (
                            <span className={results[`listening_questions-${index}`] ? "correct" : "incorrect"}>
                            {results[`listening_questions-${index}`] ? "✔" : "✘"}
                        </span>
                        )}
                    </div>
                    <div className={styles.options}>
                        {[1, 2, 3, 4].map((num) => (
                            <label key={num} className={styles.option}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={question[`option__${num}`]} // Указываем значение для каждого варианта
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                />
                                {question[`option__${num}`]}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
