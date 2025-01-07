import styles from "../styles.module.css";


export default function ReadingComprehension({ reading, setUserAnswers, results }){

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `reading_comprehension-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <>
            <h3 className={styles.sectionTitle}>Reading Comprehension</h3>
            {reading.reading_comprehension.rows.map((comprehension, index) => (
                <section key={index} className={styles.comprehensionItem}>
                    <div className={styles.questionBox}>
                        <p className={styles.question}>{comprehension.question}</p>
                        {results[`reading_comprehension-${index}`] !== undefined && (
                            <span className={results[`reading_comprehension-${index}`] ? "correct" : "incorrect"}>
                            {results[`reading_comprehension-${index}`] ? "✔" : "✘"}
                        </span>
                        )}
                    </div>
                    {["option__1", "option__2", "option__3", "option__4"].map((optionKey) => (
                        <label key={optionKey} className={styles.labelQuestion}>
                            <input
                                type="radio"
                                name={`reading_comprehension-${index}`}
                                value={comprehension[optionKey]}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                            <span>{comprehension[optionKey]}</span>
                        </label>
                    ))}
                </section>
            ))}
        </>
    )
}