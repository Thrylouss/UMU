import styles from "./styles.module.css";


export default function MultipleChoice({ lesson, setUserAnswers, results, userAnswers }){

    const handleAnswerChange = (questionIndex, answer) => {
        const questionKey = `multiple_choice-${questionIndex}`; // Генерация уникального ключа
        setUserAnswers((prevState) => ({
            ...prevState,
            [questionKey]: answer,
        }));
    };

    return (
        <div className={styles.questions}>
            <h2 className={styles.sectionTitle}>B. Duris variantti tan'lan</h2>
            <div className={styles.questionContainer}>
                {lesson.exercise.test && (
                    <div className={styles.gridContainer}>
                        {lesson.exercise.test.multiple_choice.rows.map((test, index) => (
                            <section key={index} className={styles.multiple_choice}>
                                <div className={styles.questionBox}>
                                    <p className={styles.question}>{test.question}</p>
                                    {results[`multiple_choice-${index}`] !== undefined && (
                                        <span className={results[`multiple_choice-${index}`] ? "correct" : "incorrect"}>
                                            {results[`multiple_choice-${index}`] ? "✔" : "✘"}
                                        </span>
                                    )}
                                </div>
                                <label className={styles.labelQuestion}>
                                    <input
                                        type="radio"
                                        name={`multiple_choice_${index}`}
                                        value={test.option__1}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    />
                                    <span>{test.option__1}</span>
                                </label>
                                <label className={styles.labelQuestion}>
                                    <input
                                        type="radio"
                                        name={`multiple_choice_${index}`}
                                        value={test.option__2}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    />
                                    <span>{test.option__2}</span>
                                </label>
                            </section>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}