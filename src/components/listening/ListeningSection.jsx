import styles from "./styles.module.css";
import ListeningAudio from "./listening_audio/ListeningAudio.jsx";
import ListeningQuestions from "./listening_questions/ListeningQuestions.jsx";

export default function ListeningSection({ listening, setUserAnswers, results }) {
    return (
        <div className={styles.listeningSection}>
            <div className={styles.audioSection}>
                <ListeningAudio audio={listening.listening_audio} />
            </div>
            <div className={styles.questionsSection}>
                <ListeningQuestions questions={listening.listening_questions} setUserAnswers={setUserAnswers} results={results} />
            </div>
        </div>
    );
}
