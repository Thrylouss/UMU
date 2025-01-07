import styles from "./styles.module.css";
import ReadingSummary from "./reading_summary/ReadingSummary.jsx";
import ReadingComprehension from "./reading_comprehension/ReadingComprehension.jsx";
import ReadingWordsPractice from "./reading_words_practice/ReadingWordsPractice.jsx";

export default function ReadingSection({ reading, setUserAnswers, results }) {
    return (
        <div className={styles.readingSection}>
            <h2 className={styles.sectionTitle}>{reading.reading_title}</h2>
            <div className={styles.readingTextContainer}>
                <p className={styles.readingText}>{reading.reading_text}</p>
            </div>
            <div className={styles.readingPracticeSection}>
                <ReadingWordsPractice reading={reading} setUserAnswers={setUserAnswers} results={results} />
            </div>
            <div className={styles.readingComprehensionSection}>
                 <ReadingComprehension reading={reading} setUserAnswers={setUserAnswers} results={results} />
            </div>
            <div className={styles.readingSummarySection}>
                <h1 className={styles.sectionTitle}>Summary</h1>
                <ReadingSummary data={reading.reading_summary} setUserAnswers={setUserAnswers} results={results} />
            </div>
        </div>
    );
}
