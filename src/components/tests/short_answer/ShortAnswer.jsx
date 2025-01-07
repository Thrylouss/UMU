import React from "react";
import styles from "./styles.module.css";

export default function ShortAnswer({ lesson, setUserAnswers, results }) {

    const handleQuestionChange = (questionIndex, question) => {
        const questionKey = `short_answer-${questionIndex}-question`; // Уникальный ключ для вопроса
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: question,
        }));
    };

    const handleAnswerChange = (questionIndex, answer) => {
        const answerKey = `short_answer-${questionIndex}-answer`; // Уникальный ключ для ответа
        setUserAnswers((prevState) => ({
            ...prevState,
            [answerKey]: answer,
        }));
    };

    return (
        <div className={styles.shortAnswerContainer}>
            <h2 className={styles.sectionTitle}>
                F. Berilgen ga'lerden sorawlar jasap ha'm qisqa juwaplar jazıń
            </h2>
            <div className={styles.questions}>
                {lesson.exercise.test.short_answer.rows.map((row, index) => (
                    <div key={index} className={styles.questionRow}>
                        <p className={styles.sentence}>{row.sentence}</p>
                        <div className={styles.answerContainer}>
                            <input
                                type="text"
                                className={styles.questionInput}
                                placeholder="Compose a question"
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                            />
                            {results[`short_answer-${index}-question`] !== undefined && (
                                <span
                                    className={
                                        results[`short_answer-${index}-question`] ? "correct" : "incorrect"
                                    }
                                >
                                    {results[`short_answer-${index}-question`] ? "✔" : "✘"}
                                </span>
                            )}
                            <input
                                type="text"
                                className={styles.answerInput}
                                placeholder="Short answer"
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                            {results[`short_answer-${index}-answer`] !== undefined && (
                                <span
                                    className={
                                        results[`short_answer-${index}-answer`] ? "correct" : "incorrect"
                                    }
                                >
                                    {results[`short_answer-${index}-answer`] ? "✔" : "✘"}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
