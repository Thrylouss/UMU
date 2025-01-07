import React from 'react';
import styles from './styles.module.css';

export default function ReadingSummary({ data, setUserAnswers, results }) {
    const handleAnswerChange = (questionIndex, answer) => {
        // Пропускаем пустые ответы
        if (answer.trim() === "") {
            setUserAnswers((prevState) => {
                const newState = { ...prevState };
                delete newState[`reading_summary-${questionIndex}`]; // Удаляем ключ из состояния
                return newState;
            });
            return;
        }

        // Записываем непустые ответы
        const questionKey = `reading_summary-${questionIndex}`;
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.container}>
            <p>
                {data.rows.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        <span>{row.question.split('_____')[0]}</span>
                        {row.correct_answer ? (
                            <>
                                <input
                                    key={`input-${rowIndex}`}
                                    type="text"
                                    onChange={(e) => handleAnswerChange(rowIndex, e.target.value)}
                                    className={styles.input}
                                    placeholder=""
                                />
                                {results[`reading_summary-${rowIndex}`] !== undefined && (
                                    <span
                                        key={`result-${rowIndex}`}
                                        className={
                                            results[`reading_summary-${rowIndex}`]
                                                ? "correct"
                                                : "incorrect"
                                        }
                                    >
                                        {results[`reading_summary-${rowIndex}`] ? '✔' : '✘'}
                                    </span>
                                )}
                            </>
                        ) : null}
                        <span>{row.question.split('_____')[1] || ''}</span>
                    </React.Fragment>
                ))}
            </p>
        </div>
    );
}
