import styles from './styles.module.css'
import logo from '../../assets/logo/logo.png'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import loadEffect from "../../assets/loadEffects/loadEffects.module.css"
import DropdownQuestion from "../../components/tests/dropdown_question/DropdownQuestion.jsx";
import MultipleChoice from "../../components/tests/multiple_choice/MultipleChoice.jsx";
import DropdownQuestionDialog from "../../components/tests/dropdown_question_dialog/DropdownQuestionDialog.jsx";
import FillInTheBlankD from "../../components/tests/fill_in_the_blank_D/FillInTheBlankD.jsx";
import FillInTheBlankE from "../../components/tests/fill_in_the_blank_E/FillInTheBlankE.jsx";
import ShortAnswer from "../../components/tests/short_answer/ShortAnswer.jsx";
import FillInTheBlankText from "../../components/tests/fill_in_the_blank_text/FillInTheBlankText.jsx";
import ReorderSentences from "../../components/tests/reorder_sentences/ReorderSentences.jsx";
import ReadingSection from "../../components/reading/ReadingSection.jsx";
import ListeningSection from "../../components/listening/ListeningSection.jsx";
import SpeakingSection from "../../components/speaking/SpeakingSection.jsx";
import validateAnswers from "../../hooks/validateAnswers.jsx";
import VocabularySection from "../../components/vocabulary/VocabularySection.jsx";
import WritingSection from "../../components/writing/WritingSection.jsx";

export default function Tests(){
    const { lessonId, ieltsLevel } = useParams();
    const [lesson, setLesson] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({}); // Хранение ответов пользователей
    const [results, setResults] = useState({}); // Хранение результатов проверки
    const [finalResult, setFinalResult] = useState(0);
    const navigate = useNavigate();

    const handleCheckAnswers = () => {
        const validationResults = validateAnswers(lesson, userAnswers); // Проверка ответов
        setResults(validationResults);
    };

    useEffect(() => {
        // Подсчёт правильных ответов при изменении results
        console.log(results)
        setFinalResult(Object.values(results).filter((result) => result.isCorrect === true || result === true).length)
    }, [results]); // Вызывается каждый раз, когда results изменяется

    const handleClearAnswers = () => {
        setUserAnswers({});
        setResults({});
    };

    const handlePrevLesson = () => {
        const prevLessonId = parseInt(lessonId) - 1;
        if (prevLessonId > 0) {
            navigate(`/levels/${ieltsLevel}/lessons/${prevLessonId}`);
        }
    };

    const handleNextLesson = () => {
        const nextLessonId = parseInt(lessonId) + 1;
        navigate(`/levels/${ieltsLevel}/lessons/${nextLessonId}`);
    };

    useEffect(() => {
        setIsLoading(true); // Начало загрузки
        axios.get(`https://www.umumektebi.uz/api/lessons/${lessonId}`)
            .then((res) => {
                setLesson(res.data.lesson);
                setIsLoading(false); // Завершаем загрузку
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load the lesson data.");
                setIsLoading(false); // Завершаем загрузку даже в случае ошибки
            });
    }, [lessonId])

    if (!lesson || !lesson.exercise || !lesson.exercise.test) {
        console.log("Data is still loading or undefined.");
    } else {
        console.log(lesson.exercise.listening);
    }

    if (isLoading) return <div className={loadEffect.cont}>
        <div className={loadEffect.hourglass}></div>
    </div>;

    if (error) {
        return <div className={styles.container}>Error: {error}</div>; // Показать сообщение об ошибке
    }

    // Проверяем, есть ли данные lesson
    if (!lesson) {
        return <div className={styles.container}>No lesson data available.</div>;
    }

    return (
        <div className={styles.container}>
            <Link to={`/levels/${ieltsLevel}`} state={lessonId} className={styles.back}>&#60; Back</Link>
            <img className={styles.logo} src={logo} alt=""/>
            {/*<h1 className={styles.}>BOBUR</h1>*/}
            <div className={styles.testContainer}>
                <div className={styles.lessonDesc}>
                    <h1>{lesson.link.split('-l')[0]}</h1>
                    <div className={styles.lessonTitle}>
                        <h2>{lesson.description}</h2>

                    </div>
                    <h2 className={styles.description}>{lesson.title}</h2>
                </div>
                <div className={styles.video}>
                    <iframe width="100%" height="100%"
                            src="https://www.youtube.com/embed/bWf8eC9fLWw?si=aVcVad-HJ0FdtITR"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                    </iframe>
                </div>
                <h1>Tests</h1>
                <div className={styles.tests}>
                    <DropdownQuestion lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <MultipleChoice lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <DropdownQuestionDialog lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <FillInTheBlankD lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <FillInTheBlankE lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <ShortAnswer lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <FillInTheBlankText lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                    <ReorderSentences lesson={lesson} results={results} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
                </div>
                <h1>Reading</h1>
                <div className={styles.tests}>
                    <ReadingSection reading={lesson.exercise.reading} results={results} setUserAnswers={setUserAnswers}/>
                </div>
                <h1>Listening</h1>
                <div className={styles.tests}>
                    <ListeningSection listening={lesson.exercise.listening} results={results} setUserAnswers={setUserAnswers}/>
                </div>
                <h1>Speaking</h1>
                <div className={styles.tests}>
                    <SpeakingSection speakingData={lesson.exercise.speaking}/>
                </div>
                <h1>Writing</h1>
                <div className={styles.tests}>
                    <WritingSection writing={lesson.exercise.writing} results={results} setUserAnswers={setUserAnswers}/>
                </div>
                <h1>Vocabulary</h1>
                <div className={styles.tests}>
                    <VocabularySection vocabulary={lesson.exercise.vocabulary} results={results} setUserAnswers={setUserAnswers}/>
                </div>

                <p className={styles.result}>Correct answers: {finalResult}</p>
                <div className={styles.btnContainer}>
                    <button onClick={handlePrevLesson} disabled={lessonId === "1"}>&#60;</button>
                    <button onClick={handleCheckAnswers}>Check Answers</button>
                    <button onClick={handleClearAnswers}>Clear</button>
                    <button onClick={handleNextLesson}>&#62;</button>
                </div>
            </div>
        </div>
    )
}