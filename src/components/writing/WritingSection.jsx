import React from 'react';
import styles from './styles.module.css';

export default function WritingSection({ writing, setUserAnswers, results }) {

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `writing_questions-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.writingSection}>
            <h2 className={styles.sectionTitle}>Writing Practice</h2>
            <div className={styles.writingTable}>
                {writing.writing_questions.rows.map((row, index) => (
                    <div key={`writing-${index}`} className={styles.writingColumn}>
                        <p className={styles.questionText}>{row.question}</p>
                        <textarea
                            placeholder="Write your answer here"
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            className={styles.writingTextarea}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
