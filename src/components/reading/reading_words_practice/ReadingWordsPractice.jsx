import styles from "../styles.module.css";


export default function ReadingWordsPractice({ reading, setUserAnswers, results }) {

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `reading_words_practice-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <>
            <h3 className={styles.sectionTitle}>Words Practice</h3>
            <div className={styles.gridContainer}>
                {reading.reading_words_practice.rows.map((practice, index) => (
                    <section key={index} className={styles.practiceItem}>
                        <div className={styles.questionBox}>
                            <p className={styles.question}>{practice.question}</p>
                            {results[`reading_words_practice-${index}`] !== undefined && (
                                <span className={results[`reading_words_practice-${index}`] ? "correct" : "incorrect"}>
                                {results[`reading_words_practice-${index}`] ? "✔" : "✘"}
                            </span>
                            )}
                        </div>
                        {["option__1", "option__2", "option__3"].map((optionKey) => (
                            <label key={optionKey} className={styles.labelQuestion}>
                                <input
                                    type="radio"
                                    name={`reading_words_practice-${index}`}
                                    value={practice[optionKey]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                />
                                <span>{practice[optionKey]}</span>
                            </label>
                        ))}
                    </section>
                ))}
            </div>
        </>
    )
}