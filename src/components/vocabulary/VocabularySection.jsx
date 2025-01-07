import styles from './styles.module.css';
import React from 'react';

export default function VocabularySection({ vocabulary, setUserAnswers, results }) {
    const handleAnswerChange = (wordIndex, answer) => {
        const questionKey = `vocabulary_words-${wordIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.vocabularySection}>
            <h2 className={styles.sectionTitle}>Vocabulary Practice</h2>
            <div className={styles.vocabularyTable}>
                {vocabulary.vocabulary_words.rows.map((row, index) => (
                    <div key={`vocab-${index}`} className={styles.vocabularyRow}>
                        <span className={styles.word}>{row.word}</span>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter translation"
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                className={styles.answerInput}
                            />
                            {results[`vocabulary_words-${index}`] !== undefined && (
                                <span
                                    className={
                                        results[`vocabulary_words-${index}`].isCorrect
                                            ? "correct"
                                            : "incorrect"
                                    }
                                >
                                {results[`vocabulary_words-${index}`].isCorrect ? "✔" : "✘"}
                            </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
